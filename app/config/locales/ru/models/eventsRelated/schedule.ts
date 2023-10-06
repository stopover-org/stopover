export default {
  models: {
    schedule: {
      singular: "Дата проведения",
      plural: "Расписание",
      attributes: {
        id: "ID",
        scheduledFor: "Дата",
        status: "Статус",
        leftPlaces: "Осталось {{places}} мест для бронирования",
      },
    },
  },
};
