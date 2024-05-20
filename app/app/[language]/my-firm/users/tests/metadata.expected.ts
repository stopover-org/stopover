import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the user access management page. Here you can flexibly adjust user access to various pages of your company. Set access rights, control access levels, and ensure the security of your company with our powerful access management system.",
    keywords:
      "User access management Access rights configuration Flexible access settings Access control Access levels Company security Administrative management Page management User rights configuration Administrator access",
    title: "User Access Management: Flexible Access Settings to Company Pages",
    openGraph: {
      description:
        "Welcome to the user access management page. Here you can flexibly adjust user access to various pages of your company. Set access rights, control access levels, and ensure the security of your company with our powerful access management system.",
      keywords:
        "User access management Access rights configuration Flexible access settings Access control Access levels Company security Administrative management Page management User rights configuration Administrator access",
      title:
        "User Access Management: Flexible Access Settings to Company Pages",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу управления доступом пользователей. Здесь вы можете гибко настраивать доступ пользователей к различным страницам вашей фирмы. Установите права доступа, контролируйте уровни доступа и обеспечьте безопасность вашей фирмы с нашей мощной системой управления доступом.",
    keywords:
      "Управление доступом пользователей Настройка прав доступа Гибкие настройки доступа Контроль доступа Уровни доступа Безопасность фирмы Административное управление Управление страницами Настройка пользовательских прав Администраторский доступ",
    title:
      "Управление Доступом Пользователей: Гибкие Настройки Доступа к Страницам Фирмы",
    openGraph: {
      description:
        "Добро пожаловать на страницу управления доступом пользователей. Здесь вы можете гибко настраивать доступ пользователей к различным страницам вашей фирмы. Установите права доступа, контролируйте уровни доступа и обеспечьте безопасность вашей фирмы с нашей мощной системой управления доступом.",
      keywords:
        "Управление доступом пользователей Настройка прав доступа Гибкие настройки доступа Контроль доступа Уровни доступа Безопасность фирмы Административное управление Управление страницами Настройка пользовательских прав Администраторский доступ",
      title:
        "Управление Доступом Пользователей: Гибкие Настройки Доступа к Страницам Фирмы",
      locale: "ru",
    },
  }),
});
