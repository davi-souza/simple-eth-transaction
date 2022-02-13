export function renderCurrency(
  value: number,
  fractionDigits: number = 2,
): string {
  return value.toFixed(fractionDigits);
}
