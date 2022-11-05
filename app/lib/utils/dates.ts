import { Moment } from "moment";

export const isDifferentDay = (firstDate: Moment, secondDate: Moment) =>
  firstDate.format("DD") !== secondDate.format("DD");
