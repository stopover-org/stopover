import { merge } from "lodash";
import attendeeTranslations from "./attendee";
import attendeeOptionTranslations from "./attendeeOption";
import bookingTranslations from "./booking";
import bookingOptionTranslations from "./bookingOption";

export default merge(
  {},
  attendeeTranslations,
  attendeeOptionTranslations,
  bookingTranslations,
  bookingOptionTranslations
);
