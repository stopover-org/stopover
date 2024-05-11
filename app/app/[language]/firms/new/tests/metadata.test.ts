import { setupData, teardownData } from "lib/testing/setupData";
import { beforeEach } from "@jest/globals";
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

describe("[language]/firms/new", () => {
  let firm: Record<string, any> | undefined;
  let accessToken: string | undefined;

  beforeAll(async () => {
    [firm] = await setupData({
      setup_variables: [{ factory: "firm" }],
      skip_delivery: true,
    });

    accessToken = firm?.accounts?.[0]?.user?.accessToken;
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.firms.new.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["ru", "en"].map((language) =>
    describe(language, () => {
      describe("getVariables", () => {
        // /[language]/firms/new
        it("default props", () => {
          const defaultProps = {
            params: { language },
            searchParams: {},
          };

          expect(getVariables(defaultProps)).toStrictEqual({});
        });

        // /[language]/firms/new?param1=123&param2=456
        it("various params", () => {
          const props = {
            params: { language },
            searchParams: {
              param1: "123",
              param2: "456",
            },
          };

          expect(getVariables(props)).toStrictEqual({});
        });
      });

      describe("generateMetadata", () => {
        // /[language]/firms/new
        describe("not authorized user", () => {
          it("default props", async () => {
            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });
        });

        describe("authorized user", () => {
          beforeEach(() => {
            mockCookies({ accessToken, language });
          });

          it("default props", async () => {
            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });
        });

        // /[language]/firms/new?param1=123&param2=456
        describe("not authorized user", () => {
          it("various params", async () => {
            const props = {
              params: { language },
              searchParams: { param1: 123, param2: 456 },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });
        });

        describe("authorized user", () => {
          beforeEach(() => {
            mockCookies({ accessToken, language });
          });

          it("various params", async () => {
            const props = {
              params: { language },
              searchParams: { param1: 123, param2: 456 },
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
