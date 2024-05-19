import { merge } from "lodash";
import defaultMetadata from "lib/utils/defaultMetadata";
import { Metadata } from "next";
import {
  getAuthorizedUser,
  getManager,
  getNotAuthorizedUser,
  getRestrictedUser,
  getServiceUser,
} from "./setupData";
import { mockCookies } from "./mockCookies";

export const notFoundMetadata = (): Record<string, Metadata> => ({
  ru: merge({}, defaultMetadata, {
    description: "Такой страницы не существует",
    keywords: "Такой страницы не существует",
    openGraph: {
      description: "Такой страницы не существует",
      keywords: "Такой страницы не существует",
      locale: "ru",
      title: "Такой страницы не существует",
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
    title: "Такой страницы не существует",
  }),
  en: merge({}, defaultMetadata, {
    description: "This page doesn't exist",
    keywords: "This page doesn't exist",
    openGraph: {
      description: "This page doesn't exist",
      keywords: "This page doesn't exist",
      locale: "en",
      title: "This page doesn't exist",
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
    title: "This page doesn't exist",
  }),
});

export const notAuthorizedMetadata = (): Record<string, Metadata> => ({
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
      title: "Stopover. Your Travel Manager | Не авторизовано",
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
    title: "Stopover. Your Travel Manager | Не авторизовано",
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
      title: "Stopover. Your Travel Manager | Not Authorized",
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

export const redirectMetadata = (url: string): Record<string, Metadata> => {
  url = url.replaceAll("/", "&#x2F;");
  return {
    ru: merge({}, defaultMetadata, {
      description: `Stopover. Your Travel Manager | Переход на ${url}`,
      keywords: "",
      openGraph: {
        description: `Stopover. Your Travel Manager | Переход на ${url}`,
        keywords: "",
        locale: "ru",
        title: `Stopover. Your Travel Manager | Переход на ${url}`,
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
      title: `Stopover. Your Travel Manager | Переход на ${url}`,
    }),
    en: merge({}, defaultMetadata, {
      description: `Stopover. Your Travel Manager | Redirect to ${url}`,
      keywords: "",
      openGraph: {
        description: `Stopover. Your Travel Manager | Redirect to ${url}`,
        keywords: "",
        locale: "en",
        title: `Stopover. Your Travel Manager | Redirect to ${url}`,
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
      title: `Stopover. Your Travel Manager | Redirect to ${url}`,
    }),
  };
};

export const describeMyFirmResources = (
  language: string,
  getVariables: any,
  generateMetadata: any,
  expected: any,
  expectedVariables: any
) =>
  describe(language, () => {
    describe("getVariables", () => {
      it("default props", () => {
        expect(
          getVariables({ params: { language }, searchParams: {} })
        ).toEqual(expectedVariables);
      });
    });

    describe("generateMetadata", () => {
      describe("authorized user", () => {
        it("generate", async () => {
          const accessToken = await getAuthorizedUser({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(notFoundMetadata()[language]);
        });
      });

      describe("not authorized user", () => {
        it("generate", async () => {
          const accessToken = await getNotAuthorizedUser({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(notFoundMetadata()[language]);
        });
      });

      describe("restricted user", () => {
        it("generate", async () => {
          const accessToken = await getRestrictedUser({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(notFoundMetadata()[language]);
        });
      });

      describe("manager", () => {
        it("generate", async () => {
          const accessToken = await getManager({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(expected()[language]);
        });
      });

      describe("service user", () => {
        it("generate", async () => {
          const accessToken = await getServiceUser({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(expected()[language]);
        });
      });

      describe("active firm", () => {
        it("generate", async () => {
          const accessToken = await getManager({
            tokenOnly: true,
            attributes: {},
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(expected()[language]);
        });
      });

      describe("pending firm", () => {
        it("generate", async () => {
          const accessToken = await getManager({
            tokenOnly: true,
            attributes: {
              status: "pending",
            },
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(expected()[language]);
        });
      });

      describe("removed firm", () => {
        it("generate", async () => {
          const accessToken = await getManager({
            tokenOnly: true,
            attributes: {
              status: "removed",
            },
          });

          mockCookies({ accessToken, language });

          expect(
            await generateMetadata({ params: { language }, searchParams: {} })
          ).toStrictEqual(redirectMetadata(`${language}/firms/new`)[language]);
        });
      });
    });
  });
