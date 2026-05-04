"use client"

import { ArrowRight, BookOpen, Calculator, PiggyBank, Shield, AlertTriangle } from "lucide-react"
import type { ActiveCalc } from "@/app/page"

interface HeroSectionProps {
  onTabChange: (tab: string) => void
  onGoToCalc: (calc: ActiveCalc) => void
}

const features = [
  {
    icon: Calculator,
    title: "Kalkulatori",
    desc: "Kreditni, kamatni, plata i fond za hitne slučajeve",
    action: () => {},
    tab: "calculators",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: PiggyBank,
    title: "50/30/20 Pravilo",
    desc: "Pametno rasporedi svaki dinar sa sliderom",
    tab: "budget",
    color: "bg-accent/20 text-accent-foreground",
  },
  {
    icon: BookOpen,
    title: "Obrazovanje",
    desc: "Detaljni vodiči i članci o finansijama",
    tab: "education",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    icon: Shield,
    title: "Finansijska sigurnost",
    desc: "Zaštiti sebe od prevara i loših odluka",
    tab: "education",
    color: "bg-primary/10 text-primary",
  },
]

const stats = [
  { value: "73%", label: "mladih u Srbiji nema finansijski plan" },
  { value: "2x", label: "veće šanse za uspeh uz finansijsko znanje" },
  { value: "100%", label: "besplatno i na srpskom jeziku" },
]

const quickCalcs = [
  { id: "credit" as ActiveCalc, label: "Kreditni kalkulator" },
  { id: "compound" as ActiveCalc, label: "Složena kamata" },
  { id: "salary" as ActiveCalc, label: "Kalkulator plate" },
  { id: "emergency" as ActiveCalc, label: "Fond za hitne slučajeve" },
]

export function HeroSection({ onTabChange, onGoToCalc }: HeroSectionProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-hero-bg)" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="size-2 bg-primary rounded-full animate-pulse" />
              Finansijska pismenost za srpsku omladinu
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight text-balance mb-6">
              Uzmi kontrolu nad{" "}
              <span className="text-primary">svojim novcem</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl">
              Nauči osnove finansija, koristi praktične kalkulatore i čitaj vodiče
              prilagođene srpskim mladima. Besplatno, jednostavno i korisno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-base hover:bg-primary/90 transition-colors"
                onClick={() => onTabChange("education")}
              >
                Počni učiti
                <ArrowRight className="size-5" />
              </button>
              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white rounded-xl font-semibold text-base hover:bg-white/10 transition-colors"
                onClick={() => onTabChange("calculators")}
              >
                Otvori kalkulator
              </button>
            </div>

            {/* Quick calc links */}
            <div className="flex flex-wrap gap-2">
              {quickCalcs.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onGoToCalc(c.id)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-lg text-xs font-medium transition-colors border border-white/10"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
                <div className="text-white/60 text-sm leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">
            Sve što ti treba na jednom mestu
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            FinSmart ti pruža alate i znanje da doneseš pametne finansijske odluke već danas.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <button
              key={f.title}
              onClick={() => onTabChange(f.tab)}
              className="group text-left p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-lg transition-all duration-200"
            >
              <div className={`size-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon className="size-6" />
              </div>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Istraži <ArrowRight className="size-4" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
