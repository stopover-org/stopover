export default {
  models: {
    balance: {
      singular: "Balance",
      plural: "Balances",
      attributes: {
        id: "ID",
        totalAmount: "Total Balance amount",
        lastPayoutAt: "Last Payout at",
        successfultPayments: "Ready for Payout",
        processingPayments: "Pending Payments",
      },
    },
  },
};
