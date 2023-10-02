export default {
  models: {
    booking: {
      singular: "Booking",
      plural: "Bookings",
      attributes: {
        id: "ID",
        bookedFor: "Booking date",
        status: "Status",
        paymentType: "Payment type",
        attendeeTotalPrice: "They pay",
        organizerTotalPrice: "You get",
        leftToPayPrice: "Left to pay",
        leftToPayDeposit: "Left to pay deposit",
        alreadyPaidPrice: "Already paid",
        possibleRefundAmount: "Possible refund",
        possiblePenaltyAmount: "Possible penalty",
        cancellationTerms: "Booking cancellation terms",
      },
    },
  },
};
