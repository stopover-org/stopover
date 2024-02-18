export default {
  models: {
    bookingCancellationOption: {
      singular: "Booking Cancellation Option",
      plural: "Booking Cancellation Options",
      attributes: {
        id: "ID",
        penaltyPrice: "Penalty price",
        deadline: "Deadline",
        description: "Description",
        status: "Status",
      },
      terms: {
        withPenalty:
          "Cancellation up to {{deadline}} hours prior to event will result {{penalty}} penalty",
        withoutPenalty:
          "Cancellation prior to {{deadline}} hours prior to event will result {{penalty}} penalty",
        withoutCancellationTerms: "Booking cancellation is free",
      },
    },
  },
};
