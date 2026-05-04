"use client"

import { useState, useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, Info } from "lucide-react"

function formatRSD(value: number) {
  return new Intl.NumberFormat("sr-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(value)
}

const jobSecurityOptions = [
  { id: "very-secure", label: "Veoma stabilan", desc: "Državni posao, trajni ugovor", months: 3 },
  { id: "secure", label: "Stabilan", desc: "Privatni sektor, dugoročni ugovor", months: 4 },
  { id: "moderate", label: "Umeren", desc: "Projekti, kratkoročni ugovori", months: 5 },
  { id: "unstable", label: "Nestabilan", desc: "Freelance, sezonski posao", months: 6 },
]

const expenses = [
  { id: "rent", label: "Kirija / hipoteka", defaultValue: 30000 },
  { id: "food", label: "Hrana i namirnice", defaultValue: 15000 },
  { id: "utilities", label: "Struja, voda, grejanje", defaultValue: 6000 },
  { id: "transport", label: "Prevoz", defaultValue: 5000 },
  { id: "health", label: "Zdravlje / lekovi", defaultValue: 3000 },
  { id: "phone", label: "Telefon / internet", defaultValue: 2500 },
  { id: "subscriptions", label: "Pretplate i ostalo", defaultValue: 3000 },
]

export function EmergencyCalculator() {
  const [jobSecurity, setJobSecurity] = useState("secure")
  const [expenseValues, setExpenseValues] = useState<Record<string, number>>(
    Object.fromEntries(expenses.map((e) => [e.id, e.defaultValue]))
  )
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlySaving, setMonthlySaving] = useState(10000)

  const selectedSecurity = jobSecurityOptions.find((j) => j.id === jobSecurity)!

  const totalMonthlyExpenses = useMemo(
    () => Object.values(expenseValues).reduce((sum, v) => sum + v, 0),
    [expenseValues]
  )

  const targetMonths = selectedSecurity.months
  const targetAmount = totalMonthlyExpenses * targetMonths
  const gap = Math.max(0, targetAmount - currentSavings)
  const monthsToGoal = monthlySaving > 0 ? Math.ceil(gap / monthlySaving) : null
  const progressPct = Math.min(100, targetAmount > 0 ? (currentSavings / targetAmount) * 100 : 0)

  const statusLevel = progressPct >= 100 ? "full" : progressPct >= 60 ? "good" : progressPct >= 30 ? "ok" : "low"

  const statusConfig = {
    full: { icon: ShieldCheck, label: "Cilj dostignut!", color: "text-primary", bg: "bg-primary/10 border-primary/30" },
    good: { icon: ShieldCheck, label: "Na dobrom putu", color: "text-primary", bg: "bg-primary/10 border-primary/30" },
    ok: { icon: ShieldAlert, label: "Fond u izgradnji", color: "text-accent-foreground", bg: "bg-accent/10 border-accent/30" },
    low: { icon: AlertTriangle, label: "Fond je nedovoljan", color: "text-destructive", bg: "bg-destructive/10 border-destructive/30" },
  }[statusLevel]

  const barData = expenses.map((e) => ({
    name: e.label.split(" / ")[0],
    vrednost: expenseValues[e.id],
  }))

  const milestones = [1, 3, 6].map((m) => ({
    months: m,
    amount: totalMonthlyExpenses * m,
    reached: currentSavings >= totalMonthlyExpenses * m,
  }))

  return (
    <div className="space-y-8">
      {/* Job security */}
      <div>
        <p className="text-sm font-semibold mb-3">Stabilnost tvog posla / prihoda</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {jobSecurityOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setJobSecurity(opt.id)}
              className={cn(
                "text-left p-3 rounded-xl border-2 transition-all",
                jobSecurity === opt.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
              )}
            >
              <div className={cn("font-bold text-xs mb-1", jobSecurity === opt.id ? "text-primary" : "text-foreground")}>
                {opt.label}
              </div>
              <div className="text-xs text-muted-foreground">{opt.desc}</div>
              <div className={cn("text-xs font-bold mt-1.5", jobSecurity === opt.id ? "text-primary" : "text-muted-foreground")}>
                Cilj: {opt.months} mes.
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: inputs */}
        <div className="space-y-6">
          {/* Monthly expenses */}
          <div>
            <p className="text-sm font-semibold mb-3">Mesečni osnovni troškovi</p>
            <div className="space-y-3">
              {expenses.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between mb-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">{exp.label}</Label>
                    <span className="text-xs font-bold text-foreground">{formatRSD(expenseValues[exp.id])}</span>
                  </div>
                  <Slider
                    min={0}
                    max={exp.id === "rent" ? 100000 : 30000}
                    step={500}
                    value={[expenseValues[exp.id]]}
                    onValueChange={(v) => setExpenseValues((prev) => ({ ...prev, [exp.id]: v[0] }))}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-secondary rounded-xl flex justify-between items-center">
              <span className="text-sm font-semibold">Ukupno mesečno</span>
              <span className="text-base font-bold text-primary">{formatRSD(totalMonthlyExpenses)}</span>
            </div>
          </div>

          {/* Current savings + monthly saving */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm font-semibold">Trenutna uštevina (za fond)</Label>
                <span className="text-primary font-bold text-sm">{formatRSD(currentSavings)}</span>
              </div>
              <Slider min={0} max={500000} step={5000} value={[currentSavings]} onValueChange={(v) => setCurrentSavings(v[0])} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>500.000 RSD</span></div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label className="text-sm font-semibold">Mesečni doprinos fondu</Label>
                <span className="text-primary font-bold text-sm">{formatRSD(monthlySaving)}</span>
              </div>
              <Slider min={0} max={100000} step={1000} value={[monthlySaving]} onValueChange={(v) => setMonthlySaving(v[0])} className="mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>0</span><span>100.000 RSD</span></div>
            </div>
          </div>
        </div>

        {/* Right: results */}
        <div className="space-y-5">
          {/* Status badge */}
          <div className={cn("rounded-2xl border-2 p-5 flex items-start gap-4", statusConfig.bg)}>
            <statusConfig.icon className={cn("size-6 shrink-0 mt-0.5", statusConfig.color)} />
            <div>
              <div className={cn("font-bold text-base", statusConfig.color)}>{statusConfig.label}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {progressPct.toFixed(0)}% cilja dostignut ({formatRSD(currentSavings)} od {formatRSD(targetAmount)})
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-semibold">
              <span>Napredak fonda</span>
              <span className="text-primary">{formatRSD(targetAmount)} cilj</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", progressPct >= 100 ? "bg-primary" : progressPct >= 60 ? "bg-primary" : progressPct >= 30 ? "bg-accent" : "bg-destructive")}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatRSD(currentSavings)}</span>
              <span>Cilj: {targetMonths} mes. troškova</span>
            </div>
          </div>

          {/* Milestones */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Milokazi</p>
            <div className="space-y-2">
              {milestones.map((m) => (
                <div key={m.months} className={cn("flex items-center justify-between p-3 rounded-xl border", m.reached ? "bg-primary/5 border-primary/30" : "bg-muted border-border")}>
                  <div className="flex items-center gap-2">
                    {m.reached
                      ? <CheckCircle2 className="size-4 text-primary" />
                      : <div className="size-4 rounded-full border-2 border-muted-foreground/30" />
                    }
                    <span className={cn("text-sm font-medium", m.reached ? "text-foreground" : "text-muted-foreground")}>
                      {m.months} mesec{m.months === 1 ? "" : m.months < 5 ? "a" : "i"} troškova
                    </span>
                  </div>
                  <span className={cn("text-sm font-bold", m.reached ? "text-primary" : "text-muted-foreground")}>
                    {formatRSD(m.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Time to goal */}
          {gap > 0 && (
            <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <p className="text-sm font-semibold">Nedostaje do cilja</p>
              <div className="text-2xl font-bold text-foreground">{formatRSD(gap)}</div>
              {monthsToGoal !== null && monthlySaving > 0 && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="size-4 mt-0.5 text-primary shrink-0" />
                  <span>
                    Uz {formatRSD(monthlySaving)}/mes., dostigneš cilj za{" "}
                    <span className="font-bold text-foreground">
                      {monthsToGoal} mesec{monthsToGoal === 1 ? "" : monthsToGoal < 5 ? "a" : "i"}
                    </span>
                    {monthsToGoal >= 12 && ` (${(monthsToGoal / 12).toFixed(1)} god.)`}.
                  </span>
                </div>
              )}
              {monthlySaving === 0 && (
                <p className="text-sm text-destructive">Postavi mesečni doprinos da vidiš kada ćeš dostići cilj.</p>
              )}
            </div>
          )}

          {/* Expense breakdown chart */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Raspodela troškova</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 8, top: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="oklch(0.9 0.01 155)" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 9 }} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => formatRSD(v)} />
                <Bar dataKey="vrednost" radius={[0, 4, 4, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill="oklch(0.48 0.18 155)" fillOpacity={0.6 + (i * 0.05)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
