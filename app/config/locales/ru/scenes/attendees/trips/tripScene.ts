export default {
  scenes: {
    attendees: {
      trips: {
        tripScene: {
          bookingInfo: "Информация о бронировании",
          attendeesCount: "{{count}} участник(-ов)",
          bookignOptionsSubheader: "Дополнительные опции",
          cancelBooking: "Отменить бронирование",
          noAvailablePaymentMethod: "Нет доступных способов оплаты. Пока что.",
          payDeposit: "Оплатить депозит {{amount}}",
          payOnline: "Оплатить онлайн {{amount}}",
          justCome:
            "Мы вас зарегистрировали на мероприятие. Предоплата не требуется если вы хотите оплатить на месте",
          cancelBookingModal: {
            title: "Отмена бронирования",
            refundAmount: "Вам вернется:",
            penaltyAmount: "Штраф:",
            close: "Закрыть",
            confirm: "Отменить бронирование",
          },
        },
      },
    },
  },
};
