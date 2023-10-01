export default {
  forms: {
    changeOptionAvailability: {
      tooltip: "Изменить доступность",
      actions: {
        add: "Добавить",
        remove: "Удалить",
      },
      modal: {
        header: "Подтверждение изменения бронирования",
        toAvailable: {
          builtInExplanation: "{{title}} будет добавлена в бронирование",
          commonExplanation:
            "Стоимость бронирования будет увеличена на {{amount}}",
        },
        toUnavailable: {
          builtInExplanation: "{{title}} будет удалена из данного бронирование",
          commonExplanation:
            "Стоимость бронирования будет уменьшена на {{amount}}",
        },
        explanation:
          "Если данная опция была оплачена, то данная сумма будет возвращена участникам.",
      },
    },
  },
};
