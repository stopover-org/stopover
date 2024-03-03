export default {
  models: {
    firm: {
      singular: "Компания",
      plural: "Фирма",
      attributes: {
        id: "ID",
        city: "Город",
        contactPerson: "Контактное лицо",
        contacts: "Контакты",
        country: "Страна",
        description: "Описание",
        fullAddress: "Полный адрес",
        houseNumber: "Номер дома",
        latitude: "Широта",
        longitude: "Долгота",
        region: "Регион",
        status: "Статус",
        street: "Улица",
        title: "Название",
        website: "Сайт",
        image: "Логотип",
        paymentType: "Доступные способы оплаты",
        availablePaymentMethods: "Доступные для выбора способы оплаты",
        margin: "Маржа",
        primaryPhone: "Телефон для уведомлений",
        primaryEmail: "Email для уведомлений",
        contractAddress: "Адрес контракта для проведения криптоплатежей",
      },
      enums: {
        paymentTypes: {
          stripe: "Online",
          cash: "Наличными",
          crypto: "Криптовалюта",
        },
      },
      statusExplanations: {
        pending: [
          "Фирма ожидает верикификации. Убедитесь что контактный email указан верно. В ближайшее время мы с вами свжемся для уточнения деталей.",
          "Вы можете создавать мероприятия включая даты проведения, изображения и  прочие актуальные данные, но оно не будет опубликовано до проверки верификации фирмы.",
          "В случае возникновения любых вопросов пишите на почту {{email}} или в чат на сайте.",
        ],
        active: [
          "Фирма была проверена. Вы можете создавать любые мероприятия.",
          "В случае возникновения любых вопросов пишите на почту {{email}} или в чат на сайте.",
        ],
        removed: [
          "Фирма была удалена. Все мероприятия были сняты с публикации, все незавершенные бронирования были отменены и деньги возвращены участникам в соответствии с политиками возврата.",
          "В случае возникновения любых вопросов пишите на почту {{email}} или в чат на сайте.",
        ],
      },
    },
  },
};
