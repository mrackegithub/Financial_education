"use client"

import { useState, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { AlertTriangle, TrendingDown, DollarSign, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

function formatRSD(value: number) {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(value)
}

function formatMonths(m: number) {
  if (m >= 1200) return "Nikad (raste!"
  const years = Math.floor(m / 12)
  const months = m % 12
  if (years === 0) return `${months} mes.`
  if (months === 0) return `${years} god.`
  return `${years} god. ${months} mes.`
}

interface PayoffRow {
  month: number
  minBalance: number
  fixedBalance: number
}

function simulatePayoff(
  balance: number,
  annualRate: number,
  fixedPayment: number,
  maxMonths = 1200
): { data: PayoffRow[]; minMonths: number; fixedMonths: number; minInterest: number; fixedInterest: number } {
  const monthlyRate = annualRate / 100 / 12
  const MIN_PAYMENT_RATE = 0.05 // 5% of balance

  let minBal = balance
  let fixedBal = balance
  let minInterest = 0
  let fixedInterest = 0
  let minDone = false
  let fixedDone = false
  let minMonths = maxMonths
  let fixedMonths = maxMonths

  const data: PayoffRow[] = [{ month: 0, minBalance: balance, fixedBalance: balance }]

  for (let m = 1; m <= maxMonths; m++) {
    // Minimum payment scenario
    if (!minDone) {
      const interest = minBal * monthlyRate
      minInterest += interest
      const payment = Math.max(minBal * MIN_PAYMENT_RATE, 100) // floor of 100 RSD
      minBal = Math.max(0, minBal + interest - payment)
      if (minBal < 1) {
        minBal = 0
        minMonths = m
        minDone = true
      }
    }

    // Fixed payment scenario
    if (!fixedDone) {
      const interest = fixedBal * monthlyRate
      fixedInterest += interest
      fixedBal = Math.max(0, fixedBal + interest - fixedPayment)
      if (fixedBal < 1) {
        fixedBal = 0
        fixedMonths = m
        fixedDone = true
      }
    }

    // Record every month, but subsample for large datasets to keep chart readable
    const step = maxMonths > 300 ? 3 : maxMonths > 120 ? 2 : 1
    if (m % step === 0 || (minDone && fixedDone)) {
      data.push({
        month: m,
        minBalance: Math.round(minBal),
        fixedBalance: Math.round(fixedBal),
      })
    }

    if (minDone && fixedDone) break
  }

  return { data, minMonths, fixedMonths, minInterest: Math.round(minInterest), fixedInterest: Math.round(fixedInterest) }
}

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-muted-foreground mb-2">Mesec {label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full shrink-0" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-bold text-foreground">{formatRSD(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

export function DebtTrapCalculator() {
  const [balance, setBalance] = useState(120000)
  const [rate, setRate] = useState(24.9)
  const [fixedPayment, setFixedPayment] = useState(8000)
  const [fixedInput, setFixedInput] = useState("8000")

  const minMonthlyFloor = useMemo(() => Math.max(balance * 0.05, 100), [balance])

  const result = useMemo(
    () => simulatePayoff(balance, rate, fixedPayment),
    [balance, rate, fixedPayment]
  )

  const interestSaved = result.minInterest - result.fixedInterest
  const monthsSaved = result.minMonths - result.fixedMonths

  const fixedTooLow = fixedPayment <= balance * (rate / 100 / 12)

  function handleFixedInput(val: string) {
    setFixedInput(val)
    const n = parseInt(val.replace(/\D/g, ""), 10)
    if (!isNaN(n) && n > 0) setFixedPayment(n)
  }

  return (
    <div className="space-y-8">
      {/* Warning banner */}
      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-2xl">
        <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-sm text-destructive">Kreditne kartice: zamka minimalnih rata</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Kada placas samo minimalni iznos, banka zaradjuje na tebi godinama. Vidi koliko te to zapravo kosta.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Inputs ── */}
        <div className="space-y-6">
          {/* Balance */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Trenutni dug na kartici</Label>
              <span className="text-primary font-bold text-sm">{formatRSD(balance)}</span>
            </div>
            <Slider
              min={5000}
              max={500000}
              step={5000}
              value={[balance]}
              onValueChange={(v) => setBalance(v[0])}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5.000 RSD</span>
              <span>500.000 RSD</span>
            </div>
          </div>

          {/* Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Godišnja kamatna stopa</Label>
              <span className="text-primary font-bold text-sm">{rate.toFixed(1)}%</span>
            </div>
            <Slider
              min={5}
              max={50}
              step={0.1}
              value={[rate]}
              onValueChange={(v) => setRate(parseFloat(v[0].toFixed(1)))}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span className="font-medium text-destructive">50% (zeleni zajam)</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Prosecna srpska kreditna kartica:{" "}
              <span className="font-bold text-foreground">~24–29% godisnje</span>
            </p>
          </div>

          {/* Fixed payment */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Tvoja mesecna uplata (fiksna)</Label>
              <span className="text-primary font-bold text-sm">{formatRSD(fixedPayment)}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                value={fixedInput}
                onChange={(e) => handleFixedInput(e.target.value)}
                className="w-full text-right font-mono"
                placeholder="npr. 8000"
              />
              <span className="flex items-center text-sm text-muted-foreground whitespace-nowrap">RSD / mes.</span>
            </div>
            <Slider
              min={500}
              max={Math.min(balance, 100000)}
              step={500}
              value={[fixedPayment]}
              onValueChange={(v) => {
                setFixedPayment(v[0])
                setFixedInput(String(v[0]))
              }}
              className="mb-2"
            />
            {fixedTooLow && (
              <p className="text-xs text-destructive font-medium mt-1 flex items-center gap-1">
                <AlertTriangle className="size-3" />
                Uplata ne pokriva kamatu! Dug ce rasti, neces ga nikad otplatiti.
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Minimalna rata (5%):{" "}
              <span className="font-bold text-foreground">{formatRSD(minMonthlyFloor)}</span> / mes. — ali
              ona pada svaki mesec jer pada stanje.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={Calendar}
              label="Vreme otplate – min."
              value={formatMonths(result.minMonths)}
              highlight={result.minMonths >= 120}
              color="destructive"
            />
            <StatCard
              icon={Calendar}
              label="Vreme otplate – fiksna"
              value={formatMonths(result.fixedMonths)}
              highlight={false}
              color="primary"
            />
            <StatCard
              icon={DollarSign}
              label="Kamata – min. rata"
              value={formatRSD(result.minInterest)}
              highlight
              color="destructive"
              note="Ukupno plaćena kamata"
            />
            <StatCard
              icon={DollarSign}
              label="Kamata – fiksna rata"
              value={formatRSD(result.fixedInterest)}
              highlight={false}
              color="primary"
              note="Ukupno plaćena kamata"
            />
          </div>
        </div>

        {/* ── Chart ── */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-1">Pad duga tokom vremena</h4>
            <p className="text-xs text-muted-foreground mb-4">
              Crvena linija pada bolno sporo. Zelena linija prikazuje tvoj način bržeg otplaćivanja.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={result.data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradMin" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradFixed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.48 0.18 155)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="oklch(0.48 0.18 155)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 155)" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  label={{ value: "Mesec", position: "insideBottom", offset: -2, fontSize: 10 }}
                />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 10 }}
                  width={42}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="minBalance"
                  name="Min. rata (5%)"
                  stroke="oklch(0.55 0.22 25)"
                  strokeWidth={2.5}
                  fill="url(#gradMin)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="fixedBalance"
                  name="Fiksna rata"
                  stroke="oklch(0.48 0.18 155)"
                  strokeWidth={2.5}
                  fill="url(#gradFixed)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Savings callout */}
          {!fixedTooLow && interestSaved > 0 && (
            <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5 space-y-3">
              <p className="text-sm font-bold text-primary">Plaćanjem fiksne rate štedis:</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Ušteđena kamata</p>
                  <p className="text-xl font-bold text-primary">{formatRSD(interestSaved)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Meseci brže</p>
                  <p className="text-xl font-bold text-primary">
                    {monthsSaved >= 1200 ? "Godinama" : formatMonths(monthsSaved)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Te{" "}
                <span className="font-bold text-foreground">{formatRSD(interestSaved)}</span> kamate
                mogao bi da potrošis na nešto drugo. Kreditna kartica ih uzima umesto tebe.
              </p>
            </div>
          )}

          {/* Interest breakdown bar */}
          {!fixedTooLow && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Kamata vs. Glavnica – vizuelno</p>
              <div className="space-y-2">
                <InterestBar
                  label="Min. rata"
                  principal={balance}
                  interest={result.minInterest}
                />
                <InterestBar
                  label="Fiksna rata"
                  principal={balance}
                  interest={result.fixedInterest}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
  color,
  note,
}: {
  icon: React.ElementType
  label: string
  value: string
  highlight: boolean
  color: "destructive" | "primary"
  note?: string
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 border-2",
        highlight && color === "destructive"
          ? "bg-destructive/8 border-destructive/30"
          : color === "primary"
          ? "bg-primary/5 border-primary/20"
          : "bg-secondary border-border"
      )}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Icon
          className={cn(
            "size-3.5",
            highlight && color === "destructive" ? "text-destructive" : "text-primary"
          )}
        />
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
      <p
        className={cn(
          "text-base font-bold leading-tight",
          highlight && color === "destructive" ? "text-destructive" : "text-foreground"
        )}
      >
        {value}
      </p>
      {note && <p className="text-xs text-muted-foreground mt-0.5">{note}</p>}
    </div>
  )
}

function InterestBar({ label, principal, interest }: { label: string; principal: number; interest: number }) {
  const total = principal + interest
  const interestPct = total > 0 ? (interest / total) * 100 : 0
  const principalPct = 100 - interestPct

  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span className="font-medium text-foreground">{label}</span>
        <span>
          <span className="text-foreground font-medium">{formatRSD(principal)}</span> glavnica +{" "}
          <span className="text-destructive font-bold">{formatRSD(interest)}</span> kamata
        </span>
      </div>
      <div className="flex h-5 w-full rounded-full overflow-hidden gap-0.5">
        <div
          className="bg-primary/70 transition-all duration-500 flex items-center justify-center"
          style={{ width: `${principalPct}%` }}
        >
          {principalPct > 20 && (
            <span className="text-[9px] font-bold text-primary-foreground px-1 truncate">
              {principalPct.toFixed(0)}%
            </span>
          )}
        </div>
        <div
          className="bg-destructive/70 transition-all duration-500 flex items-center justify-center"
          style={{ width: `${interestPct}%` }}
        >
          {interestPct > 10 && (
            <span className="text-[9px] font-bold text-destructive-foreground px-1 truncate">
              {interestPct.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-3 mt-1">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary/70 inline-block" /> Glavnica
        </span>
        <span className="flex items-center gap-1 text-xs text-destructive font-medium">
          <span className="w-2 h-2 rounded-full bg-destructive/70 inline-block" /> Kamata (troskovi)
        </span>
      </div>
    </div>
  )
}
