"use client"

import { CreditCard, TrendingUp, Wallet, ShieldCheck, Skull } from "lucide-react"
import { CreditCalculator } from "./calculators/credit-calculator"
import { CompoundCalculator } from "./calculators/compound-calculator"
import { SalaryCalculator } from "./calculators/salary-calculator"
import { EmergencyCalculator } from "./calculators/emergency-calculator"
import { DebtTrapCalculator } from "./calculators/debt-trap-calculator"
import { cn } from "@/lib/utils"
import type { ActiveCalc } from "@/app/page"

interface CalculatorsSectionProps {
  activeCalc: ActiveCalc
  onCalcChange: (calc: ActiveCalc) => void
}

const calcs: { id: ActiveCalc; icon: React.ElementType; label: string; desc: string; danger?: boolean }[] = [
  {
    id: "credit",
    icon: CreditCard,
    label: "Kreditni kalkulator",
    desc: "Prosta vs. složena kamata: hipoteka, kreditna kartica",
  },
  {
    id: "compound",
    icon: TrendingUp,
    label: "Složena kamata",
    desc: "Štednja, ETF, obveznice i akcije – rast investicije",
  },
  {
    id: "salary",
    icon: Wallet,
    label: "Kalkulator plate",
    desc: "Bruto → neto: gde odlazi tvoja plata",
  },
  {
    id: "emergency",
    icon: ShieldCheck,
    label: "Fond za hitne slučajeve",
    desc: "Koliko treba da uštediš za finansijsku sigurnost",
  },
  {
    id: "debt",
    icon: Skull,
    label: "Zamka kreditnih kartica",
    desc: "Vidi koliko te košta plaćanje samo minimalne rate",
    danger: true,
  },
]

const componentMap: Record<ActiveCalc, React.ComponentType> = {
  credit: CreditCalculator,
  compound: CompoundCalculator,
  salary: SalaryCalculator,
  emergency: EmergencyCalculator,
  debt: DebtTrapCalculator,
}

export function CalculatorsSection({ activeCalc, onCalcChange }: CalculatorsSectionProps) {
  const ActiveComp = componentMap[activeCalc]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">Finansijski kalkulatori</h2>
        <p className="text-muted-foreground max-w-xl">
          Praktični alati koji ti pomažu da razumeš kredite, štednju, platu i fond za hitne slučajeve.
        </p>
      </div>

      {/* Tab switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {calcs.map((c) => {
          const isActive = activeCalc === c.id
          const isDanger = c.danger
          return (
            <button
              key={c.id}
              onClick={() => onCalcChange(c.id)}
              className={cn(
                "group text-left p-4 rounded-2xl border-2 transition-all duration-200",
                isActive && isDanger
                  ? "border-destructive bg-destructive/8"
                  : isActive
                  ? "border-primary bg-primary/5"
                  : isDanger
                  ? "border-border bg-card hover:border-destructive/40"
                  : "border-border bg-card hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "size-10 rounded-xl flex items-center justify-center mb-3 transition-colors",
                  isActive && isDanger
                    ? "bg-destructive text-destructive-foreground"
                    : isActive
                    ? "bg-primary text-primary-foreground"
                    : isDanger
                    ? "bg-muted text-muted-foreground group-hover:bg-destructive/10 group-hover:text-destructive"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                <c.icon className="size-5" />
              </div>
              <div
                className={cn(
                  "font-bold text-sm mb-1",
                  isActive && isDanger ? "text-destructive" : isActive ? "text-primary" : "text-foreground"
                )}
              >
                {c.label}
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
            </button>
          )
        })}
      </div>

      {/* Calculator card */}
      <div
        className={cn(
          "bg-card rounded-3xl border p-6 md:p-8 shadow-sm",
          calcs.find((c) => c.id === activeCalc)?.danger
            ? "border-destructive/30"
            : "border-border"
        )}
      >
        <div className="mb-6 pb-5 border-b border-border flex items-start gap-3">
          <div>
            <h3
              className={cn(
                "text-xl font-bold",
                calcs.find((c) => c.id === activeCalc)?.danger ? "text-destructive" : "text-foreground"
              )}
            >
              {calcs.find((c) => c.id === activeCalc)?.label}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {calcs.find((c) => c.id === activeCalc)?.desc}
            </p>
          </div>
        </div>
        <ActiveComp />
      </div>
    </section>
  )
}
