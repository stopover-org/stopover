export default {
  scenes: {
    attendees: {
      trips: {
        tripScene: {
          confirmBooking: "Confirm participation",
          bookingInfo: "Booking Info",
          attendeesCount: "{{count}} attendee(-s)",
          bookignOptionsSubheader: "Additional Options",
          cancelBooking: "Cancel Booking",
          changeBooking: "Change Booking",
          adjustAttendees: "Adjust attendees",
          noAvailablePaymentMethod:
            "There is no available payment methods. Yet.",
          payDeposit: "Pay Depsot {{amount}}",
          payOnline: "Pay Online {{amount}}",
          justCome: "We registered you already.",
          requireSignIn: "You need to sign in to continue",
          leftToPayLater:
            "When you will come you will need to pay {{leftToPayLater}} in cash",
          places: "Places",
          cancelBookingModal: {
            title: "Booking cancellation",
            refundAmount: "Refund amount:",
            penaltyAmount: "Penalty:",
            close: "Close",
            confirm: "Cancel this booking",
          },
          editAttendeeModal: {
            title: "Attendee settings",
            callSupport:
              "For changes in the booking please write to our support service",
          },
          editBookingModal: {
            title: "Edit booking",
            callSupport:
              "For changes in the booking please write to our support service",
          },
          showQrCode: {
            title: "Show this QR code for registering to the event",
            action: "Show QR code",
          },
        },
      },
    },
  },
};
