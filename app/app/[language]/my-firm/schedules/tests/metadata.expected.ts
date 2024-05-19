import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the schedule management page. Here you can easily create, edit, and manage your schedules to organize your time most efficiently. Manage your time with our convenient and intuitive schedule management system.",
    keywords:
      "Schedule management Time organization Event schedule Time planning Effective management Schedule control Schedule editing Planning system Calendar management Work schedule",
    title: "Schedule Management: Organize Your Time Efficiently",
    openGraph: {
      description:
        "Welcome to the schedule management page. Here you can easily create, edit, and manage your schedules to organize your time most efficiently. Manage your time with our convenient and intuitive schedule management system.",
      keywords:
        "Schedule management Time organization Event schedule Time planning Effective management Schedule control Schedule editing Planning system Calendar management Work schedule",
      title: "Schedule Management: Organize Your Time Efficiently",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу управления расписаниями. Здесь вы можете легко создавать, редактировать и управлять вашими расписаниями, чтобы организовать своё время максимально эффективно. Управляйте своим временем с нашей удобной и интуитивно понятной системой управления расписаниями.",
    keywords:
      "Управление расписаниями Организация времени Расписание событий Планирование времени Эффективное управление Управление графиком Редактирование расписания Система планирования Календарное управление График работы",
    title: "Управление Расписаниями: Организуйте Своё Время Эффективно",
    openGraph: {
      description:
        "Добро пожаловать на страницу управления расписаниями. Здесь вы можете легко создавать, редактировать и управлять вашими расписаниями, чтобы организовать своё время максимально эффективно. Управляйте своим временем с нашей удобной и интуитивно понятной системой управления расписаниями.",
      keywords:
        "Управление расписаниями Организация времени Расписание событий Планирование времени Эффективное управление Управление графиком Редактирование расписания Система планирования Календарное управление График работы",
      title: "Управление Расписаниями: Организуйте Своё Время Эффективно",
      locale: "ru",
    },
  }),
});
