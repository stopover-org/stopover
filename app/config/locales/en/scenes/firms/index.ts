import { merge } from "lodash";
import bookingScenes from "./bookings";
import dashboardScene from "./dashboardScene";
import eventScenes from "./events";

export default merge(dashboardScene, bookingScenes, eventScenes);
