/*
 * CurrencyContext — ShaRiz Kreations
 * Auto-detects visitor country via IP geolocation and shows prices in local currency.
 * Supported: CAD (default), USD, AED, SAR, PKR, INR, GBP
 * Visitor can override via the currency switcher in the navbar.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// ─── Currency Config ──────────────────────────────────────────────────────────
export type CurrencyCode = "CAD" | "USD" | "AED" | "SAR" | "PKR" | "INR" | "GBP";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  // Approximate exchange rate FROM CAD (updated periodically)
  // 1 CAD = X [currency]
  rate: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  CAD: { code: "CAD", symbol: "CA$", name: "Canadian Dollar", flag: "🇨🇦", rate: 1 },
  USD: { code: "USD", symbol: "US$", name: "US Dollar",        flag: "🇺🇸", rate: 0.73 },
  AED: { code: "AED", symbol: "AED", name: "UAE Dirham",       flag: "🇦🇪", rate: 2.68 },
  SAR: { code: "SAR", symbol: "SAR", name: "Saudi Riyal",      flag: "🇸🇦", rate: 2.74 },
  PKR: { code: "PKR", symbol: "₨",   name: "Pakistani Rupee",  flag: "🇵🇰", rate: 204 },
  INR: { code: "INR", symbol: "₹",   name: "Indian Rupee",     flag: "🇮🇳", rate: 60.5 },
  GBP: { code: "GBP", symbol: "£",   name: "British Pound",    flag: "🇬🇧", rate: 0.58 },
};

// Country code → currency mapping
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  CA: "CAD",
  US: "USD",
  AE: "AED",
  SA: "SAR",
  PK: "PKR",
  IN: "INR",
  GB: "GBP",
};

// ─── Context ──────────────────────────────────────────────────────────────────
interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  convert: (cadPrice: number) => string;
  formatPrice: (cadPrice: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(() => {
    // Restore from localStorage if user previously chose a currency
    const saved = localStorage.getItem("srk_currency") as CurrencyCode | null;
    return saved && CURRENCIES[saved] ? saved : "CAD";
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only auto-detect if user hasn't manually chosen a currency
    const saved = localStorage.getItem("srk_currency");
    if (saved && CURRENCIES[saved as CurrencyCode]) {
      setIsLoading(false);
      return;
    }

    // Detect country via free IP geolocation API (no API key needed)
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) })
      .then((r) => r.json())
      .then((data) => {
        const countryCode = data?.country_code as string;
        const detected = COUNTRY_CURRENCY[countryCode];
        if (detected) {
          setCurrencyCode(detected);
        }
      })
      .catch(() => {
        // Fallback: try another free service
        fetch("https://api.country.is/", { signal: AbortSignal.timeout(4000) })
          .then((r) => r.json())
          .then((data) => {
            const detected = COUNTRY_CURRENCY[data?.country];
            if (detected) setCurrencyCode(detected);
          })
          .catch(() => { /* stay on CAD */ });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSetCurrency = (code: CurrencyCode) => {
    setCurrencyCode(code);
    localStorage.setItem("srk_currency", code);
  };

  const currency = CURRENCIES[currencyCode];

  // Convert a CAD price to the selected currency
  const convert = (cadPrice: number): string => {
    const converted = cadPrice * currency.rate;
    // Round to nearest sensible amount
    const rounded = currency.code === "PKR" || currency.code === "INR"
      ? Math.round(converted / 50) * 50   // round to nearest 50 for PKR/INR
      : Math.round(converted);
    return rounded.toLocaleString();
  };

  // Full formatted price string e.g. "CA$50" or "₨ 10,200"
  const formatPrice = (cadPrice: number): string => {
    return `${currency.symbol} ${convert(cadPrice)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, convert, formatPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}

// ─── Helper: parse CAD price string like "From $50 CAD" → 50 ─────────────────
export function parseCadPrice(priceStr: string): number | null {
  const match = priceStr.match(/\$(\d+(?:,\d+)?)/);
  if (!match) return null;
  return parseInt(match[1].replace(",", ""), 10);
}
