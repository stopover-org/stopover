export default {
  models: {
    balance: {
      singular: "Баланс",
      plural: "Баланс",
      attributes: {
        id: "ID",
        totalAmount: "Сумма на балансе",
        lastPayoutAt: "Последняя выплата была",
        successfultPayments: "ДОступные для выплаты",
        processingPayments: "Платежи которые обрабатываются",
      },
    },
  },
};
