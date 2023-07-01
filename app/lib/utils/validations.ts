import moment from "moment/moment";

export function numberTransform(value: any) {
  return Number.isNaN(value) ? undefined : value;
}

export function momentTransform(value: any) {
  return value && moment(value).isValid() ? moment(value).toDate() : undefined;
}
