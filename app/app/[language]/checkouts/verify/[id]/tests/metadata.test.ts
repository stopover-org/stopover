import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "app/[language]/checkouts/verify/[id]/metadata";
import { Metadata } from "next";
import { setupData, teardownData, testSignIn } from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
import { notFoundMetadata } from "lib/testing/expectedMetadata";
import { checkoutsVerifyIdMetadata } from "./metadata.expected";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

jest.retryTimes(3);

describe("[language]/checkouts/verify/[id]", () => {
  let booking: Record<string, any> | undefined;
  let user: Record<string, any> | undefined;
  let email: string | undefined;
  beforeAll(async () => {
    [booking] = await setupData({
      setup_variables: [{ factory: "fully_paid_booking" }],
      skip_delivery: true,
    });

    email = booking?.user?.email;

    user = await testSignIn({ email: email! });
  });

  afterAll(async () => {
    await teardownData();
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
    describe("not authorized user", () => {
      let expected: Record<string, Metadata> = {};

      beforeEach(() => {
        expected = notFoundMetadata();
      });

      ["ru", "en"].map((language) =>
        describe(language, () => {
          beforeEach(() => {
            mockCookies({ accessToken: "incorrect-access-token", language });
          });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);

            expect(metadata).toStrictEqual(expected[language]);
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking?.graphql_id,
              },
              searchParams: { param1: "123", param2: "123" },
            };
            const metadata = await generateMetadata(defaultProps);

            expect(metadata).toStrictEqual(expected[language]);
          });
        })
      );
    });

    describe("existing booking", () => {
      let expected: Record<string, Metadata> = {};

      beforeEach(() => {
        expected = checkoutsVerifyIdMetadata(booking!);
      });

      ["ru", "en"].map((language) =>
        describe(language, () => {
          beforeEach(() => {
            mockCookies({ accessToken: user?.access_token, language });
          });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking!.graphql_id,
              },
              searchParams: {},
            };

            expect(await generateMetadata(defaultProps)).toEqual(
              expected[language]
            );
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking!.graphql_id,
              },
              searchParams: { param1: "123", param2: "123" },
            };

            expect(await generateMetadata(defaultProps)).toEqual(
              expected[language]
            );
          });
        })
      );
    });

    describe("non existing booking", () => {
      let expected: Record<string, Metadata> = {};

      beforeEach(() => {
        expected = notFoundMetadata();
      });

      ["ru", "en"].map((language) =>
        describe(language, () => {
          beforeEach(() => {
            mockCookies({ accessToken: user?.access_token, language });
          });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: "123==",
              },
              searchParams: {},
            };

            expect(await generateMetadata(defaultProps)).toEqual(
              expected[language]
            );
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: "123==",
              },
              searchParams: { param1: "123", param2: "123" },
            };

            expect(await generateMetadata(defaultProps)).toEqual(
              expected[language]
            );
          });
        })
      );
    });
  });
});
