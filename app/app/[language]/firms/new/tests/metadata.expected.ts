import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";

export const expectedMetadata = (): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    title: "Регистрация новой фирмы: Начнем!",
    description: "", // "Добро пожаловать! Заполните форму ниже, чтобы зарегистрировать вашу новую фирму. Мы рады приветствовать вас в нашем сообществе деловых партнеров. После заполнения формы вы сможете получить доступ к нашим услугам и возможностям.",
    keywords:
      "Регистрация Новая фирма Форма регистрации Бизнес-регистрация Заполнение формы Регистрация компании Регистрационные данные Официальная регистрация Фирменная регистрация Деловая форма",

    openGraph: {
      title: "Регистрация новой фирмы: Начнем!",
      description: "", // "Добро пожаловать! Заполните форму ниже, чтобы зарегистрировать вашу новую фирму. Мы рады приветствовать вас в нашем сообществе деловых партнеров. После заполнения формы вы сможете получить доступ к нашим услугам и возможностям.",
      keywords:
        "Регистрация Новая фирма Форма регистрации Бизнес-регистрация Заполнение формы Регистрация компании Регистрационные данные Официальная регистрация Фирменная регистрация Деловая форма",
      locale: "ru",
    },
  }),
  en: merge({}, defaultMetadata, {
    title: "Register a New Firm: Let's Get Started!",
    description: "", // "Welcome! Fill out the form below to register your new firm. We are glad to welcome you to our community of business partners. After completing the form, you will be able to access our services and opportunities.",
    keywords:
      "Registration New firm Registration form Business registration Form filling Company registration Registration data Official registration Firm registration Business form",
    openGraph: {
      title: "Register a New Firm: Let's Get Started!",
      description: "", // "Welcome! Fill out the form below to register your new firm. We are glad to welcome you to our community of business partners. After completing the form, you will be able to access our services and opportunities.",
      keywords:
        "Registration New firm Registration form Business registration Form filling Company registration Registration data Official registration Firm registration Business form",
      locale: "en",
    },
  }),
});
