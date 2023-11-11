import { merge } from "lodash";
import firmsTranslations from "./firms";
import attendeesTranslations from "./attendees";
import signInScene from "./signInScene";
import landingsTranslations from "./Landings";

export default merge(
  firmsTranslations,
  attendeesTranslations,
  signInScene,
  landingsTranslations
);
