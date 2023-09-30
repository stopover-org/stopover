export default {
  models: {
    refund: {
      attributes: {
        id: 'ID',
        status: 'Статус',
        totalAmount: 'Сумма возврата',
        penaltyAmount: 'Сумма штрафа',
        updatedAt: 'Дата обновления',
        createdAt: 'Дата создания',
        booking: 'Бронирование'
      }
    }
  }
}