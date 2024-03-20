import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "app/[language]/checkouts/verify/[id]/metadata";
import defaultMetadata from "lib/utils/defaultMetadata";
import { merge } from "lodash";
import { Metadata } from "next";
import { setupData } from "lib/testing/setupData";

describe("[language]/checkouts/verify/[id]", () => {
  beforeAll(async () => {
    const result = await setupData({
      setup_variables: [
        {
          factory: "published_event",
          attributes: {},
        },
      ],
    });

    console.log(result);
  });

  afterAll(async () => {
    // await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.checkouts.verify.id.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe("getVariables", () => {
      // /[language]/checkouts/verify/123==
      it("default props", () => {
        const defaultProps = {
          params: { language, id: "id" },
          searchParams: {},
        };

        expect(getVariables(defaultProps)).toStrictEqual({});
      });

      // /[language]/checkouts/verify/123==?param1=123&param2=123
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
      ru: merge(defaultMetadata, {
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
      en: merge(defaultMetadata, {
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
        // /[language]/checkouts/verify/123==
        it("default props", async () => {
          const defaultProps = {
            params: { language, id: "id" },
            searchParams: {},
          };

          expect(await generateMetadata(defaultProps)).toStrictEqual(
            expected[language]
          );
        });

        // /[language]/checkouts/verify/123==?param1=123&param2=123
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
