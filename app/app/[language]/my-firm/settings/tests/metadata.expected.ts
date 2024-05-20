import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the company settings page. Here, as an administrator, you can manage various parameters and settings of your company to ensure its efficient operation. Edit access, set permissions, and configure your company's settings with ease and confidence.",
    keywords:
      "Company settings Parameter management Administrative settings Access configuration Administrator permissions User management Security configuration Data management Administrative panel Company configuration",
    title: "Company Settings: Manage Parameters and Access",
    openGraph: {
      description:
        "Welcome to the company settings page. Here, as an administrator, you can manage various parameters and settings of your company to ensure its efficient operation. Edit access, set permissions, and configure your company's settings with ease and confidence.",
      keywords:
        "Company settings Parameter management Administrative settings Access configuration Administrator permissions User management Security configuration Data management Administrative panel Company configuration",
      title: "Company Settings: Manage Parameters and Access",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу настроек фирмы. Здесь вы, как администратор, можете управлять различными параметрами и настройками вашей фирмы, чтобы обеспечить её эффективную работу. Редактируйте доступ, устанавливайте права и настраивайте параметры вашей фирмы с легкостью и уверенностью.",
    keywords:
      "Настройки фирмы Управление параметрами Административные настройки Настройка доступа Права администратора Управление пользователями Настройка безопасности Управление данными Административная панель Конфигурация фирмы",
    title: "Настройки Фирмы: Управление Параметрами и Доступ",
    openGraph: {
      description:
        "Добро пожаловать на страницу настроек фирмы. Здесь вы, как администратор, можете управлять различными параметрами и настройками вашей фирмы, чтобы обеспечить её эффективную работу. Редактируйте доступ, устанавливайте права и настраивайте параметры вашей фирмы с легкостью и уверенностью.",
      keywords:
        "Настройки фирмы Управление параметрами Административные настройки Настройка доступа Права администратора Управление пользователями Настройка безопасности Управление данными Административная панель Конфигурация фирмы",
      title: "Настройки Фирмы: Управление Параметрами и Доступ",
      locale: "ru",
    },
  }),
});
