import { merge } from "lodash";
import bookingScenes from "./bookings";
import dashboardScene from "./dashboardScene";

export default merge(dashboardScene, bookingScenes);
