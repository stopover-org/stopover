import { merge } from "lodash";
import eventScene from "./eventScene";
import eventsScene from "./eventsScene";

export default merge({}, eventScene, eventsScene);
