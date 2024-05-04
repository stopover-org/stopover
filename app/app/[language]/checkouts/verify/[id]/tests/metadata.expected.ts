import { Metadata } from "next";
import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";
import moment from "moment";

export const checkoutsVerifyIdMetadata = (
  booking: Record<string, any>
): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    description:
      "Обзор всех проведенных платежей для вашего бронирования. Вы найдете всю актуальную информацию четко организованной и легко доступной.",
    keywords: "",
    openGraph: {
      description:
        "Обзор всех проведенных платежей для вашего бронирования. Вы найдете всю актуальную информацию четко организованной и легко доступной.",
      keywords: "",
      locale: "ru",
      title: `Обзор всех проведенных платежей для вашего бронирования ${
        booking?.event?.title
      } ${moment(booking?.schedule?.scheduled_for)
        .calendar()
        .replaceAll("/", "&#x2F;")}`,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: false,
        noimageindex: false,
      },
      index: true,
      nocache: false,
    },
    title: `Обзор всех проведенных платежей для вашего бронирования ${
      booking?.event?.title
    } ${moment(booking?.schedule?.scheduled_for)
      .calendar()
      .replaceAll("/", "&#x2F;")}`,
  }),
  en: merge({}, defaultMetadata, {
    description:
      "Review of all payments made for your booking. You will find all the relevant information clearly organized and easily accessible.",
    keywords: "",
    openGraph: {
      description:
        "Review of all payments made for your booking. You will find all the relevant information clearly organized and easily accessible.",
      keywords: "",
      locale: "en",
      title: `Review of all payments made for your booking ${
        booking?.event?.title
      } ${moment(booking?.schedule?.scheduled_for)
        .calendar()
        .replaceAll("/", "&#x2F;")}`,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: false,
        noimageindex: false,
      },
      index: true,
      nocache: false,
    },
    title: `Review of all payments made for your booking ${
      booking?.event?.title
    } ${moment(booking?.schedule?.scheduled_for)
      .calendar()
      .replaceAll("/", "&#x2F;")}`,
  }),
});
