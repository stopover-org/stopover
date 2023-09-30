import { merge } from "lodash";
import translations from "./models";

const translation = {
  general: {
    back: "Back",
    email: "email",
    phone: "phone",
    total: "total",
    attendee: "attendee",
  },
  datepicker: {
    selectDate: "Select Date",
    selectTime: "Select Time",
  },
  layout: {
    header: {
      myTrips: "My Trips",
      myFirm: "My Firm",
      registerFirm: "Register Firm",
      logIn: "Log In",
      logOut: "Log Out",
    },
  },
  event: {
    book: "Book",
    trip: "Trip",
    ratingOf: "{{val}} of {{max}}",
  },
  attendee: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
  },
  statuses: {
    active: "Active",
    past: "Past",
    paid: "Paid",
    cancelled: "Cancelled",
    future: "Future",
    successful: "Successful",
    pending: "Pending",
    processing: "Processing",
  },
  paymentTypes: {
    stripe: "Online",
    cash: "Cash",
  },
  scenes: {
    verifyBooking: {
      toTrip: "To The Trip",
    },
    signIn: {
      changeLoginType: "Change {{type}}",
      header: "Sign In / Sign Up",
      enterCode: "Enter code from {{type}}",
      youCanResendDelay: "You can send code again in {{seconds}} seconds",
      resendCode: "Resend code again",
      enterEmail: "Enter Email",
      enterPhone: "Enter телефон",
      useType: "Use {{type}}",
      signInAction: "Sign In",
    },
    attendees: {
      eventScene: {
        bookEvent: "Book Event",
        chooseDate: "Choose Date",
        chooseTime: "Choose Time",
        chooseCount: "How many Attendees",
      },
      tripScene: {
        bookingInfo: "Booking Info",
        attendeesCount: "{{count}} attendee(-s)",
        alreadyPaid: "Already paid:",
        bookignOptionsSubheader: "Additional Options",
        builtIn: "Build In",
        cancelBooking: "Cancel Booking",
        changeDate: "Change",
        noAvailablePaymentMethod: "There is no available payment methods. Yet.",
        payDeposit: "Pay Depsot {{amount}}",
        payOnline: "Pay Online {{amount}}",
        cancelBookingModal: {
          title: "Booking cancellation",
          refundAmount: "Refund amount:",
          penaltyAmount: "Penalty:",
          close: "Close",
          confirm: "Cancel this booking",
        },
      },
      eventsScene: {
        sidebar: {
          city: "City",
          startDate: "Start Date",
          endDate: "End Date",
          startDatePlaceholder: "Enter Start Date",
          endDatePlaceholder: "Enter End Date",
          priceRance: "Price range",
          minPrice: "Min Price",
          maxPrice: "Max Price",
          categoriesSubheader: "Categories",
        },
      },
    },
  },
};

export default merge(translations, translation);
