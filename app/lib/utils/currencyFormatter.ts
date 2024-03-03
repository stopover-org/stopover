export const getCurrencyFormat = (
  value?: number,
  currency?: string,
  cents: boolean = true
) => {
  if (!value) {
    value = 0;
  }
  if (!currency) currency = "rsd";
  const language = "de-DE";

  if (cents) {
    value /= 100;
  }

  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(value);
};
