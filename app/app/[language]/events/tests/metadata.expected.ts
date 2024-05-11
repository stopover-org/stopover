import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";

export const expectedMetadata = ({
  city = "",
  startDate = "",
  endDate = "",
  interests = [],
}: {
  city?: string;
  startDate?: string;
  endDate?: string;
  interests?: string[];
}): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    description:
      `Планируйте ваше время в ${city} на период с ${startDate} по ${endDate}. Изучите разнообразные мероприятия, включая ${interests}, чтобы насладиться лучшими культурными и развлекательными событиями в ${city}.`.replaceAll(
        "/",
        "&#x2F;"
      ),
    keywords:
      `События в ${city} ${city} мероприятия ${startDate} - ${endDate} ${interests} события Лучшие мероприятия в ${city} Культурные события Развлекательные мероприятия Городские мероприятия Мероприятия для ${startDate}-${endDate} События в ${city} ${startDate}-${endDate}`.replaceAll(
        "/",
        "&#x2F;"
      ),
    title:
      `События в ${city}, с ${startDate} по ${endDate}. ${interests}`.replaceAll(
        "/",
        "&#x2F;"
      ),
    openGraph: {
      description:
        `Планируйте ваше время в ${city} на период с ${startDate} по ${endDate}. Изучите разнообразные мероприятия, включая ${interests}, чтобы насладиться лучшими культурными и развлекательными событиями в ${city}.`.replaceAll(
          "/",
          "&#x2F;"
        ),
      keywords:
        `События в ${city} ${city} мероприятия ${startDate} - ${endDate} ${interests} события Лучшие мероприятия в ${city} Культурные события Развлекательные мероприятия Городские мероприятия Мероприятия для ${startDate}-${endDate} События в ${city} ${startDate}-${endDate}`.replaceAll(
          "/",
          "&#x2F;"
        ),
      title:
        `События в ${city}, с ${startDate} по ${endDate}. ${interests}`.replaceAll(
          "/",
          "&#x2F;"
        ),
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, {
    description:
      `Plan your time in ${city} from ${startDate} to ${endDate}. Explore various events including ${interests} to enjoy the best cultural and entertainment events in ${city}.`.replaceAll(
        "/",
        "&#x2F;"
      ),
    keywords:
      `Events in ${city} ${city} events ${startDate} - ${endDate} ${interests} events Best events in ${city} Cultural events Entertainment events City events Events for ${startDate}-${endDate} Events in ${city} ${startDate}-${endDate}`.replaceAll(
        "/",
        "&#x2F;"
      ),
    title:
      `Events in ${city}, from ${startDate} to ${endDate}. ${interests}`.replaceAll(
        "/",
        "&#x2F;"
      ),
    openGraph: {
      description:
        `Plan your time in ${city} from ${startDate} to ${endDate}. Explore various events including ${interests} to enjoy the best cultural and entertainment events in ${city}.`.replaceAll(
          "/",
          "&#x2F;"
        ),
      keywords:
        `Events in ${city} ${city} events ${startDate} - ${endDate} ${interests} events Best events in ${city} Cultural events Entertainment events City events Events for ${startDate}-${endDate} Events in ${city} ${startDate}-${endDate}`.replaceAll(
          "/",
          "&#x2F;"
        ),
      title:
        `Events in ${city}, from ${startDate} to ${endDate}. ${interests}`.replaceAll(
          "/",
          "&#x2F;"
        ),
      locale: "en",
    },
  }),
});
