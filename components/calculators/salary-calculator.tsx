"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Info, ArrowRight, ArrowLeft, Building2, User } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Serbian payroll rates 2026 ─────────────────────────────────────────────
// Source: Zakon o porezu na dohodak građana, Sl. glasnik RS 109/2025, 112/2025
// https://platica.rs/kako-se-obracunava-plata

const NON_TAXABLE = 34_221        // Neoporezivi iznos – 2026
const TAX_RATE    = 0.10          // Porez na zarade – flat

// Employee contributions (iz zarade – teret zaposlenog)
const EMP_PIO         = 0.14      // PIO – zaposleni
const EMP_HEALTH      = 0.0515    // Zdravstveno – zaposleni
const EMP_UNEMP       = 0.0075    // Nezaposlenost – zaposleni
const EMP_TOTAL       = EMP_PIO + EMP_HEALTH + EMP_UNEMP // 19.90 %

// Employer contributions (na zaradu – teret poslodavca)
const ER_PIO          = 0.10      // PIO – poslodavac
const ER_HEALTH       = 0.0515    // Zdravstveno – poslodavac
// Doprinos za nezaposlenost na teret poslodavca ukinut 2014.
const ER_TOTAL        = ER_PIO + ER_HEALTH // 15.15 %

// Contribution base limits (2026)
const MIN_BASE        = 51_297    // Najniža osnovica za doprinose
const MAX_BASE        = 732_820   // Najviša osnovica za doprinose

// ─── Core calculation: Bruto 1 → Neto ───────────────────────────────────────
function calcFromGross(gross: number) {
  // Contribution base is clamped between MIN_BASE and MAX_BASE
  const contribBase = Math.min(Math.max(gross, MIN_BASE), MAX_BASE)

  const pio        = contribBase * EMP_PIO
  const health     = contribBase * EMP_HEALTH
  const unemp      = contribBase * EMP_UNEMP
  const totalEmp   = pio + health + unemp

  // Tax base = Bruto1 − neoporezivi iznos (contributions do NOT reduce tax base)
  const taxBase    = Math.max(0, gross - NON_TAXABLE)
  const tax        = taxBase * TAX_RATE

  const net        = gross - totalEmp - tax

  // Employer side (Bruto 2)
  const erPio      = contribBase * ER_PIO
  const erHealth   = contribBase * ER_HEALTH
  const totalEr    = erPio + erHealth
  const gross2     = gross + totalEr

  return { gross, net, pio, health, unemp, totalEmp, taxBase, tax, erPio, erHealth, totalEr, gross2 }
}

// ─── Reverse calculation: Neto → Bruto 1 (iterative) ────────────────────────
// net = gross - contributions(gross) - tax(gross)
// No closed-form solution because of MIN_BASE clamp, so we use binary search.
function calcFromNet(net: number) {
  let lo = net, hi = net * 2.5
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const r = calcFromGross(mid)
    if (r.net < net) lo = mid; else hi = mid
  }
  return calcFromGross((lo + hi) / 2)
}

function fmt(v: number) {
  return new Intl.NumberFormat("sr-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(v)
}

type Mode = "gross" | "net"

const COLORS = {
  net:    "oklch(0.52 0.16 155)",
  pio:    "oklch(0.62 0.15 200)",
  health: "oklch(0.58 0.14 230)",
  unemp:  "oklch(0.65 0.13 25)",
  tax:    "oklch(0.55 0.17 280)",
}

export function SalaryCalculator() {
  const [mode, setMode]           = useState<Mode>("gross")
  const [inputVal, setInputVal]   = useState(80_000)
  const [sliderVal, setSliderVal] = useState(80_000)
  const [rawInput, setRawInput]   = useState("80000")

  const sliderMin = mode === "gross" ? 30_000 : 20_000
  const sliderMax = mode === "gross" ? 500_000 : 380_000

  const r = useMemo(() => {
    const v = Math.max(1, sliderVal)
    return mode === "gross" ? calcFromGross(v) : calcFromNet(v)
  }, [mode, sliderVal])

  function handleModeSwitch(m: Mode) {
    setMode(m)
    const next = m === "gross" ? Math.round(r.gross) : Math.round(r.net)
    setSliderVal(next)
    setRawInput(String(next))
    setInputVal(next)
  }

  function handleSlider(v: number[]) {
    setSliderVal(v[0])
    setInputVal(v[0])
    setRawInput(String(v[0]))
  }

  function handleInputChange(raw: string) {
    setRawInput(raw)
    const n = parseInt(raw.replace(/\D/g, ""), 10)
    if (!isNaN(n) && n > 0) {
      const clamped = Math.min(Math.max(n, sliderMin), sliderMax)
      setSliderVal(clamped)
      setInputVal(clamped)
    }
  }

  const pieData = [
    { name: "Neto plata",              value: Math.round(r.net),    color: COLORS.net    },
    { name: "PIO (14%)",               value: Math.round(r.pio),    color: COLORS.pio    },
    { name: "Zdravstveno (5.15%)",     value: Math.round(r.health), color: COLORS.health },
    { name: "Nezaposlenost (0.75%)",   value: Math.round(r.unemp),  color: COLORS.unemp  },
    { name: "Porez na dohodak (10%)",  value: Math.round(r.tax),    color: COLORS.tax    },
  ]

  const breakdown = [
    { label: "Bruto 1 (ugovorena plata)",          value:  r.gross,     sign: ""  },
    { label: "PIO – zaposleni (14%)",               value: -r.pio,       sign: "-" },
    { label: "Zdravstveno – zaposleni (5.15%)",     value: -r.health,    sign: "-" },
    { label: "Nezaposlenost (0.75%)",               value: -r.unemp,     sign: "-" },
    { label: "Porez na dohodak (10%)",              value: -r.tax,       sign: "-", note: `Poreska osnovica: ${fmt(r.taxBase)}` },
    { label: "Neto zarada (na ruke)",               value:  r.net,       sign: "",  highlight: true },
    { label: "─",                                   value: null,         sign: ""  },
    { label: "PIO – poslodavac (10%)",              value:  r.erPio,     sign: "+", dim: true },
    { label: "Zdravstveno – poslodavac (5.15%)",    value:  r.erHealth,  sign: "+", dim: true },
    { label: "Bruto 2 (ukupan trošak poslodavca)",  value:  r.gross2,    sign: "",  highlight2: true },
  ]

  const netPct  = ((r.net   / r.gross) * 100).toFixed(1)
  const taxPct  = ((r.tax   / r.gross) * 100).toFixed(1)
  const contPct = ((r.totalEmp / r.gross) * 100).toFixed(1)

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="inline-flex items-center bg-muted rounded-xl p-1 gap-1">
        <button
          onClick={() => handleModeSwitch("gross")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
            mode === "gross"
              ? "bg-card shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowRight className="size-4" />
          Bruto → Neto
        </button>
        <button
          onClick={() => handleModeSwitch("net")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
            mode === "net"
              ? "bg-card shadow text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <ArrowLeft className="size-4" />
          Neto → Bruto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-6">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-sm font-semibold">
                {mode === "gross" ? "Bruto 1 plata" : "Neto plata (na ruke)"}
              </Label>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <Input
                value={rawInput}
                onChange={(e) => handleInputChange(e.target.value)}
                className="font-bold text-lg w-44"
              />
              <span className="text-sm text-muted-foreground font-medium">RSD</span>
            </div>
            <Slider
              min={sliderMin}
              max={sliderMax}
              step={1_000}
              value={[sliderVal]}
              onValueChange={handleSlider}
              className="mb-1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{fmt(sliderMin)}</span>
              <span>{fmt(sliderMax)}</span>
            </div>
          </div>

          {/* Result cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-primary rounded-2xl p-4 text-primary-foreground col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <User className="size-4 opacity-80" />
                <span className="text-sm opacity-80">Neto plata (na ruke)</span>
              </div>
              <div className="text-3xl font-bold">{fmt(r.net)}</div>
              <div className="text-sm opacity-70 mt-1">{netPct}% od bruto 1</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Bruto 2 (trošak firme)</span>
              </div>
              <div className="text-xl font-bold text-foreground">{fmt(r.gross2)}</div>
              <div className="text-xs text-muted-foreground mt-1">+{fmt(r.totalEr)} doprinosi</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-4">
              <span className="text-xs text-muted-foreground block mb-1">Ukupni odbici</span>
              <div className="text-xl font-bold text-destructive">{fmt(r.totalEmp + r.tax)}</div>
              <div className="text-xs text-muted-foreground mt-1">{contPct}% doprinosi + {taxPct}% porez</div>
            </div>
          </div>

          {/* Breakdown table */}
          <div className="rounded-2xl border border-border overflow-hidden text-sm">
            {breakdown.map((row, i) => {
              if (row.value === null) {
                return <div key={i} className="border-t border-dashed border-border" />
              }
              return (
                <div
                  key={i}
                  className={cn(
                    "flex justify-between items-start px-4 py-3 gap-2",
                    row.highlight  && "bg-primary/10 border-t-2 border-primary",
                    row.highlight2 && "bg-muted/60 border-t border-border font-semibold",
                    !row.highlight && !row.highlight2 && (i % 2 === 0 ? "bg-card" : "bg-muted/30"),
                    row.dim && "opacity-60"
                  )}
                >
                  <div>
                    <span className={cn(
                      "text-sm",
                      row.highlight  ? "font-bold text-foreground" : "text-muted-foreground",
                      row.highlight2 ? "text-foreground" : ""
                    )}>
                      {row.label}
                    </span>
                    {row.note && (
                      <div className="text-xs text-muted-foreground mt-0.5">{row.note}</div>
                    )}
                  </div>
                  <span className={cn(
                    "text-sm font-semibold shrink-0",
                    row.highlight  ? "text-primary text-base" : "",
                    row.highlight2 ? "text-foreground" : "",
                    !row.highlight && !row.highlight2 && row.value! < 0 ? "text-destructive" : "",
                    !row.highlight && !row.highlight2 && row.value! > 0 && row.dim ? "text-muted-foreground" : "",
                    !row.highlight && !row.highlight2 && row.value! > 0 && !row.dim ? "text-foreground" : "",
                  )}>
                    {row.sign === "-"
                      ? `− ${fmt(Math.abs(row.value!))}`
                      : row.sign === "+"
                      ? `+ ${fmt(row.value!)}`
                      : fmt(Math.abs(row.value!))}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-xl text-xs text-muted-foreground">
            <Info className="size-4 mt-0.5 text-primary shrink-0" />
            <span>
              Stope važeće za 2026. godinu (Sl. glasnik RS 109/2025, 112/2025).
              Neoporezivi iznos: <strong className="text-foreground">34.221 RSD</strong>.
              Doprinosi se računaju na bruto 1, ali ne mogu biti niži od osnove{" "}
              <strong className="text-foreground">{fmt(MIN_BASE)}</strong> niti viši od{" "}
              <strong className="text-foreground">{fmt(MAX_BASE)}</strong>.
              Obračun je orijentacioni.
            </span>
          </div>
        </div>

        {/* Right column – pie chart */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">
            Struktura bruto 1 plate
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Gde odlazi svakih 100 RSD bruto zarade
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  percent > 0.04 ? `${(percent * 100).toFixed(1)}%` : ""
                }
                labelLine={false}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => fmt(v)} />
              <Legend
                formatter={(value) => (
                  <span className="text-xs">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Contribution rate legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: "Zaposleni plaća",  value: `${(EMP_TOTAL * 100).toFixed(2)}%`, sub: "PIO + zdrav. + nezap." },
              { label: "Poslodavac plaća", value: `${(ER_TOTAL  * 100).toFixed(2)}%`, sub: "PIO + zdravstveno" },
              { label: "Porez na dohodak",value: "10%",                               sub: `Base − ${fmt(NON_TAXABLE)}` },
              { label: "Ukupno opterećenje", value: `~${((EMP_TOTAL + ER_TOTAL + 0.08) * 100).toFixed(0)}%`, sub: "bruto 2 vs. neto" },
            ].map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-3">
                <div className="text-xl font-bold text-foreground">{card.value}</div>
                <div className="text-xs font-medium text-foreground mt-0.5">{card.label}</div>
                <div className="text-xs text-muted-foreground">{card.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
