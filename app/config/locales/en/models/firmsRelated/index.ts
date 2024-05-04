import { merge } from "lodash";
import balanceTranslations from "./balance";
import firmTranslations from "./firm";
import stripeConnectTranslations from "./stripeConnect";
import addressTranslations from "./address";

export default merge(
  {},
  balanceTranslations,
  firmTranslations,
  stripeConnectTranslations,
  addressTranslations
);
