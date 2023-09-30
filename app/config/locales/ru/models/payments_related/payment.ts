export default {
  models: {
    payment: {
      attributes: {
        id: 'ID',
        status: 'Статус',
        totalPrice: 'Сумма платежа',
        updatedAt: 'Дата обновления',
        createdAt: 'Дата создания',
        booking: 'Бронирование',
        refunds: 'Возвраты'
      }
    }
  }
}