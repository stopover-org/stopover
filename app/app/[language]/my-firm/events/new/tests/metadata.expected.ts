import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the event creation page. Here you can easily create and customize your own event, defining dates, venues, ticket information, and other details. Start organizing your next successful event right now!",
    keywords:
      "Event creation Event organization New event Event customization Event management Date definition Venue selection Ticket information Event administration Event organization",
    title: "Creating an Event: Start Your Event",
    openGraph: {
      description:
        "Welcome to the event creation page. Here you can easily create and customize your own event, defining dates, venues, ticket information, and other details. Start organizing your next successful event right now!",
      keywords:
        "Event creation Event organization New event Event customization Event management Date definition Venue selection Ticket information Event administration Event organization",
      title: "Creating an Event: Start Your Event",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу создания мероприятия. Здесь вы можете легко создавать и настраивать ваше собственное мероприятие, определяя даты, место проведения, информацию о билетах и другие детали. Начните организацию вашего следующего успешного мероприятия прямо сейчас!",
    keywords:
      "Создание мероприятия Организация события Новое мероприятие Настройка мероприятия Управление мероприятием Определение даты Выбор места проведения Информация о билетах Мероприятий администрирование Организация мероприятия",
    title: "Создание Мероприятия: Начните Свое Событие",
    openGraph: {
      description:
        "Добро пожаловать на страницу создания мероприятия. Здесь вы можете легко создавать и настраивать ваше собственное мероприятие, определяя даты, место проведения, информацию о билетах и другие детали. Начните организацию вашего следующего успешного мероприятия прямо сейчас!",
      keywords:
        "Создание мероприятия Организация события Новое мероприятие Настройка мероприятия Управление мероприятием Определение даты Выбор места проведения Информация о билетах Мероприятий администрирование Организация мероприятия",
      title: "Создание Мероприятия: Начните Свое Событие",
      locale: "ru",
    },
  }),
});
