export default {
  models: {
    payment: {
      singular: "Платеж",
      plural: "Платежи",
      attributes: {
        id: "ID",
        status: "Статус",
        paymentType: "Тип платежа",
        totalPrice: "Сумма платежа",
        updatedAt: "Дата обновления",
        createdAt: "Дата создания",
      },
      enums: {
        paymentTypes: {
          full_amount: "Оплата всего бронирования",
          deposit: "Предоплата",
        },
      },
    },
  },
};
