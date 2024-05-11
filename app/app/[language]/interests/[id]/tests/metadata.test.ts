import { setupData, teardownData } from "lib/testing/setupData";
import { notFoundMetadata } from "lib/testing/expectedMetadata";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "../metadata";
import { expectedMetadata } from "./metadata.expected";
import { mockCookies } from "../../../../../lib/testing/mockCookies";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

jest.retryTimes(3);

describe("[language]/interests/[id]", () => {
  let interest: Record<string, any> | undefined;
  beforeAll(async () => {
    [interest] = await setupData({
      setup_variables: [{ factory: "interest" }],
      skip_delivery: true,
    });
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.interests.id.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["en", "ru"].map((language) =>
    describe(language, () => {
      beforeEach(() => {
        mockCookies({ accessToken: undefined, language });
      });

      describe("getVariables", () => {
        // /[language]/interests/[id]
        it("default props", () => {
          const props = {
            params: { language, id: "123==" },
            searchParams: {},
          };

          expect(getVariables(props)).toStrictEqual({ id: "123==" });
        });

        // /[language]/interests/[id]?param1=123&param2=456
        it("various search params", () => {
          const props = {
            params: { language, id: "123==" },
            searchParams: {
              param1: 123,
              param2: 456,
            },
          };

          expect(getVariables(props)).toStrictEqual({ id: "123==" });
        });
      });

      describe("generateMetadata", () => {
        describe("existing interest", () => {
          // /[language]/interests/[id]
          it("default props", async () => {
            const props = {
              params: { language, id: interest?.graphql_id },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata(interest)[language]
            );
          });

          // /[language]/interests/[id]?param1=123&param2=456
          it("various search params", async () => {
            const props = {
              params: { language, id: interest?.graphql_id },
              searchParams: {
                param1: 123,
                param2: 456,
              },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata(interest)[language]
            );
          });
        });

        describe("non existing interest", () => {
          // /[language]/interests/[id]
          it("default props", async () => {
            const props = {
              params: { language, id: "123==" },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              notFoundMetadata()[language]
            );
          });

          // /[language]/interests/[id]?param1=123&param2=456
          it("various search params", async () => {
            const props = {
              params: { language, id: "123==" },
              searchParams: {
                param1: 123,
                param2: 456,
              },
            };

            expect(await generateMetadata(props)).toStrictEqual(
              notFoundMetadata()[language]
            );
          });
        });
      });
    })
  );
});
