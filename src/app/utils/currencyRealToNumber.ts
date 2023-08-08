export function currencyRealToNumber(value: string) {
  const sanitizedValue = value.replace(/\./g, '').replace(/,/g, '.').replace(/[^,|\d|.|-]/g, '');
  return Number(sanitizedValue);
}
