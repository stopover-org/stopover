import { merge } from "lodash";

import bookings from "./bookings";
import schedules from "./schedules";

export default merge({}, bookings, schedules);
