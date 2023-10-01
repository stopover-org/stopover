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
      terms: {
        withPenalty:
          "Отмена бронирования за {{deadline}} час(-ов) приведет к штрафу в размере {{penalty}}",
        withoutPenalty:
          "Отмена бронирования за {{deadline}} час(-ов) приведет к штрафу в размере {{penalty}}",
        withoutCancellationTerms: "Отмена бронирования бесплатна",
      },
    },
  },
};
