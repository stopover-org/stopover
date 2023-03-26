import { countries } from "moment-timezone/data/packed/latest.json";

export function getCountryFromOffset() {
  if (!countries) return undefined;
  // @ts-ignore
  return countries
    .find((v) => v.match(Intl.DateTimeFormat().resolvedOptions().timeZone))
    ?.split("|")[0]
    .toLowerCase();
}
