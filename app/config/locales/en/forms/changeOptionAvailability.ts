export default {
  forms: {
    changeOptionAvailability: {
      tooltip: "Change Availability",
      action: "Change Availability",
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
          baseOptionExplanation: "This option will be available for selection",
        },
        toUnavailable: {
          builtInExplanation: "{{title}} will be added to this booking",
          commonExplanation:
            "The price for the booking will be increased to {{amount}}",
          baseOptionExplanation:
            "This option will not be available for selection",
        },
        explanation:
          "If it was paid, then this option will be refunded and not available for selection",
      },
    },
  },
};
