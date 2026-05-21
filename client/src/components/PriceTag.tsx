/*
 * PriceTag — ShaRiz Kreations
 * Renders a price string with automatic currency conversion.
 * Accepts a CAD price string like "From $50 CAD" or a raw number.
 */

import { useCurrency, parseCadPrice } from "@/contexts/CurrencyContext";

interface PriceTagProps {
  /** Price string like "From $50 CAD", "From $200 CAD", or "Custom Quote" */
  price: string;
  /** Optional extra className */
  className?: string;
  /** Show "From" prefix */
  showFrom?: boolean;
}

export function PriceTag({ price, className = "", showFrom = true }: PriceTagProps) {
  const { formatPrice, currency } = useCurrency();

  // Handle non-numeric prices like "Custom Quote"
  const cadAmount = parseCadPrice(price);
  if (cadAmount === null) {
    return <span className={className}>{price}</span>;
  }

  const isFrom = price.toLowerCase().includes("from");
  const formatted = formatPrice(cadAmount);

  return (
    <span className={className}>
      {isFrom && showFrom ? "From " : ""}
      {formatted}
      {currency.code !== "CAD" && (
        <span className="text-[0.7em] opacity-50 ml-1">{currency.code}</span>
      )}
    </span>
  );
}

/** Inline price for pricing tiers — e.g. "From $50" */
export function TierPrice({ price, className = "" }: { price: string; className?: string }) {
  const { formatPrice, currency } = useCurrency();

  if (price === "Custom Quote") return <span className={className}>Custom Quote</span>;

  const cadAmount = parseCadPrice(price);
  if (cadAmount === null) return <span className={className}>{price}</span>;

  const isFrom = price.toLowerCase().includes("from");

  return (
    <span className={className}>
      {isFrom ? "From " : ""}
      {formatPrice(cadAmount)}
      {currency.code !== "CAD" && (
        <span className="text-[0.7em] opacity-40 ml-1">{currency.code}</span>
      )}
    </span>
  );
}
