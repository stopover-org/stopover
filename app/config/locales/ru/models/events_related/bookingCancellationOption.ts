export default {
  models: {
    bookingCancellationOption: {
      singular: "Условия отмены бронирования",
      plural: "Условия отмены бронирования",
      attributes: {
        id: "ID",
        penaltyPrice: "Сумма штрафа",
        deadline: "Дедлайн",
        description: "Описание",
        status: "Статус",
      },
    },
  },
};
