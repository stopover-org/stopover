import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, {
    description:
      "Reduce time spent on customer acquisition Receive notifications about upcoming events Register participants in one click Track booking status and its components Accept payments and withdraw money when and where convenient for you",
    keywords:
      "Customer acquisition Reduced customer acquisition time Event notifications Participant registration One-click participant registration Booking status Booking status notifications Payments and money withdrawal Flexible payment system Convenient payment solutions",
    title: "Manage Bookings, Event Schedule, and Participants",
    openGraph: {
      description:
        "Reduce time spent on customer acquisition Receive notifications about upcoming events Register participants in one click Track booking status and its components Accept payments and withdraw money when and where convenient for you",
      keywords:
        "Customer acquisition Reduced customer acquisition time Event notifications Participant registration One-click participant registration Booking status Booking status notifications Payments and money withdrawal Flexible payment system Convenient payment solutions",
      title: "Manage Bookings, Event Schedule, and Participants",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, {
    description:
      "Сократите время которое тратится на привлечение клиентов Получайте уведомления о предстоящих мероприятиях Регистрируйте участников в один клик Узнавайте статус бронирования и все что входит в него Принимайте платежи и выводите деньги когда и куда вам удобно",
    keywords:
      "Привлечение клиентов Сокращение времени привлечения клиентов Уведомления о мероприятиях Регистрация участников Однокликовая регистрация участников Статус бронирования Уведомления о статусе бронирования Платежи и вывод денег Гибкая система платежей Удобные платежные решения",
    title: "Управляйте бронированиями, расписанием мероприятий и участниками",
    openGraph: {
      description:
        "Сократите время которое тратится на привлечение клиентов Получайте уведомления о предстоящих мероприятиях Регистрируйте участников в один клик Узнавайте статус бронирования и все что входит в него Принимайте платежи и выводите деньги когда и куда вам удобно",
      keywords:
        "Привлечение клиентов Сокращение времени привлечения клиентов Уведомления о мероприятиях Регистрация участников Однокликовая регистрация участников Статус бронирования Уведомления о статусе бронирования Платежи и вывод денег Гибкая система платежей Удобные платежные решения",
      title: "Управляйте бронированиями, расписанием мероприятий и участниками",
      locale: "ru",
    },
  }),
});
