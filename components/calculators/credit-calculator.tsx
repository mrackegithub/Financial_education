"use client"

import { useState, useMemo } from "react"
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

function formatRSD(value: number) {
  return new Intl.NumberFormat("sr-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(value)
}

type CreditMode = "simple" | "compound"

const modeOptions: { id: CreditMode; label: string; example: string; desc: string }[] = [
  {
    id: "compound",
    label: "Složena kamata",
    example: "Hipotekarni kredit / stambeni kredit",
    desc: "Kamata se obračunava na ostatak duga (anuitet). Svaka rata pokriva deo kamate i deo glavnice. Tipično za stambene kredite, auto kredite, gotovinske kredite. Ovo je standardni metod u srpskim bankama.",
  },
  {
    id: "simple",
    label: "Prosta kamata",
    example: "Kreditna kartica / revolving kredit",
    desc: "Kamata se obračunava na punu glavnicu svaki period. Karakteristično za kreditne kartice i kratkoročne zajmove. Skuplje od anuitetnog kredita za isti iznos i rok.",
  },
]

const COLORS = ["oklch(0.48 0.18 155)", "oklch(0.72 0.18 75)"]

export function CreditCalculator() {
  const [mode, setMode] = useState<CreditMode>("compound")
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(9.5)
  const [months, setMonths] = useState(36)

  const result = useMemo(() => {
    const annualRate = rate / 100
    const monthlyRate = annualRate / 12

    if (mode === "compound") {
      // Standard annuity formula
      if (monthlyRate === 0) {
        const monthly = amount / months
        return { monthly, totalPaid: monthly * months, totalInterest: 0 }
      }
      const monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
      const totalPaid = monthly * months
      const totalInterest = totalPaid - amount
      return { monthly, totalPaid, totalInterest }
    } else {
      // Simple interest: interest = principal * rate * time / 12 per month on full principal
      const monthlyInterest = amount * monthlyRate
      const monthlyPrincipal = amount / months
      const monthly = monthlyPrincipal + monthlyInterest
      const totalPaid = monthly * months
      const totalInterest = totalPaid - amount
      return { monthly, totalPaid, totalInterest }
    }
  }, [amount, rate, months, mode])

  // Amortization schedule for chart
  const amortization = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const data: { mes: number; Glavnica: number; Kamata: number; Stanje: number }[] = []
    if (mode === "compound") {
      let balance = amount
      const pmt = result.monthly
      for (let i = 1; i <= Math.min(months, 60); i++) {
        const interest = balance * monthlyRate
        const principal = pmt - interest
        balance = Math.max(0, balance - principal)
        data.push({ mes: i, Glavnica: Math.round(principal), Kamata: Math.round(interest), Stanje: Math.round(balance) })
      }
    } else {
      const monthlyPrincipal = amount / months
      const monthlyInterest = amount * monthlyRate
      for (let i = 1; i <= Math.min(months, 60); i++) {
        data.push({ mes: i, Glavnica: Math.round(monthlyPrincipal), Kamata: Math.round(monthlyInterest), Stanje: Math.round(amount - monthlyPrincipal * i) })
      }
    }
    return data
  }, [amount, rate, months, mode, result.monthly])

  const pieData = [
    { name: "Iznos kredita", value: amount },
    { name: "Ukupna kamata", value: Math.round(result.totalInterest) },
  ]

  const activeMode = modeOptions.find((m) => m.id === mode)!

  return (
    <div className="space-y-8">
      {/* Mode switcher */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-3">Tip obračuna kamate</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {modeOptions.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={cn(
                "text-left p-4 rounded-2xl border-2 transition-all",
                mode === m.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
              )}
            >
              <div className={cn("font-bold text-sm mb-1", mode === m.id ? "text-primary" : "text-foreground")}>
                {m.label}
              </div>
              <div className="text-xs text-muted-foreground">{m.example}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 p-3 bg-secondary rounded-xl text-sm text-muted-foreground">
          <Info className="size-4 mt-0.5 text-primary shrink-0" />
          <span>{activeMode.desc}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Iznos kredita</Label>
              <span className="text-primary font-bold text-sm">{formatRSD(amount)}</span>
            </div>
            <Slider min={50000} max={5000000} step={50000} value={[amount]} onValueChange={(v) => setAmount(v[0])} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50.000 RSD</span><span>5.000.000 RSD</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Godišnja kamatna stopa</Label>
              <span className="text-primary font-bold text-sm">{rate.toFixed(1)}%</span>
            </div>
            <Slider min={1} max={35} step={0.1} value={[rate]} onValueChange={(v) => setRate(parseFloat(v[0].toFixed(1)))} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span><span>35%</span>
            </div>
            {rate > 20 && (
              <p className="text-xs text-destructive mt-1 font-medium">Pažnja: visoka kamatna stopa, karakteristična za kreditne kartice ili mikro zajmove.</p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-sm font-semibold">Rok otplate</Label>
              <span className="text-primary font-bold text-sm">
                {months} mes. {months >= 12 ? `(${(months / 12).toFixed(1)} god.)` : ""}
              </span>
            </div>
            <Slider min={1} max={360} step={1} value={[months]} onValueChange={(v) => setMonths(v[0])} className="mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 mes.</span><span>360 mes. (30 god.)</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-primary rounded-2xl p-5 text-primary-foreground">
              <div className="text-sm opacity-80 mb-1">Mesečna rata</div>
              <div className="text-3xl font-bold">{formatRSD(result.monthly)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-2xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Ukupno plaćeno</div>
                <div className="text-lg font-bold text-foreground">{formatRSD(result.totalPaid)}</div>
              </div>
              <div className="bg-accent/20 rounded-2xl p-4">
                <div className="text-xs text-muted-foreground mb-1">Ukupna kamata</div>
                <div className="text-lg font-bold text-foreground">{formatRSD(result.totalInterest)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Struktura troška kredita</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" strokeWidth={0}>
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatRSD(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground text-center">
              Kamata čini{" "}
              <span className="font-bold text-foreground">
                {result.totalPaid > 0 ? ((result.totalInterest / result.totalPaid) * 100).toFixed(1) : 0}%
              </span>{" "}
              ukupnih troškova
            </p>
          </div>

          {amortization.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                Rata po mesecima {months > 60 ? "(prvih 60 mes.)" : ""}
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={amortization} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 155)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 10 }} label={{ value: "Mesec", position: "insideBottom", offset: -2, fontSize: 10 }} />
                  <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} width={40} />
                  <Tooltip formatter={(v: number) => formatRSD(v)} labelFormatter={(l) => `Mesec ${l}`} />
                  <Legend />
                  <Line type="monotone" dataKey="Glavnica" stroke="oklch(0.48 0.18 155)" dot={false} strokeWidth={2} />
                  <Line type="monotone" dataKey="Kamata" stroke="oklch(0.72 0.18 75)" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
