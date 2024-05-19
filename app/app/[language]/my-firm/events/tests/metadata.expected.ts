import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the event management page. Here you can efficiently organize, register participants, and analyze your event data. Manage all aspects of your event with our convenient and powerful administrative panel.",
    keywords:
      "Event management Event organization Participant registration Event administration Guest management Event analytics Online registration Effective management Ticket management Administrative panel",
    title: "Event Management: Organization, Registration, and Analytics",
    openGraph: {
      description:
        "Welcome to the event management page. Here you can efficiently organize, register participants, and analyze your event data. Manage all aspects of your event with our convenient and powerful administrative panel.",
      keywords:
        "Event management Event organization Participant registration Event administration Guest management Event analytics Online registration Effective management Ticket management Administrative panel",
      title: "Event Management: Organization, Registration, and Analytics",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу управления мероприятиями. Здесь вы можете эффективно организовывать, регистрировать участников и анализировать данные вашего мероприятия. Управляйте всеми аспектами вашего мероприятия с нашей удобной и мощной административной панелью.",
    keywords:
      "Управление мероприятиями Организация мероприятий Регистрация участников Мероприятий администрирование Управление гостями Аналитика мероприятий Онлайн регистрация Эффективное управление Управление билетами Административная панель",
    title: "Управление Мероприятиями: Организация, Регистрация и Аналитика",
    openGraph: {
      description:
        "Добро пожаловать на страницу управления мероприятиями. Здесь вы можете эффективно организовывать, регистрировать участников и анализировать данные вашего мероприятия. Управляйте всеми аспектами вашего мероприятия с нашей удобной и мощной административной панелью.",
      keywords:
        "Управление мероприятиями Организация мероприятий Регистрация участников Мероприятий администрирование Управление гостями Аналитика мероприятий Онлайн регистрация Эффективное управление Управление билетами Административная панель",
      title: "Управление Мероприятиями: Организация, Регистрация и Аналитика",
      locale: "ru",
    },
  }),
});
