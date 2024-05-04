import { merge } from "lodash";
import bookingCancellationOptionTranslations from "./bookingCancellationOption";
import eventTranslations from "./event";
import eventOptionTranslations from "./eventOption";
import interestTranslations from "./interest";
import scheduleTranslations from "./schedule";
import stripeIntegrationTranslations from "./stripeIntegration";
import eventPlacements from "./eventPlacement";

export default merge(
  {},
  bookingCancellationOptionTranslations,
  eventTranslations,
  eventOptionTranslations,
  interestTranslations,
  scheduleTranslations,
  stripeIntegrationTranslations,
  eventPlacements
);
