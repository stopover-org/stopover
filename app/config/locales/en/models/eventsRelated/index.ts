import { merge } from "lodash";
import bookingCancellationOptionTranslations from "./bookingCancellationOption";
import eventTranslations from "./event";
import eventOptionTranslations from "./eventOption";
import interestTranslations from "./interest";
import stripeIntegrationTranslations from "./stripeIntegration";
import unitTranslations from "./unit";

export default merge(
  bookingCancellationOptionTranslations,
  eventTranslations,
  eventOptionTranslations,
  interestTranslations,
  stripeIntegrationTranslations,
  unitTranslations
);
