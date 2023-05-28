import { Moment } from "moment";

export const dateFormat = "DD/MM/YYYY";
export const dateTimeFormat = "DD/MM/YYYY HH:mm";
export const timeFormat = "HH:mm";
export const shortDayMonthFormat = "DD/MM";
export const dayMonthFormat = "D MMMM";
export const dayMonthTimeFormat = "D MMMM HH:mm";

export const isDifferentDayMonth = (firstDate: Moment, secondDate: Moment) =>
  !firstDate.startOf("day").isSame(secondDate.startOf("day"));

export const calculateDate = (
  initialDate: Moment,
  delta: string,
  modifyMethod: "add" | "subtract"
) => {
  /* allowed values
   * initialDate: Moment,
   * delta: "10d 10h 10m",
   * modifyMethod: add | substract
   */
  const timeParser = (initialTime: string) => {
    const deltaTime = {
      days: "0",
      hours: "0",
      minutes: "0",
    };
    const time = initialTime.split(/\s/);
    time.forEach((item: string) => {
      deltaTime.days =
        (item[item.length - 1] === "d" && item.slice(0, item.length - 1)) ||
        deltaTime.days;

      deltaTime.hours =
        (item[item.length - 1] === "h" && item.slice(0, item.length - 1)) ||
        deltaTime.hours;

      deltaTime.minutes =
        (item[item.length - 1] === "m" && item.slice(0, item.length - 1)) ||
        deltaTime.minutes;
    });
    return deltaTime;
  };
  if (modifyMethod === "add")
    return initialDate
      .add(timeParser(delta).days, "d")
      .add(timeParser(delta).hours, "h")
      .add(timeParser(delta).minutes, "m");
  if (modifyMethod === "subtract")
    return initialDate
      .subtract(timeParser(delta).days, "d")
      .subtract(timeParser(delta).hours, "h")
      .subtract(timeParser(delta).minutes, "m");
  return initialDate;
};

export const setTime = (date: Moment, time: string) => {
  const [hours, minutes] = time.split(":");
  date.set("hour", parseInt(hours, 10));

  date.set("minutes", parseInt(minutes, 10));
  return date;
};

export const getDate = (arg: Moment | null) =>
  arg ? arg.format(dateFormat) : undefined;

export const getHumanDateTime = (arg: Moment | null) =>
  arg ? arg.format(dayMonthTimeFormat) : undefined;

export function removeUtc(date: string) {
  return date.replace(" UTC", "");
}
