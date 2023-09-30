export default {
  models: {
    refund: {
      single: "",
      plural: "",
      attributes: {
        id: "ID",
        status: "Статус",
        totalAmount: "Сумма возврата",
        penaltyAmount: "Сумма штрафа",
        updatedAt: "Дата обновления",
        createdAt: "Дата создания",
        booking: "Бронирование",
      },
    },
  },
};
