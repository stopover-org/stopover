import moment, { Moment } from "moment";

export const isDifferentDayMonth = (firstDate: Moment, secondDate: Moment) =>
  !firstDate.startOf("day").isSame(secondDate.startOf("day"));
export const calculateDate = (
  initialDate: Moment,
  delta: string,
  modifyMethod: string
) => {
  /* allowed values
   *initialDate: Moment,
   *delta: "10d 10h 10m",
   *modifyMethod: add | substract
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
  return moment("00:00:00");
};
export const getTime = (arg: Moment | null) =>
  arg ? arg.format("HH:mm") : undefined;
export const getDayMonth = (arg: Moment | null) =>
  arg ? arg.format("D MMMM") : undefined;
export const getDate = (arg: Moment | null) =>
  arg ? arg.format("DD/MM/YYYY") : undefined;
