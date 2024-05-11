import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";
import { Metadata } from "next";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, {
    description:
      "Welcome to the category management section in the admin panel. Here you can create, edit, and delete categories, making navigation and content organization on your website easier.",
    keywords:
      "Category management Admin panel Category creation Category editing Category deletion Content organization Category navigation Content management Category administration Categorization system",
    title: "Category Management",
    openGraph: {
      description:
        "Welcome to the category management section in the admin panel. Here you can create, edit, and delete categories, making navigation and content organization on your website easier.",
      keywords:
        "Category management Admin panel Category creation Category editing Category deletion Content organization Category navigation Content management Category administration Categorization system",
      title: "Category Management",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, {
    description:
      "Добро пожаловать в раздел управления категориями в административной панели. Здесь вы можете создавать, редактировать и удалять категории, облегчая навигацию и организацию контента на вашем сайте.",
    keywords:
      "Управление категориями Административная панель Создание категорий Редактирование категорий Удаление категорий Организация контента Навигация по категориям Управление контентом Администрирование категорий Система категоризации",
    title: "Управление Категориями",
    openGraph: {
      description:
        "Добро пожаловать в раздел управления категориями в административной панели. Здесь вы можете создавать, редактировать и удалять категории, облегчая навигацию и организацию контента на вашем сайте.",
      keywords:
        "Управление категориями Административная панель Создание категорий Редактирование категорий Удаление категорий Организация контента Навигация по категориям Управление контентом Администрирование категорий Система категоризации",
      locale: "ru",
      title: "Управление Категориями",
    },
  }),
});
