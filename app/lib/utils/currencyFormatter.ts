export const getCurrencyFormat = (
  value?: number,
  currency?: string,
  cents: boolean = true
) => {
  if (!value) return null;
  if (!currency) currency = "usd";
  const language = navigator?.language || "de-DE";
  if (cents) {
    value /= 100;
  }

  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(value);
};
