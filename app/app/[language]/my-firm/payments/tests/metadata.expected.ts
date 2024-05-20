import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { noindexMetadata } from "lib/utils/metadata";

export const expectedMetadata = (): Record<string, Metadata> => ({
  en: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Welcome to the payment management page. Here you can easily manage all aspects of your payment system, including receiving payments from customers and withdrawing funds. Manage your finances securely and safely with our convenient payment platform.",
    keywords:
      "Payment management Payment system Payment acceptance Funds withdrawal Financial administration Secure payment Effective management Payment platform Financial control Service payment",
    title: "Payment Management: Simple and Secure Way to Process Payments",
    openGraph: {
      description:
        "Welcome to the payment management page. Here you can easily manage all aspects of your payment system, including receiving payments from customers and withdrawing funds. Manage your finances securely and safely with our convenient payment platform.",
      keywords:
        "Payment management Payment system Payment acceptance Funds withdrawal Financial administration Secure payment Effective management Payment platform Financial control Service payment",
      title: "Payment Management: Simple and Secure Way to Process Payments",
      locale: "en",
    },
  }),
  ru: merge({}, defaultMetadata, noindexMetadata, {
    description:
      "Добро пожаловать на страницу управления платежами. Здесь вы можете легко управлять всеми аспектами вашей системы платежей, включая прием платежей от клиентов и вывод средств. Надежно и безопасно управляйте вашими финансами с нашей удобной платформой для платежей.",
    keywords:
      "Управление платежами Система платежей Прием платежей Вывод средств Финансовая администрация Безопасный платеж Эффективное управление Платежная платформа Финансовый контроль Оплата услуг",
    title:
      "Управление Платежами: Простой и Безопасный Способ Проведения Оплаты",
    openGraph: {
      description:
        "Добро пожаловать на страницу управления платежами. Здесь вы можете легко управлять всеми аспектами вашей системы платежей, включая прием платежей от клиентов и вывод средств. Надежно и безопасно управляйте вашими финансами с нашей удобной платформой для платежей.",
      keywords:
        "Управление платежами Система платежей Прием платежей Вывод средств Финансовая администрация Безопасный платеж Эффективное управление Платежная платформа Финансовый контроль Оплата услуг",
      title:
        "Управление Платежами: Простой и Безопасный Способ Проведения Оплаты",
      locale: "ru",
    },
  }),
});
