import { merge } from "lodash";
import accountTranslations from "./account";
import userTranslations from "./user";
import notification from "./notification";

export default merge({}, accountTranslations, userTranslations, notification);
