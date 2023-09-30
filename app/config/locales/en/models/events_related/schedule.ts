export default {
  models: {
    schedule: {
      single: "",
      plural: "",
      attributes: {
        id: "ID",
        scheduledFor: "Date",
        status: "Status",
        event: "Event",
        bookings: "Bookings",
      },
    },
  },
};
