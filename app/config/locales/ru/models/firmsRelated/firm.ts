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
    },
  },
};
