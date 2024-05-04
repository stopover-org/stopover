import { describe, expect, it } from "@jest/globals";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "app/[language]/auth/sign_in/metadata";
import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";

describe("[language]/auth/sign_in]", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.auth.signIn.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe("getVariables", () => {
      // /[language]/auth/sign_in
      it("default props", () => {
        const defaultProps = {
          params: { language, id: "id" },
          searchParams: {},
        };

        expect(getVariables(defaultProps)).toStrictEqual({});
      });

      // /[language]/auth/sign_in?param1=123&param2=123
      it("various searchParams", () => {
        const defaultProps = {
          params: { language, id: "id" },
          searchParams: { param1: "123", param2: "123" },
        };

        expect(getVariables(defaultProps)).toStrictEqual({});
      });
    })
  );

  describe("generateMetadata", () => {
    const expected: Record<string, Metadata> = {
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
    };

    Object.keys(expected).map((language) =>
      describe(language, () => {
        // /[language]/auth/sign_in
        it("default props", async () => {
          const defaultProps = {
            params: { language, id: "id" },
            searchParams: {},
          };

          expect(await generateMetadata(defaultProps)).toStrictEqual(
            expected[language]
          );
        });

        // /[language]/auth/sign_in?param1=123&param2=123
        it("various searchParams", async () => {
          const defaultProps = {
            params: { language, id: "id" },
            searchParams: { param1: "123", param2: "123" },
          };

          expect(await generateMetadata(defaultProps)).toStrictEqual(
            expected[language]
          );
        });
      })
    );
  });
});
