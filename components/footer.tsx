import { TrendingUp } from "lucide-react"

interface FooterProps {
  onTabChange: (tab: string) => void
}

export function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onTabChange("home")}
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary-foreground" />
            </div>
            <span>
              Fin<span className="text-primary">Smart</span>
            </span>
          </button>
          
          
          
        </div>
      </div>
    </footer>
  )
}

//<p className="text-sm text-muted-foreground">© 2025 FinSmart</p>
//<p className="text-sm text-muted-foreground text-center">
//            Finansijska pismenost za srpsku omladinu. Svi kalkulatori su orijentacioni i ne predstavljaju finansijski savet.
//          </p>