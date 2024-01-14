import { merge } from "lodash";
import achievementTranslations from "./achievement";
import balanceTranslations from "./balance";
import firmTranslations from "./firm";
import stripeConnectTranslations from "./stripeConnect";
import addressTranslations from "./address";

export default merge(
  achievementTranslations,
  balanceTranslations,
  firmTranslations,
  stripeConnectTranslations,
  addressTranslations
);
