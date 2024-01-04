export default {
  models: {
    booking: {
      singular: "Бронирование",
      plural: "Бронирования",
      attributes: {
        id: "ID",
        bookedFor: "Дата бронирования",
        status: "Статус",
        paymentType: "Выбранный способ оплаты",
        attendeeTotalPrice: "Они заплатят",
        organizerTotalPrice: "Вы получите",
        leftToPayPrice: "Осталось заплатить",
        leftToPayDeposit: "Осталось внести",
        alreadyPaidPrice: "Уже оплачено",
        possibleRefundAmount: "Возможный возврат",
        possiblePenaltyAmount: "Возможный штраф",
        cancellationTerms: "Условия возврата",
        contactEmail: "Email для связи",
        contactPhone: "Телефон для связи",
      },
      reasons: {
        inactive: "Бронь не активна",
        past: "Мероприятие прошло",
        paid: "Бронь была полностью или частично оплачена",
      },
      enums: {
        paymentTypes: {
          stripe: "Через Страйп",
          cash: "Наличными",
          crypto: "Криптовалюта",
        },
      },
    },
  },
};
