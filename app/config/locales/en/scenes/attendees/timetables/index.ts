import { merge } from "lodash";
import interestTimetableScene from "./interestTimetableScene";
import firmTimetableScene from "./firmTimetableScene";

export default merge({}, interestTimetableScene, firmTimetableScene);
