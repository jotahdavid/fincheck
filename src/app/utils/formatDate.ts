export function formatDate(date: Date) {
  return Intl.DateTimeFormat('pt-BR').format(date);
}
