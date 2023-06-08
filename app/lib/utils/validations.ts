export function numberTransform(value: any) {
  return Number.isNaN(value) ? undefined : value;
}
