export default {
  models: {
    account: {
      singular: "Аккаунт",
      plural: "Аккаунты",
      attributes: {
        id: "ID",
        status: "Статус",
        name: "Имя",
        street: "Улица",
        region: "Регион",
        country: "Страна",
        fullAddress: "Полный адрс",
        longitude: "Долгота",
        latitude: "Широта",
        phones: "Телефоны",
        primaryPhone: "Основной телефон",
        primaryEmail: "Основной email",
        verifiedAt: "Дата верификации",
        interests: "ОСновные категории",
        firm: "Фирма",
        trips: "Путешествия",
      },
    },
  },
};
