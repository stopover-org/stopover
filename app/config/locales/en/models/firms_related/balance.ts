export default {
  models: {
    balance: {
      attributes: {
        id: 'ID',
        totalAmount: 'Total Balance amount',
        lastPayoutAt: 'Last Payout at',
        successfultPayments: 'Ready for Payout',
        processingPayments: 'Pending Payments',
        firm: 'Firm',
        payouts: 'Payouts'
      }
    }
  }
}