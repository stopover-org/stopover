import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

// [TODO] update translations to the actual translations
export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description: "Analytics, Events, Bookings, Management: {{description}}",
    keywords: "{{keywords}}",
    title: "Analytics, Events, Bookings, Management: {{title}}",

    openGraph: {
      description: "Analytics, Events, Bookings, Management: {{description}}",
      keywords: "{{keywords}}",
      title: "Analytics, Events, Bookings, Management: {{title}}",

      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Аналитика, Мероприятия, Бронирования, Управление: {{description}}",
    keywords: "{{keywords}}",
    title: "Аналитика, Мероприятия, Бронирования, Управление: {{title}}",
    openGraph: {
      description:
        "Аналитика, Мероприятия, Бронирования, Управление: {{description}}",
      keywords: "{{keywords}}",
      title: "Аналитика, Мероприятия, Бронирования, Управление: {{title}}",
      locale: "ru",
    },
  }),
});
