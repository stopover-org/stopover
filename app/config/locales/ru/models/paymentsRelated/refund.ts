export default {
  models: {
    refund: {
      singular: "Возврат",
      plural: "Возвраты",
      attributes: {
        id: "ID",
        status: "Статус",
        totalAmount: "Сумма возврата",
        penaltyAmount: "Сумма штрафа",
        updatedAt: "Дата обновления",
        createdAt: "Дата создания",
      },
    },
  },
};
