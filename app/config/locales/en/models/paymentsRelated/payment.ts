export default {
  models: {
    payment: {
      singular: "Payment",
      plural: "Payments",
      attributes: {
        id: "ID",
        status: "Status",
        totalPrice: "Total amount",
        updatedAt: "Updated at",
        createdAt: "Created at",
      },
    },
  },
};
