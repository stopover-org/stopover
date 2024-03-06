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
import editFirmAddress from "./editFirmAddress";
import createEventPlacement from "./createEventPlacement";
import editEventPlacement from "./editEventPlacement";
import editBookingCancellationsForm from "./editBookingCancellationsForm";
import editEventTourPlan from "./editEventTourPlan";
import inviteUser from "./inviteUser";
import createNotification from "./createNotification";
import createInterest from "./createInterest";
import createEventOption from "./createEventOption";
import resetOnboardingFirm from "./resetOnboardingFirm";

export default merge(
  resetOnboardingFirm,
  createEventOption,
  createInterest,
  createNotification,
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
  editProfile,
  editFirmAddress,
  createEventPlacement,
  editEventPlacement,
  editBookingCancellationsForm,
  editEventTourPlan,
  inviteUser
);
