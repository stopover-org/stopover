export default {
  models: {
    event: {
      singular: "Мероприятие",
      plural: "Мероприятия",
      attributes: {
        attendeePricePerUom: "Они заплатят за участника",
        averageRating: "Рейтинг",
        city: "Город",
        country: "Страна",
        description: "Описание",
        durationTime: "Длительность",
        eventType: "Тип мероприятия",
        externalId: "Внешний ID",
        fullAddress: "Полный адрес",
        houseNumber: "Номер дома",
        id: "ID",
        images: "Картинки",
        landmarks: "Достопримечательности рядом",
        latitude: "Широта",
        longitude: "Долгота",
        maxAttendees: "Макс. участников",
        minAttendees: "Мин. участников",
        organizerPricePerUom: "Вы получите за участника",
        depositAmount: "Размер депозита",
        ratingsCount: "Количество оценок",
        recurringDaysWithTime: "Повторяющиеся даты",
        region: "Регион",
        requiresCheckIn: "Требуется регистрация",
        requiresContract: "Требуется заключить договор",
        requiresPassport: "Требуется паспорт",
        singleDaysWithTime: "Даты провередния",
        status: "Статус",
        street: "Улица",
        title: "Название",
        endDate: "Дата окончания проведения",
      },
      enums: {
        eventType: {
          excursion: "Экскурсия",
          tour: "Тур",
          in_town: "Городское мероприятие",
          out_of_town: "Загородное мероприятие",
          active_holiday: "Мероприятие выходного дня",
          music: "Музыкальное мероприятие",
          workshop: "Воркшоп",
          business_breakfast: "Бизнес завтрка/ланч",
          meetup: "Митап",
          sport_activity: "Спортивное мероприятие",
          gastronomic: "Гастрономическое мероприятие",
        },
      },
      statistics: {
        bookings: "Количество бронирований",
        paid: "Количество оплаченых",
      },
    },
  },
};
