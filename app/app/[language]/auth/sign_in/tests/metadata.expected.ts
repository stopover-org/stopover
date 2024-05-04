import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";

export const expectedMetadata = () => ({
  ru: merge({}, defaultMetadata, {
    description:
      "Пожалуйста, войдите, чтобы получить доступ к вашей учетной записи и воспользоваться персонализированными услугами, предназначенными специально для вас.",
    keywords:
      "Вход Доступ Аутентификация Пользовательские учетные данные Безопасный портал Учетная запись Аутентификация Войти Логин пользователя Пользовательский доступ",
    openGraph: {
      description:
        "Пожалуйста, войдите, чтобы получить доступ к вашей учетной записи и воспользоваться персонализированными услугами, предназначенными специально для вас.",
      keywords:
        "Вход Доступ Аутентификация Пользовательские учетные данные Безопасный портал Учетная запись Аутентификация Войти Логин пользователя Пользовательский доступ",
      locale: "ru",
      title: "Stopover. Your Travel Manger | Авторизация",
    },
    robots: {
      follow: false,
      googleBot: {
        follow: false,
        index: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: true,
        noimageindex: true,
      },
      index: false,
      nocache: true,
    },
    title: "Stopover. Your Travel Manger | Авторизация",
  }),
  en: merge({}, defaultMetadata, {
    description:
      "Please sign in to access your account and enjoy personalized services tailored just for you.",
    keywords:
      "Sign in Access Authentication User credentials Secure portal Account Login User login User access",
    openGraph: {
      description:
        "Please sign in to access your account and enjoy personalized services tailored just for you.",
      keywords:
        "Sign in Access Authentication User credentials Secure portal Account Login User login User access",
      locale: "en",
      title: "Stopover. Your Travel Manager | Sign In",
    },
    robots: {
      follow: false,
      googleBot: {
        follow: false,
        index: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: true,
        noimageindex: true,
      },
      index: false,
      nocache: true,
    },
    title: "Stopover. Your Travel Manager | Sign In",
  }),
});
