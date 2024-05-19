import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the administrative control panel of your company. Here you can manage all aspects of your business: from personnel and inventory management to tracking finances and interacting with customers. Effective management of your company starts here.",
    keywords:
      "Administrative panel Company management Business management Personnel management Inventory management Financial accounting Customer management Effective management Business administration Business processes",
    title: "Editing Company Information",
    openGraph: {
      description:
        "Welcome to the administrative control panel of your company. Here you can manage all aspects of your business: from personnel and inventory management to tracking finances and interacting with customers. Effective management of your company starts here.",
      keywords:
        "Administrative panel Company management Business management Personnel management Inventory management Financial accounting Customer management Effective management Business administration Business processes",
      title: "Editing Company Information",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать в административную панель управления вашей фирмой. Здесь вы можете управлять всеми аспектами вашего бизнеса: от управления персоналом и инвентарем до отслеживания финансов и взаимодействия с клиентами. Эффективное управление вашей фирмой начинается здесь.",
    keywords:
      "Административная панель Управление фирмой Управление бизнесом Управление персоналом Управление инвентарем Финансовый учет Управление клиентами Эффективное управление Бизнес-администрирование Бизнес-процессы",
    title: "Изменение информации фирмы",
    openGraph: {
      description:
        "Добро пожаловать в административную панель управления вашей фирмой. Здесь вы можете управлять всеми аспектами вашего бизнеса: от управления персоналом и инвентарем до отслеживания финансов и взаимодействия с клиентами. Эффективное управление вашей фирмой начинается здесь.",
      keywords:
        "Административная панель Управление фирмой Управление бизнесом Управление персоналом Управление инвентарем Финансовый учет Управление клиентами Эффективное управление Бизнес-администрирование Бизнес-процессы",
      title: "Изменение информации фирмы",
      locale: "ru",
    },
  }),
});
