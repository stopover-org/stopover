import moment from "moment/moment";

export function numberTransform(value: any) {
  return Number.isNaN(value) ? 0 : parseInt(value, 10);
}

export function momentTransform(value: any) {
  return moment(value).isValid() ? moment(value).toDate() : null;
}
