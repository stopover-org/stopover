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
import { setupData, teardownData, testSignIn } from "lib/testing/setupData";
import headers from "next/headers";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

describe("[language]/checkouts/verify/[id]", () => {
  beforeAll(async () => {
    const factoryResult = await setupData({
      setup_variables: [{ factory: "payment_successful" }],
    });

    console.log(factoryResult);

    const user = await testSignIn({ email: "attendee@stopoverx.com" });
    console.log("signed in user", user);
  });

  afterAll(async () => {
    await teardownData();
  });

  it.only("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.checkouts.verify.id.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe("getVariables", () => {
      // /[language]/checkouts/verify/123==
      it.only("default props", () => {
        const defaultProps = {
          params: { language, id: "123==" },
          searchParams: {},
        };

        expect(getVariables(defaultProps)).toStrictEqual({ id: "123==" });
      });

      // /[language]/checkouts/verify/123==?param1=123&param2=123
      it("various searchParams", () => {
        const defaultProps = {
          params: { language, id: "123==" },
          searchParams: { param1: "123", param2: "123" },
        };

        expect(getVariables(defaultProps)).toStrictEqual({ id: "123==" });
      });
    })
  );

  describe("generateMetadata", () => {
    const user = { access_token: "" };
    const booking = { graphql_id: "" };
    describe("existing booking", () => {
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
          (headers.cookies as any).mockImplementation(() => ({
            getAll: () => [
              {
                name: "access_token",
                value: user.access_token,
              },
              {
                name: "i18next",
                value: language,
              },
            ],
          }));

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking.graphql_id,
                testing: true,
                cookies: { access_token: user.access_token },
              },
              searchParams: {},
            };

            expect(await generateMetadata(defaultProps)).toStrictEqual(
              expected[language]
            );
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking.graphql_id,
                testing: true,
                cookies: { access_token: user.access_token },
              },
              searchParams: { param1: "123", param2: "123" },
            };

            expect(await generateMetadata(defaultProps)).toStrictEqual(
              expected[language]
            );
          });
        })
      );
    });

    describe("non existing booking", () => {
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
          (headers.cookies as any).mockImplementation(() => ({
            getAll: () => [
              {
                name: "access_token",
                value: user.access_token,
              },
              {
                name: "i18next",
                value: language,
              },
            ],
          }));

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: "id",
                testing: true,
                cookies: { access_token: user.access_token },
              },
              searchParams: {},
            };

            expect(await generateMetadata(defaultProps)).toStrictEqual(
              expected[language]
            );
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: "id",
                testing: true,
                cookies: { access_token: user.access_token },
              },
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
});
