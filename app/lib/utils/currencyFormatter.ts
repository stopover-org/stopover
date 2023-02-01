export const getCurrencyFormat = (value?: number, currency?: string) => {
  if (!value || !currency) return "";

  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
  }).format(value);
};
