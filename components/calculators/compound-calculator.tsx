"use client"

import { useState, useMemo } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

function formatRSD(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M RSD`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K RSD`
  return `${Math.round(value).toLocaleString("sr-RS")} RSD`
}

type PresetId = "savings" | "etf" | "stocks" | "bonds" | "custom"

interface Preset {
  id: PresetId
  label: string
  rate: number
  risk: string
  riskColor: string
  desc: string
  frequency: number // compounding per year
}

const presets: Preset[] = [
  {
    id: "savings",
    label: "Štedni račun",
    rate: 4.0,
    risk: "Bez rizika",
    riskColor: "text-primary",
    desc: "Oročena štednja u banci. Garantovana kamata, osigurana do 50.000 EUR. Typično 3–6% u Srbiji.",
    frequency: 12,
  },
  {
    id: "bonds",
    label: "Državne obveznice",
    rate: 7.0,
    risk: "Nizak rizik",
    riskColor: "text-primary",
    desc: "Obveznice RS nude fiksni prinos od 6–9% godišnje. Sigurnije od akcija, bolje od štednje.",
    frequency: 2,
  },
  {
    id: "etf",
    label: "ETF indeksni fond",
    rate: 9.0,
    risk: "Srednji rizik",
    riskColor: "text-accent-foreground",
    desc: "Globalni ETF fondovi (npr. S&P 500, MSCI World) – istorijski prinos 8–12% godišnje. Preporučeno za početnike.",
    frequency: 1,
  },
  {
    id: "stocks",
    label: "Akcije",
    rate: 12.0,
    risk: "Visok rizik",
    riskColor: "text-destructive",
    desc: "Individualne akcije mogu doneti visok prinos, ali i velik gubitak. Zahteva znanje i diversifikaciju.",
    frequency: 1,
  },
  {
    id: "custom",
    label: "Prilagođeno",
    rate: 7.0,
    risk: "Tvoj izbor",
    riskColor: "text-muted-foreground",
    desc: "Unesi sopstvenu kamatnu stopu za tvoju situaciju.",
    frequency: 12,
  },
]

export function CompoundCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<PresetId>("etf")
  const [principal, setPrincipal] = useState(100000)
  const [monthlyContrib, setMonthlyContrib] = useState(5000)
  const [rate, setRate] = useState(9.0)
  const [years, setYears] = useState(20)

  const activePreset = presets.find((p) => p.id === selectedPreset)!

  function handlePresetChange(id: PresetId) {
    setSelectedPreset(id)
    if (id !== "custom") {
      setRate(presets.find((p) => p.id === id)!.rate)
    }
  }

  const chartData = useMemo(() => {
    const r = rate / 100 / 12
    const data: { year: number; "Vaš novac": number; Zarada: number; ukupno: number }[] = []
    for (let y = 0; y <= years; y++) {
      const n = y * 12
      let total: number
      if (r === 0) {
        total = principal + monthlyContrib * n
      } else {
        total = principal * Math.pow(1 + r, n) + monthlyContrib * ((Math.pow(1 + r, n) - 1) / r)
      }
      const invested = principal + monthlyContrib * n
      data.push({
        year: y,
        "Vaš novac": Math.round(invested),
        Zarada: Math.round(Math.max(0, total - invested)),
        ukupno: Math.round(total),
      })
    }
    return data
  }, [principal, monthlyContrib, rate, years])

  const final = chartData[chartData.length - 1]
  const invested = principal + monthlyContrib * years * 12
  const totalGain = (final?.ukupno ?? 0) - invested
  const multiplier = invested > 0 ? ((final?.ukupno ?? 0) / invested).toFixed(1) : "0"

  return (
    <div className="space-y-8">
      {/* Preset selector */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-3">Vrsta investicije / štednje</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePresetChange(p.id)}
              className={cn(
                "text-left p-3 rounded-xl border-2 transition-all",
                selectedPreset === p.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
              )}
            >
              <div className={cn("font-bold text-xs mb-1", selectedPreset === p.id ? "text-primary" : "text-foreground")}>
                {p.label}
              </div>
              <div className={cn("text-xs font-medium", p.riskColor)}>{p.risk}</div>
              <div className={cn("text-xs font-bold mt-1", selectedPreset === p.id ? "text-primary" : "text-muted-foreground")}>
                ~{p.rate}% god.
              </div>
            </button>
          ))}
        </div>
        <div className="flex items-start gap-2 p-3 bg-secondary rounded-xl text-sm text-muted-foreground">
          <Info className="size-4 mt-0.5 text-primary shrink-0" />
          <span>{activePreset.desc}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Početni ulog</Label>
              <span className="text-primary font-bold text-sm">{formatRSD(principal)}</span>
            </div>
            <Slider min={0} max={2000000} step={10000} value={[principal]} onValueChange={(v) => setPrincipal(v[0])} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>2M RSD</span></div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Mesečni doprinos</Label>
              <span className="text-primary font-bold text-sm">{formatRSD(monthlyContrib)}</span>
            </div>
            <Slider min={0} max={100000} step={1000} value={[monthlyContrib]} onValueChange={(v) => setMonthlyContrib(v[0])} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>100K RSD</span></div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">
                Godišnja stopa prinosa
                {selectedPreset !== "custom" && <span className="text-xs text-muted-foreground ml-1">(promeni preset na &quot;Prilagođeno&quot; za izmenu)</span>}
              </Label>
              <span className="text-primary font-bold text-sm">{rate.toFixed(1)}%</span>
            </div>
            <Slider
              min={0.5}
              max={25}
              step={0.5}
              value={[rate]}
              onValueChange={(v) => {
                setRate(parseFloat(v[0].toFixed(1)))
                setSelectedPreset("custom")
              }}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground"><span>0.5%</span><span>25%</span></div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Period štednje / investiranja</Label>
              <span className="text-primary font-bold text-sm">{years} god.</span>
            </div>
            <Slider min={1} max={40} step={1} value={[years]} onValueChange={(v) => setYears(v[0])} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground"><span>1 god.</span><span>40 god.</span></div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
              <div className="text-sm opacity-80 mb-1">Krajnji iznos za {years} godina</div>
              <div className="text-3xl font-bold">{formatRSD(final?.ukupno ?? 0)}</div>
              <div className="text-sm opacity-70 mt-1">{multiplier}x tvoj ulog</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary rounded-2xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Ukupno uloženo</div>
                <div className="text-lg font-bold text-foreground">{formatRSD(invested)}</div>
              </div>
              <div className="bg-accent/20 rounded-2xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Zarada od prinosa</div>
                <div className="text-lg font-bold text-foreground">{formatRSD(totalGain)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Rast investicije tokom vremena</h3>
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.48 0.18 155)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="oklch(0.48 0.18 155)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorGain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.72 0.18 75)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="oklch(0.72 0.18 75)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 155)" />
              <XAxis dataKey="year" tickFormatter={(v) => `${v}g`} tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={formatRSD} tick={{ fontSize: 10 }} width={72} />
              <Tooltip formatter={(value: number) => formatRSD(value)} labelFormatter={(l) => `Godina ${l}`} />
              <Legend />
              <Area type="monotone" dataKey="Vaš novac" stackId="1" stroke="oklch(0.48 0.18 155)" fill="url(#colorInvested)" />
              <Area type="monotone" dataKey="Zarada" stackId="1" stroke="oklch(0.72 0.18 75)" fill="url(#colorGain)" />
            </AreaChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Složena kamata obračunava se mesečno. Prošli prinosi ne garantuju buduće rezultate.
          </p>
        </div>
      </div>
    </div>
  )
}
