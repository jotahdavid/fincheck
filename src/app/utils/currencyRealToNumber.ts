export function currencyRealToNumber(value: string) {
  const sanitizedValue = value.replace(/\./g, '').replace(/,/g, '.');
  return Number(sanitizedValue);
}
