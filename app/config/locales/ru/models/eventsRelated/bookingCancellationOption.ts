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
          "Отмена бронирования за {{deadline}} час(-ов) до начала мероприятия приведет к штрафу в размере {{penalty}}",
        withoutPenalty:
          "Отмена бронирования ранее {{deadline}} час(-ов) до начала мероприятия будет без штрафа",
        withoutCancellationTerms: "Отмена бронирования бесплатна",
      },
    },
  },
};
