export const FINANCING_TERM_MONTHS = 18;

export function calcMonthlyEstimate(priceStr: string, termMonths = FINANCING_TERM_MONTHS): number | null {
  const cleaned = priceStr.replace(/[^0-9.]/g, "");
  const numeric = parseFloat(cleaned);
  if (!numeric || numeric <= 0) return null;
  return Math.round(numeric / termMonths);
}

export function calcMonthlyEstimateNumeric(price: number, downPayment: number, termMonths: number): number {
  const balance = Math.max(1, price - downPayment);
  return Math.round(balance / termMonths);
}
