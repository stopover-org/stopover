import {
  notFoundMetadata,
  redirectMetadata,
} from "lib/testing/expectedMetadata";
import {
  getAuthorizedUser,
  getManager,
  getNotAuthorizedUser,
  getRestrictedUser,
  getServiceUser,
} from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "../metadata";
import { expectedMetadata } from "./metadata.expected";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

jest.retryTimes(3);

describe("[language]/my-firm/settings", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.myFirm.settings.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["en", "ru"].map((language) =>
    describe(language, () => {
      describe("getVariables", () => {
        it("default props", () => {
          expect(
            getVariables({
              params: { language },
              searchParams: {},
            })
          ).toEqual({});
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
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
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
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
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
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(notFoundMetadata()[language]);
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
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(expectedMetadata()[language]);
          });
        });

        describe("active firm", () => {
          it("generate", async () => {
            const accessToken = await getServiceUser({
              tokenOnly: true,
              attributes: {},
            });

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(expectedMetadata()[language]);
          });
        });

        describe("pending firm", () => {
          it("generate", async () => {
            const accessToken = await getServiceUser({
              tokenOnly: true,
              attributes: {
                status: "pending",
              },
            });

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(expectedMetadata()[language]);
          });
        });

        describe("removed firm", () => {
          it("generate", async () => {
            const accessToken = await getServiceUser({
              tokenOnly: true,
              attributes: {
                status: "removed",
              },
            });

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(
              redirectMetadata(`${language}/firms/new`)[language]
            );
          });
        });
      });
    })
  );
});
