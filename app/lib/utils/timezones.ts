import momentTimezones from "moment-timezone/data/packed/latest.json";

export function getCountryFromOffset() {
  if (!momentTimezones.countries) return undefined;
  // @ts-ignore
  return momentTimezones.countries
    .find((v) => v.match(Intl.DateTimeFormat().resolvedOptions().timeZone))
    ?.split("|")[0]
    .toUpperCase();
}
