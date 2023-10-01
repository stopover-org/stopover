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
  removeAttendee
);
