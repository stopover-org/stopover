export default {
  scenes: {
    firms: {
      firmWorkflowScene: {
        header: "Start accepting payments online today",
        createCompany: {
          header: "1. Create a Company",
          subheader:
            "You don't necessarily have to create a separate company; you can act as an individual entrepreneur.",
          action: "Create your Company",
        },
        createEvents: {
          header: "2. Create Events",
          subheader: "An event can be either regular or one-time.",
          description: "Customize refund policies flexibly.",
          action: "Create Event",
        },
        allowBookings: {
          header: "3. After each booking, you will receive a notification.",
          subheader: "Limit the number of available seats if necessary.",
          description:
            "Bookings can be paid online via Stripe or in cash on-site.",
        },
        manageBookings: {
          header: "4. Manage Bookings",
          subheader: "Check in attendees upon arrival.",
          description:
            "Process booking refunds. Communicate with attendees in one place.",
        },
        payouts: {
          header: "5. Payouts",
          subheader:
            "Transfer money to your bank account as needed. Payouts can only be made after the completion of each individual event.",
        },
      },
    },
  },
};
