import { merge } from "lodash";
import firmsTranslations from "./firms";
import attendeesTranslations from "./attendees";
import signInScene from "./signInScene";

export default merge(firmsTranslations, attendeesTranslations, signInScene);
