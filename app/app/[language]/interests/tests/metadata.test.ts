import { notFoundMetadata } from "lib/utils/metadata";
import { setupData, teardownData } from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
import {
  generateMetadata,
  revalidate,
  getVariables,
  PAGE_TITLE,
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

describe("[language]/interests", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.interests.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["ru", "en"].map((language) =>
    describe(language, () => {
      describe("getVariables", () => {
        // /[language]/interests
        it("default props", () => {
          const props = {
            params: { language },
            searchParams: {},
          };

          expect(getVariables(props)).toStrictEqual({});
        });

        // /[language]/interests?param1=123&param2=456
        it("various search params", () => {
          const props = {
            params: { language },
            searchParams: {
              param1: 123,
              param2: 456,
            },
          };

          expect(getVariables(props)).toStrictEqual({});
        });
      });

      describe("generateMetadata", () => {
        describe("not authorized user", () => {
          beforeEach(() => {
            mockCookies({ accessToken: undefined, language });
          });

          // /[language]/interests
          it("default props", async () => {
            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              await notFoundMetadata(language)
            );
          });

          // /[language]/interests?param1=123&param2=456
          it("various search params", async () => {
            const props = {
              params: { language },
              searchParams: {
                param1: 123,
                param2: 456,
              },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              await notFoundMetadata(language)
            );
          });
        });

        describe("authorized common user", () => {
          let accessToken: string | undefined;
          beforeAll(async () => {
            const [user] = await setupData({
              setup_variables: [{ factory: "active_user" }],
              skip_delivery: true,
            });

            accessToken = user.access_token;
          });

          afterAll(async () => {
            await teardownData();
          });

          beforeEach(() => {
            mockCookies({ accessToken, language });
          });

          // /[language]/interests
          it("default props", async () => {
            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              await notFoundMetadata(language)
            );
          });

          // /[language]/interests?param1=123&param2=456
          it("various search params", async () => {
            const props = {
              params: { language },
              searchParams: {
                param1: 123,
                param2: 456,
              },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              await notFoundMetadata(language)
            );
          });
        });

        describe("authorized service user", () => {
          let accessToken: string | undefined;
          beforeAll(async () => {
            const [user] = await setupData({
              setup_variables: [
                { factory: "active_user", attributes: { service_user: true } },
              ],
              skip_delivery: true,
            });

            accessToken = user.access_token;
          });

          afterAll(async () => {
            await teardownData();
          });

          beforeEach(() => {
            mockCookies({ accessToken, language });
          });

          // /[language]/interests
          it("default props", async () => {
            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });

          // /[language]/interests?param1=123&param2=456
          it("various search params", async () => {
            const props = {
              params: { language },
              searchParams: {
                param1: 123,
                param2: 456,
              },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });
        });
      });
    })
  );
});
