export default {
  models: {
    refund: {
      singular: "Refund",
      plural: "Refunds",
      attributes: {
        id: "ID",
        status: "Status",
        totalAmount: "Total amount",
        penaltyAmount: "Penalty amount",
        updatedAt: "Updated at",
        createdAt: "Created at",
      },
    },
  },
};
