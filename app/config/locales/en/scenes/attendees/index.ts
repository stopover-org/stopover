import { merge } from "lodash";
import bookings from "./bookings";
import events from "./events";
import trips from "./trips";
import firms from "./firms";
import profile from "./profile";
import timetables from "./timetables";

export default merge(timetables, bookings, events, trips, firms, profile);
