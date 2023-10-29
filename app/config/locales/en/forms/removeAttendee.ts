export default {
  forms: {
    removeAttendee: {
      tooltip: "Remove this attendee and refund it",
      action: "Remove attendee",
      modal: {
        header: "Booking changes confirmation",
        priceExplanation:
          "The price for the booking will be decreased to {{price}}.",
        attendeeRefundExplanation:
          "If it was paid, then this attendee will be refunded",
        optionsRefundExplanation:
          "All attendee options that was added or paid will be removed and refunded.",
      },
    },
  },
};
