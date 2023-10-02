export default {
  models: {
    payment: {
      singular: "Платеж",
      plural: "Платежи",
      attributes: {
        id: "ID",
        status: "Статус",
        totalPrice: "Сумма платежа",
        updatedAt: "Дата обновления",
        createdAt: "Дата создания",
      },
    },
  },
};
