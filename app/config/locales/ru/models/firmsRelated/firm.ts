export default {
  models: {
    firm: {
      singular: "Компании",
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
        margin: "Маржа",
      },
      enums: {
        paymentTypes: {
          stripe: "Online",
          cash: "Наличными",
        },
      },
    },
  },
};
