export default {
  models: {
    notification: {
      singular: "Нотификация",
      plural: "Нотификации",
      attributes: {
        id: "ID",
        content: "Сообщение",
        subject: "Тема сообщения",
        to: "Кому",
        from: "От Кого",
        sentAt: "Дата отправки",
        deliveryMethod: "Способ доставки",
      },
    },
  },
};
