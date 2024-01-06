export default {
  models: {
    schedule: {
      singular: "Date of event",
      plural: "Timetable",
      attributes: {
        id: "ID",
        scheduledFor: "Date",
        status: "Status",
        leftPlaces: "Left {{places}} places for booking",
      },
      statistics: {
        bookings: "Qty bookings",
        paid: "Qty paid bookings",
      },
    },
  },
};
