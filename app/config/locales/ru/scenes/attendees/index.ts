import { merge } from "lodash";
import bookings from "./bookings";
import events from "./events";
import trips from "./trips";

export default merge(bookings, events, trips);
