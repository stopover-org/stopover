export default {
  models: {
    balance: {
      attributes: {
        id: 'ID',
        totalAmount: 'Сумма на балансе',
        lastPayoutAt: 'Последняя выплата была',
        successfultPayments: 'ДОступные для выплаты',
        processingPayments: 'Платежи которые обрабатываются',
        firm: 'Фирма',
        payouts: 'Выплаты'
      }
    }
  }
}