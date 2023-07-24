import { isValidPhoneNumber } from "libphonenumber-js";

export function validatePhone(value: string | undefined, ctx: any) {
  return (
    isValidPhoneNumber(value as string) ||
    ctx.createError({ message: "invalid" })
  );
}
