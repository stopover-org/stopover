import { merge } from "lodash";
import paymentTranslations from "./payment";
import payoutTranslations from "./payout";
import refundTranslations from "./refund";

export default merge(
  {},
  paymentTranslations,
  payoutTranslations,
  refundTranslations
);
