import { useState, useMemo } from "react";
import { Calculator, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FINANCING_PAGE } from "@/content";
import { useBusiness } from "@/components/BusinessContext";

const TERMS = [12, 18, 24] as const;
type Term = (typeof TERMS)[number];

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function formatCurrency(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function FinancingCalculator() {
  const business = useBusiness();
  const [phonePrice, setPhonePrice] = useState(399);
  const [downPayment, setDownPayment] = useState(0);
  const [term, setTerm] = useState<Term>(18);

  const maxDown = Math.max(0, phonePrice - 1);

  const monthly = useMemo(() => {
    const balance = clamp(phonePrice - downPayment, 1, phonePrice);
    return balance / term;
  }, [phonePrice, downPayment, term]);

  function handlePriceChange(raw: string) {
    const val = parseInt(raw.replace(/\D/g, ""), 10) || 0;
    const clamped = clamp(val, 99, 1500);
    setPhonePrice(clamped);
    if (downPayment > clamped) setDownPayment(0);
  }

  function handleDownChange(raw: string) {
    const val = parseInt(raw.replace(/\D/g, ""), 10) || 0;
    setDownPayment(clamp(val, 0, maxDown));
  }

  return (
    <div className="bg-white border border-border p-6 md:p-8" data-testid="financing-calculator">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-foreground text-white w-10 h-10 flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
            Payment <span className="text-primary">Calculator</span>
          </h3>
          <p className="text-xs font-bold text-muted-foreground mt-0.5">
            Estimates only — exact schedule confirmed in store
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Phone Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              $
            </span>
            <input
              type="number"
              min={99}
              max={1500}
              value={phonePrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="w-full border border-border pl-7 pr-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              data-testid="calc-phone-price"
            />
          </div>
          <input
            type="range"
            min={99}
            max={1500}
            step={10}
            value={phonePrice}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              setPhonePrice(v);
              if (downPayment > v) setDownPayment(0);
            }}
            className="w-full mt-2 accent-primary"
            aria-label="Phone price slider"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Down Payment
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
              $
            </span>
            <input
              type="number"
              min={0}
              max={maxDown}
              value={downPayment}
              onChange={(e) => handleDownChange(e.target.value)}
              className="w-full border border-border pl-7 pr-3 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              data-testid="calc-down-payment"
            />
          </div>
          <input
            type="range"
            min={0}
            max={maxDown}
            step={10}
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value, 10))}
            className="w-full mt-2 accent-primary"
            aria-label="Down payment slider"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Term
          </label>
          <div className="flex gap-2">
            {TERMS.map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={[
                  "flex-1 py-2.5 text-sm font-semibold border transition-colors",
                  term === t
                    ? "bg-foreground text-primary border-foreground"
                    : "bg-white text-foreground border-border hover:border-foreground",
                ].join(" ")}
                data-testid={`calc-term-${t}`}
              >
                {t}mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-muted/40 border border-border p-5 flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Estimated monthly payment
          </div>
          <div className="text-4xl md:text-5xl font-semibold text-foreground" data-testid="calc-result">
            <span className="text-primary">{formatCurrency(monthly)}</span>
            <span className="text-lg font-bold text-muted-foreground">/mo</span>
          </div>
          <div className="text-xs font-bold text-muted-foreground mt-1">
            {formatCurrency(phonePrice - downPayment)} financed over {term} months
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-11 px-5"
          >
            <a href={business.phoneTel} data-testid="calc-cta-call">
              <Phone className="w-4 h-4 mr-2" /> Call to Apply
            </a>
          </Button>
        </div>
      </div>

      <p className="text-xs font-bold text-muted-foreground leading-snug">
        {FINANCING_PAGE.calculatorNote}
      </p>
    </div>
  );
}
