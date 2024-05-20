import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу управления бронированиями. Здесь вы можете легко просматривать, управлять и обрабатывать все свои бронирования, обеспечивая гладкое и эффективное взаимодействие с вашими клиентами и гостями.",
    keywords:
      "Управление бронированиями Бронирование номеров Обработка бронирований Управление гостиничными бронями Онлайн бронирование Эффективное управление Бронирование помещений Гостиничное бронирование Управление заказами Система бронирования",
    title: "Управление бронированиями",
    openGraph: {
      description:
        "Добро пожаловать на страницу управления бронированиями. Здесь вы можете легко просматривать, управлять и обрабатывать все свои бронирования, обеспечивая гладкое и эффективное взаимодействие с вашими клиентами и гостями.",
      keywords:
        "Управление бронированиями Бронирование номеров Обработка бронирований Управление гостиничными бронями Онлайн бронирование Эффективное управление Бронирование помещений Гостиничное бронирование Управление заказами Система бронирования",
      title: "Управление бронированиями",
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, noindexMetadata, {
    keywords:
      "Booking management Room booking Booking processing Hotel booking management Online booking Efficient management Venue booking Hotel reservation Order management Booking system",
    description:
      "Welcome to the booking management page. Here you can easily view, manage, and process all your bookings, ensuring smooth and efficient interaction with your clients and guests.",
    title: "Booking Management",
    openGraph: {
      keywords:
        "Booking management Room booking Booking processing Hotel booking management Online booking Efficient management Venue booking Hotel reservation Order management Booking system",
      description:
        "Welcome to the booking management page. Here you can easily view, manage, and process all your bookings, ensuring smooth and efficient interaction with your clients and guests.",
      title: "Booking Management",
      locale: "en",
    },
  }),
});
