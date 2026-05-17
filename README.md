# FinSmart 💚

**Finansijska pismenost za srpsku omladinu** — a free, no-login financial literacy platform built for young people in Serbia.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)

---

## What is FinSmart?

FinSmart is a Serbian-language web application that helps young adults understand personal finance through interactive calculators, a budget planner, and educational articles — all tailored to the Serbian financial system (RSD, NBS regulations, 2026 tax rates).

No registration. No ads. 100% free.

---

## Features

### 🧮 Financial Calculators
| Calculator | Description |
|---|---|
| **Kreditni kalkulator** | Simple vs. compound interest — mortgages, credit cards |
| **Složena kamata** | Compound growth for savings, ETFs, bonds, and stocks |
| **Kalkulator plate** | Bruto → Neto (and reverse) using 2026 Serbian payroll rates |
| **Fond za hitne slučajeve** | Emergency fund goal calculator with milestone tracking |
| **Zamka kreditnih kartica** | Visualize the true cost of paying only minimum card payments |

### 📊 50/30/20 Budget Planner
Interactive budget builder with adjustable sliders, expense tracking per category, and a live pie chart breakdown. Enter your net salary and track where every dinar goes.

### 📚 Financial Education
10 in-depth articles covering:
- Opening a bank account in Serbia
- Debit vs. credit cards
- Emergency funds
- Online financial safety & scam prevention
- Investing basics (ETFs, BVB, bonds)
- Debt management strategies
- Serbian tax basics
- How the Serbian banking system works
- Budgeting tips
- Student finance

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/your-username/finsmart.git
cd finsmart
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## Project Structure

```
├── app/
│   └── page.tsx                  # Root page with tab routing
├── components/
│   ├── navbar.tsx                 # Sticky navigation
│   ├── hero-section.tsx           # Landing hero + feature cards
│   ├── budget-section.tsx         # 50/30/20 budget planner
│   ├── calculators-section.tsx    # Calculator tab container
│   ├── education-section.tsx      # Article grid + reader view
│   ├── footer.tsx
│   └── calculators/
│       ├── credit-calculator.tsx
│       ├── compound-calculator.tsx
│       ├── salary-calculator.tsx
│       ├── emergency-calculator.tsx
│       └── debt-trap-calculator.tsx
└── components/ui/                 # shadcn/ui component library
```

---

## Financial Data & Accuracy

The salary calculator uses official 2026 Serbian payroll rates sourced from **Sl. glasnik RS 109/2025 and 112/2025**:

| Contribution | Employee | Employer |
|---|---|---|
| PIO (pension) | 14% | 10% |
| Health insurance | 5.15% | 5.15% |
| Unemployment | 0.75% | — |
| Income tax | 10% flat | — |
| Non-taxable allowance | 34,221 RSD/month | — |

> All calculators are indicative and do not constitute financial advice.

---

## Contributing

Contributions are welcome! If you spot outdated rates, want to add a new calculator, or improve the educational content, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

MIT — free to use, modify, and distribute.

---

<p align="center">Made with ❤️ for Serbian youth financial literacy</p>
