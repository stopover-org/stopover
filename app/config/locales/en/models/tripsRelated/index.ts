import { merge } from "lodash";
import tripTranslations from "./trip";
import tourPlanTranslations from "./tourPlan";
import tourPlaceTranslations from "./tourPlace";

export default merge(
  {},
  tripTranslations,
  tourPlanTranslations,
  tourPlaceTranslations
);
