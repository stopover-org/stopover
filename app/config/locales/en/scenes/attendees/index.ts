import { merge } from "lodash";
import bookings from "./bookings";
import events from "./events";
import trips from "./trips";
import firms from "./firms";
import profile from "./profile";

export default merge(bookings, events, trips, firms, profile);
