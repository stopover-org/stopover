export default {
  scenes: {
    attendees: {
      trips: {
        tripScene: {
          confirmBooking: "Подтвердить участие",
          bookingInfo: "Информация о бронировании",
          attendeesCount: "{{count}} участник(-ов)",
          bookignOptionsSubheader: "Дополнительные опции",
          cancelBooking: "Отменить бронирование",
          changeBooking: "Изменить бронировние",
          adjustAttendees: "Настроить участников",
          noAvailablePaymentMethod: "Нет доступных способов оплаты. Пока что.",
          payDeposit: "Оплатить депозит {{amount}}",
          payOnline: "Оплатить онлайн {{amount}}",
          justCome: "Мы вас зарегистрировали на мероприятие.",
          leftToPayLater:
            "На месте вам нужно будет доплатить {{leftToPayLater}} наличными",
          cancelBookingModal: {
            title: "Отмена бронирования",
            refundAmount: "Вам вернется:",
            penaltyAmount: "Штраф:",
            close: "Закрыть",
            confirm: "Отменить бронирование",
          },
          editAttendeeModal: {
            title: "Участники",
            callSupport:
              "Для внесения изменений свяжитесь с нашей службой поддержки",
          },
          editBookingModal: {
            title: "Изменение бронирования",
            callSupport:
              "Для внесения изменений свяжитесь с нашей службой поддержки",
          },
          showQrCode: {
            title: "Покажите этот QR код для регистрации на мероприятие",
            action: "Показать QR код",
          },
        },
      },
    },
  },
};
