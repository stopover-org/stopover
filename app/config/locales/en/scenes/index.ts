import { merge } from "lodash";
import firmsTranslations from "./firms";
import attendeesTranslations from "./attendees";
import signInScene from "./signInScene";
import landingsTranslations from "./Landings";
import articlesTranslations from "./articles";

export default merge(
  {},
  articlesTranslations,
  firmsTranslations,
  attendeesTranslations,
  signInScene,
  landingsTranslations
);
