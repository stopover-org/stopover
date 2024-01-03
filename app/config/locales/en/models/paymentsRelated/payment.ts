export default {
  models: {
    payment: {
      singular: "Payment",
      plural: "Payments",
      attributes: {
        id: "ID",
        status: "Status",
        paymentType: "Type of Payment",
        totalPrice: "Total amount",
        updatedAt: "Updated at",
        createdAt: "Created at",
      },
      enums: {
        paymentTypes: {
          full_amount: "Payment for the full booking",
          deposit: "Deposit",
        },
      },
    },
  },
};
