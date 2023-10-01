import { merge } from "lodash";
import translations from "./models";
import scenesTranslations from "./scenes";
import formsTranslations from "./forms";

const translation = {
  general: {
    back: "Back",
    email: "email",
    phone: "phone",
    total: "total",
    attendee: "attendee",
    actions: "Actions",
    all: "All",
    additional: "Additional",
    id: "ID",
    noData: "Not available",
    save: "Save",
    edit: "Edit",
    cancel: "Закрыть",
    available: "Доступные",
  },
  datepicker: {
    selectDate: "Select Date",
    selectTime: "Select Time",
  },
  layout: {
    header: {
      myTrips: "My Trips",
      myFirm: "My Firm",
      addNewEvent: "Add new event",
      registerFirm: "Register Firm",
      logIn: "Log In",
      logOut: "Log Out",
    },
  },
  event: {
    book: "Book",
    ratingOf: "{{val}} of {{max}}",
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
    inactive: "Not active",
    removed: "Removed",
    published: "Published",
    unpublished: "Not Published",
    draft: "Draft",
    registered: "Registered",
    not_registered: "Not registered",
    available: "Available",
    not_available: "Not available",
  },
  address: {
    title: "Address",
    fullAddress: "Full address",
    country: "Country",
    region: "Region",
    city: "City",
    street: "Street",
    houseNumber: "House number",
  },
  scenes: {
    verifyBooking: {
      toTrip: "To The Trip",
    },
    attendees: {
      eventScene: {
        bookEvent: "Book Event",
        chooseCount: "How many Attendees",
      },
      tripsScene: {
        cancelTrip: "Cancel entire trip",
      },
      tripScene: {
        bookingInfo: "Booking Info",
        attendeesCount: "{{count}} attendee(-s)",
        bookignOptionsSubheader: "Additional Options",
        cancelBooking: "Cancel Booking",
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

export default merge(
  translations,
  formsTranslations,
  scenesTranslations,
  translation
);
