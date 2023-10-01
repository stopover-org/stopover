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
    cancel: "Close",
    available: "Available",
    yes: "Yes",
    no: "No",
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
    latitude: "Latitude",
    longitude: "Longitude",
  },
};

export default merge(
  translations,
  formsTranslations,
  scenesTranslations,
  translation
);
