import { merge } from "lodash";
import bookingsRelatedTranslations from "./bookingsRelated";
import eventsRelatedTranslations from "./eventsRelated";
import firmsRelatedTranslations from "./firmsRelated";
import paymentsRelatedTranslations from "./paymentsRelated";
import tripsRelatedTranslations from "./tripsRelated";
import usersRelatedTranslations from "./usersRelated";

export default merge(
  bookingsRelatedTranslations,
  eventsRelatedTranslations,
  firmsRelatedTranslations,
  paymentsRelatedTranslations,
  tripsRelatedTranslations,
  usersRelatedTranslations
);
