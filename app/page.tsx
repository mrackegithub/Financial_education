"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CalculatorsSection } from "@/components/calculators-section"
import { BudgetSection } from "@/components/budget-section"
import { EducationSection } from "@/components/education-section"
import { Footer } from "@/components/footer"

export type ActiveTab = "home" | "calculators" | "budget" | "education"
export type ActiveCalc = "credit" | "compound" | "salary" | "emergency" | "debt"
export type ActiveArticle = string | null

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home")
  const [activeCalc, setActiveCalc] = useState<ActiveCalc>("credit")

  function handleTabChange(tab: string) {
    setActiveTab(tab as ActiveTab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function goToCalc(calc: ActiveCalc) {
    setActiveCalc(calc)
    setActiveTab("calculators")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
      <main>
        {activeTab === "home" && (
          <HeroSection onTabChange={handleTabChange} onGoToCalc={goToCalc} />
        )}
        {activeTab === "calculators" && (
          <CalculatorsSection activeCalc={activeCalc} onCalcChange={setActiveCalc} />
        )}
        {activeTab === "budget" && <BudgetSection />}
        {activeTab === "education" && <EducationSection />}
      </main>
      <Footer onTabChange={handleTabChange} />
    </div>
  )
}
