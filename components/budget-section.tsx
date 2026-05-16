"use client"

import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Home, Sparkles, PiggyBank, Plus, Trash2, Info } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

function formatRSD(value: number) {
  return new Intl.NumberFormat("sr-RS", { style: "currency", currency: "RSD", maximumFractionDigits: 0 }).format(value)
}

const COLORS = [
  "oklch(0.48 0.18 155)",
  "oklch(0.72 0.18 75)",
  "oklch(0.6 0.15 200)",
]

interface CategoryDef {
  id: string
  icon: React.ElementType
  label: string
  defaultPct: number
  color: string
  barColor: string
  borderColor: string
  desc: string
  items: string[]
}

const categoryDefs: CategoryDef[] = [
  {
    id: "needs",
    icon: Home,
    label: "Potrebe",
    defaultPct: 50,
    color: "bg-primary/8 border-primary/25",
    barColor: "bg-primary",
    borderColor: "border-primary",
    desc: "Kirija, hrana, prevoz, računi, rate – stvari koje moraš platiti",
    items: ["Kirija / kredit za stan", "Hrana i namirnice", "Struja, voda, grejanje", "Prevoz / gorivo", "Zdravlje i lekovi", "Dug/kredit otplata"],
  },
  {
    id: "wants",
    icon: Sparkles,
    label: "Želje",
    defaultPct: 30,
    color: "bg-accent/8 border-accent/25",
    barColor: "bg-accent",
    borderColor: "border-accent",
    desc: "Zabava, restorani, putovanja, hobi – uživanje u životu",
    items: ["Restorani i kafići", "Zabava i kultura", "Shopping", "Putovanja", "Pretplate (streaming, gym)"],
  },
  {
    id: "savings",
    icon: PiggyBank,
    label: "Štednja",
    defaultPct: 20,
    color: "bg-chart-3/8 border-chart-3/25",
    barColor: "bg-chart-3",
    borderColor: "border-chart-3",
    desc: "Fond za hitne slučajeve, investicije, penzija – tvoja budućnost",
    items: ["Fond za hitne slučajeve", "Štednja / investicije", "Penzijsko osiguranje", ],
  },
]

interface ExpenseItem {
  id: string
  name: string
  amount: string
}

export function BudgetSection() {
  const [income, setIncome] = useState(80000)
  const [pcts, setPcts] = useState({ needs: 50, wants: 30, savings: 20 })
  const [customItems, setCustomItems] = useState<Record<string, ExpenseItem[]>>({
    needs: [], wants: [], savings: [],
  })
  const [newItem, setNewItem] = useState<Record<string, { name: string; amount: string }>>({
    needs: { name: "", amount: "" },
    wants: { name: "", amount: "" },
    savings: { name: "", amount: "" },
  })

  // Ensure pcts always sum to 100 when needs slider changes
  function handleNeedsChange(val: number) {
    const remaining = 100 - val
    const wantsPct = Math.round(remaining * (pcts.wants / (pcts.wants + pcts.savings)) * 10) / 10
    const savingsPct = parseFloat((remaining - wantsPct).toFixed(1))
    setPcts({ needs: val, wants: wantsPct, savings: savingsPct })
  }
  function handleWantsChange(val: number) {
    const remaining = 100 - pcts.needs
    const savings = parseFloat((remaining - val).toFixed(1))
    if (savings < 0) return
    setPcts((p) => ({ ...p, wants: val, savings }))
  }
  function handleSavingsChange(val: number) {
    const remaining = 100 - pcts.needs
    const wants = parseFloat((remaining - val).toFixed(1))
    if (wants < 0) return
    setPcts((p) => ({ ...p, wants, savings: val }))
  }

  const targets = useMemo(() => ({
    needs: income * (pcts.needs / 100),
    wants: income * (pcts.wants / 100),
    savings: income * (pcts.savings / 100),
  }), [income, pcts])

  const spent = useMemo(() => {
    const result: Record<string, number> = {}
    Object.keys(customItems).forEach((cat) => {
      result[cat] = customItems[cat].reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0)
    })
    return result
  }, [customItems])

  function addItem(cat: string) {
    const item = newItem[cat]
    if (!item.name.trim() || !item.amount) return
    setCustomItems((prev) => ({
      ...prev,
      [cat]: [...prev[cat], { id: Date.now().toString(), name: item.name, amount: item.amount }],
    }))
    setNewItem((prev) => ({ ...prev, [cat]: { name: "", amount: "" } }))
  }

  function removeItem(cat: string, id: string) {
    setCustomItems((prev) => ({ ...prev, [cat]: prev[cat].filter((i) => i.id !== id) }))
  }

  const pieData = [
    { name: `Potrebe (${pcts.needs}%)`, value: targets.needs },
    { name: `Želje (${pcts.wants}%)`, value: targets.wants },
    { name: `Štednja (${pcts.savings}%)`, value: targets.savings },
  ]

  const totalSum = pcts.needs + pcts.wants + pcts.savings

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-medium mb-4">
          Popularno pravilo
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Pravilo 50 / 30 / 20</h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Jednostavan okvir za pametno upravljanje novcem. Podesi procente prema svojoj situaciji i
          prati gde ide svaki dinar. Unesi svoju neto platu i prilagodi raspodelu.
        </p>
      </div>

      {/* Income slider */}
      <div className="bg-card rounded-3xl border border-border p-6 mb-8">
        <div className="flex justify-between mb-3">
          <Label className="text-base font-bold">Mesečna neto plata</Label>
          <span className="text-primary font-bold text-xl">{formatRSD(income)}</span>
        </div>
        <Slider
          min={20000}
          max={500000}
          step={5000}
          value={[income]}
          onValueChange={(v) => setIncome(v[0])}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>20.000 RSD</span>
          <span>500.000 RSD</span>
        </div>
      </div>

      {/* Percentage sliders + pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-card rounded-3xl border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Prilagodi raspodelu (%)</p>
            {Math.abs(totalSum - 100) > 0.1 && (
              <span className="text-xs text-destructive font-medium">Zbir mora biti 100% (trenutno {totalSum.toFixed(1)}%)</span>
            )}
          </div>

          {[
            { id: "needs", label: "Potrebe", val: pcts.needs, onChange: handleNeedsChange, color: "text-primary" },
            { id: "wants", label: "Želje", val: pcts.wants, onChange: handleWantsChange, color: "text-accent-foreground" },
            { id: "savings", label: "Štednja", val: pcts.savings, onChange: handleSavingsChange, color: "text-chart-3" },
          ].map((item) => {
            const target = targets[item.id as keyof typeof targets]
            const s = spent[item.id] ?? 0
            const pct = target > 0 ? Math.min((s / target) * 100, 100) : 0
            const over = s > target
            const catDef = categoryDefs.find((c) => c.id === item.id)!
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <catDef.icon className={cn("size-4", item.color)} />
                    <Label className="text-sm font-semibold">{item.label}</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-sm font-bold", item.color)}>{item.val}%</span>
                    <span className="text-xs text-muted-foreground">{formatRSD(target)}</span>
                  </div>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[item.val]}
                  onValueChange={(v) => item.onChange(v[0])}
                />
                {/* Spending progress */}
                {s > 0 && (
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Uneseni troškovi</span>
                      <span className={over ? "text-destructive font-semibold" : ""}>
                        {formatRSD(s)} / {formatRSD(target)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all", over ? "bg-destructive" : catDef.barColor)}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          <div className="flex items-start gap-2 p-3 bg-secondary rounded-xl text-sm text-muted-foreground">
            <Info className="size-4 mt-0.5 text-primary shrink-0" />
            <span>Klizačem podesi procente. Preporučujemo minimum 20% za štednju.</span>
          </div>
        </div>

        <div className="bg-card rounded-3xl border border-border p-6 flex flex-col items-center justify-center">
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">Raspodela plate</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={105} dataKey="value" strokeWidth={0}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatRSD(v)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3 w-full mt-2">
            {categoryDefs.map((cat) => (
              <div key={cat.id} className={cn("rounded-xl p-3 border text-center", cat.color)}>
                <div className="text-xs font-semibold text-muted-foreground mb-1">{cat.label}</div>
                <div className="text-sm font-bold text-foreground">{formatRSD(targets[cat.id as keyof typeof targets])}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category cards with expense tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryDefs.map((cat) => (
          <div key={cat.id} className={cn("rounded-3xl border-2 p-6 space-y-4 bg-card", cat.color)}>
            <div className="flex items-center gap-3">
              <div className={cn("size-10 rounded-xl flex items-center justify-center bg-background border", cat.borderColor)}>
                <cat.icon className="size-5 text-foreground" />
              </div>
              <div>
                <div className="font-bold text-base text-foreground">{pcts[cat.id as keyof typeof pcts]}% – {cat.label}</div>
                <div className="text-xs text-muted-foreground">{formatRSD(targets[cat.id as keyof typeof targets])}/mes.</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>

            {/* Suggested items */}
            <div>
              <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Primeri troškova</div>
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-current opacity-50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Custom expenses */}
            {customItems[cat.id]?.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tvoji troškovi</div>
                {customItems[cat.id].map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-background rounded-xl px-3 py-2 border border-border">
                    <span className="text-sm font-medium truncate flex-1">{item.name}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-sm font-bold text-foreground">{formatRSD(parseFloat(item.amount) || 0)}</span>
                      <button onClick={() => removeItem(cat.id, item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add expense */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dodaj trošak</div>
              <div className="flex gap-2">
                <Input
                  placeholder="Naziv"
                  value={newItem[cat.id]?.name ?? ""}
                  onChange={(e) => setNewItem((p) => ({ ...p, [cat.id]: { ...p[cat.id], name: e.target.value } }))}
                  onKeyDown={(e) => e.key === "Enter" && addItem(cat.id)}
                  className="text-sm h-8 flex-1"
                />
                <Input
                  type="number"
                  placeholder="RSD"
                  value={newItem[cat.id]?.amount ?? ""}
                  onChange={(e) => setNewItem((p) => ({ ...p, [cat.id]: { ...p[cat.id], amount: e.target.value } }))}
                  onKeyDown={(e) => e.key === "Enter" && addItem(cat.id)}
                  className="text-sm h-8 w-24"
                />
              </div>
              <button
                onClick={() => addItem(cat.id)}
                className="w-full h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="size-3.5" /> Dodaj
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
