import moment from "moment/moment";

export function numberTransform(value: any) {
  console.log(value);
  return Number.isNaN(value) ? undefined : value;
}

export function momentTransform(value: any) {
  return moment(value).isValid() ? moment(value).toDate() : null;
}
