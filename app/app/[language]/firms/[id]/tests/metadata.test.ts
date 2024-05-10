import { setupData, teardownData } from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
import { expect } from "@jest/globals";
import { notFoundMetadata } from "lib/testing/expectedMetadata";
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

describe("[language]/firms/[id]", () => {
  let firm: Record<string, any> | undefined;
  beforeAll(async () => {
    [firm] = await setupData({
      setup_variables: [{ factory: "firm" }],
      skip_delivery: true,
    });
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.firms.id.title");
  });

  it("revalidate", async () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe(language, () => {
      describe("getVariables", () => {
        // /[language]/firms/123==
        it("default props", () => {
          const defaultProps = {
            params: { language, id: "123==" },
            searchParams: {},
          };

          expect(getVariables(defaultProps)).toStrictEqual({ id: "123==" });
        });

        // /[language]/firms/123==?param1=123&param2=123
        it("various searchParams", () => {
          const defaultProps = {
            params: { language, id: "123==" },
            searchParams: { param1: "123", param2: "123" },
          };

          expect(getVariables(defaultProps)).toStrictEqual({ id: "123==" });
        });
      });

      describe("generateMetadata", () => {
        beforeEach(() => {
          mockCookies({ accessToken: undefined, language });
        });

        it.only("default props", async () => {
          const defaultProps = {
            params: {
              language,
              id: firm?.graphql_id,
            },
            searchParams: {},
          };
          const metadata = await generateMetadata(defaultProps);
          expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
        });

        it("incorrect id", async () => {
          const props = {
            params: {
              language,
              id: "123==",
            },
            searchParams: {},
          };
          const metadata = await generateMetadata(props);
          expect(metadata).toStrictEqual(notFoundMetadata()[language]);
        });

        it("with search params", async () => {
          const props = {
            params: {
              language,
              id: firm?.graphql_id,
            },
            searchParams: {
              param1: "123",
              param2: "456",
            },
          };
          const metadata = await generateMetadata(props);
          expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
        });
      });
    })
  );
});
