export default {
  forms: {
    changeOptionAvailability: {
      tooltip: "Change Availability",
      actions: {
        add: "Add",
        remove: "Remove",
      },
      modal: {
        header: "Booking changes confirmation",
        toAvailable: {
          builtInExplanation: "{{title}} will be removed from this booking",
          commonExplanation:
            "The price for the booking will be decreased to {{amount}}",
        },
        toUnavailable: {
          builtInExplanation: "{{title}} will be added to this booking",
          commonExplanation:
            "The price for the booking will be increased to {{amount}}",
        },
        explanation:
          "If it was paid, then this option will be refunded and not available for selection",
      },
    },
  },
};
