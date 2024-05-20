import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to your user profile! Here you can manage your profile, view orders, notification settings, and much more. The user profile is your center for managing all aspects of your account.",
    keywords:
      "User profile User profile Profile management User orders Notification settings Account management User account Order viewing Data management Account management",
    title: "User Profile: Your Profile and Settings",
    openGraph: {
      description:
        "Welcome to your user profile! Here you can manage your profile, view orders, notification settings, and much more. The user profile is your center for managing all aspects of your account.",
      keywords:
        "User profile User profile Profile management User orders Notification settings Account management User account Order viewing Data management Account management",
      title: "User Profile: Your Profile and Settings",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать в ваш личный кабинет! Здесь вы можете управлять вашим профилем, просматривать заказы, настройки уведомлений и многое другое. Личный кабинет - это ваш центр управления всеми аспектами вашего аккаунта.",
    keywords:
      "Личный кабинет Профиль пользователя Управление профилем Заказы пользователя Настройки уведомлений Управление аккаунтом Пользовательский кабинет Просмотр заказов Управление данными Управление аккаунтом",
    title: "Личный Кабинет Пользователя: Ваш Профиль и Настройки",
    openGraph: {
      description:
        "Добро пожаловать в ваш личный кабинет! Здесь вы можете управлять вашим профилем, просматривать заказы, настройки уведомлений и многое другое. Личный кабинет - это ваш центр управления всеми аспектами вашего аккаунта.",
      keywords:
        "Личный кабинет Профиль пользователя Управление профилем Заказы пользователя Настройки уведомлений Управление аккаунтом Пользовательский кабинет Просмотр заказов Управление данными Управление аккаунтом",
      title: "Личный Кабинет Пользователя: Ваш Профиль и Настройки",
      locale: "ru",
    },
  }),
});
