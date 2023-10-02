export default {
  models: {
    trip: {
      singular: "Trip",
      plural: "Trips",
      attributes: {
        bookings: "Bookings",
        startDate: "Start date",
        endDate: "End date",
        cities: "Cities",
        status: "Status",
        images: "Images",
        canCancel: "Can be canceled?",
        attendeesCount: "Estimated attendees count",
      },
    },
  },
};
