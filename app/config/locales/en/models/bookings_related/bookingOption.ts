export default {
  models: {
    bookingOption: {
      singular: "Option",
      plural: "Options",
      attributes: {
        attendeePrice: "They pay",
        organizerPrice: "You get",
        builtIn: "Free",
        status: "Status",
      },
    },
  },
};
