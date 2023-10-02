import { merge } from "lodash";
import achievementTranslations from "./achievement";
import balanceTranslations from "./balance";
import firmTranslations from "./firm";
import stripeConnectTranslations from "./stripeConnect";

export default merge(
  achievementTranslations,
  balanceTranslations,
  firmTranslations,
  stripeConnectTranslations
);
