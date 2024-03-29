export default {
  forms: {
    rescheduleEvent: {
      action: "Запланировать",
      modal: {
        header: "Подтвержждение изменения расписания",
        explanation:
          "Мы расчитаем и запланируем изменение расписания для мероприятия {{title}} для {{days}}.",
        pastDatesExplanation:
          "Расписание на прошедшие мероприятия изменено не будет",
        bookingsExplanation:
          "Если у вас уже есть бронирования, изменения их не коснутся. Если вам нужно их отменить - вам нужно сделать это вручную.",
      },
    },
  },
};
