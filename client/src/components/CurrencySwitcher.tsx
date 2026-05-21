/*
 * CurrencySwitcher — ShaRiz Kreations
 * A compact dropdown in the navbar that lets visitors switch currencies.
 * Shows flag + code. Works on desktop and mobile.
 */

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/contexts/CurrencyContext";

export function CurrencySwitcher({ compact = false }: { compact?: boolean }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
        style={{
          background: "rgba(212,175,55,0.12)",
          border: "1px solid rgba(212,175,55,0.3)",
          color: "#D4AF37",
          fontFamily: "'Jost', sans-serif",
          letterSpacing: "0.05em",
        }}
        title="Switch currency"
      >
        <span className="text-sm leading-none">{currency.flag}</span>
        {!compact && <span>{currency.code}</span>}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-[200] rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: "rgba(18,14,10,0.97)",
            border: "1px solid rgba(212,175,55,0.2)",
            backdropFilter: "blur(20px)",
            minWidth: "180px",
          }}
        >
          <div className="px-3 pt-3 pb-1">
            <p className="text-[10px] tracking-widest uppercase text-[#D4AF37]/60" style={{ fontFamily: "'Jost', sans-serif" }}>
              Select Currency
            </p>
          </div>
          {(Object.values(CURRENCIES) as typeof CURRENCIES[CurrencyCode][]).map((c) => (
            <button
              key={c.code}
              onClick={() => { setCurrency(c.code); setOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-white/5"
              style={{
                color: c.code === currency.code ? "#D4AF37" : "rgba(255,245,230,0.7)",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              <span className="text-base leading-none">{c.flag}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold tracking-wide">{c.code}</span>
                <span className="text-[10px] text-white/40 ml-1.5">{c.symbol}</span>
              </div>
              <span className="text-[10px] text-white/30 truncate">{c.name}</span>
              {c.code === currency.code && (
                <span className="text-[#D4AF37] text-xs ml-1">✓</span>
              )}
            </button>
          ))}
          <div className="px-3 py-2 border-t" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
            <p className="text-[9px] text-white/25 text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
              Rates are approximate. Final price in CAD.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
