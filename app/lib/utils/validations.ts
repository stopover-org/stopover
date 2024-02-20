import { isValidPhoneNumber } from "libphonenumber-js";

export function validatePhone(value: string | undefined, ctx: any) {
  if (value) {
    return (
      isValidPhoneNumber(value as string) ||
      ctx.createError({ message: "Invalid" })
    );
  }
  return true;
}
