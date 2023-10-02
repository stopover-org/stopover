import { merge } from "lodash";
import accountTranslations from "./account";
import userTranslations from "./user";

export default merge(accountTranslations, userTranslations);
