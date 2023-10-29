import { merge } from "lodash";
import verifyStripeConnect from "./verifyStripeConnect";
import declineStripeConnect from "./declineStripeConnect";
import removeStripeConnect from "./removeStripeConnect";
import editFirm from "./editFirm";
import addAttendee from "./addAttendee";
import refundBooking from "./refundBooking";
import changeOptionAvailability from "./changeOptionAvailability";
import registerAttendee from "./registerAttendee";
import deregisterAttendee from "./deregisterAttendee";
import removeAttendee from "./removeAttendee";
import rescheduleEvent from "./rescheduleEvent";
import publishEvent from "./publishEvent";
import unpublishEvent from "./unpublishEvent";
import removeEvent from "./removeEvent";
import verifyEvent from "./verifyEvent";
import syncStripe from "./syncStripe";
import removeFirm from "./removeFirm";
import editEvent from "./editEvent";
import editProfile from "./editProfile";

export default merge(
  verifyStripeConnect,
  declineStripeConnect,
  removeStripeConnect,
  editFirm,
  addAttendee,
  refundBooking,
  changeOptionAvailability,
  registerAttendee,
  deregisterAttendee,
  removeAttendee,
  rescheduleEvent,
  publishEvent,
  unpublishEvent,
  removeEvent,
  verifyEvent,
  syncStripe,
  removeFirm,
  editEvent,
  editProfile
);
