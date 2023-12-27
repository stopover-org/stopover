import { merge } from "lodash";
import bookings from "./bookings";
import events from "./events";
import trips from "./trips";
import firms from "./firms";

export default merge(bookings, events, trips, firms);
