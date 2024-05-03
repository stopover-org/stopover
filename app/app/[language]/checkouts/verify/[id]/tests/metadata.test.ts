import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "app/[language]/checkouts/verify/[id]/metadata";
import { Metadata } from "next";
import { setupData, teardownData, testSignIn } from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
import {
  checkoutsVerifyIdMetadata,
  notFoundMetadata,
} from "lib/testing/expectedMetadata";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

describe("[language]/checkouts/verify/[id]", () => {
  let booking: Record<string, any> | undefined;
  let user: Record<string, any> | undefined;
  let email: string | undefined;
  beforeAll(async () => {
    booking = await setupData({
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
      ["ru", "en"].forEach((language) => {
        describe(language, () => {
          mockCookies({ accessToken: "incorrect-access-token", language });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking?.graphql_id,
                testing: true,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            const expectedMetadata = notFoundMetadata()[language];

            expect(metadata).toStrictEqual(expectedMetadata);
          });

          // /[language]/checkouts/verify/123==?param1=123&param2=123
          it("various searchParams", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking?.graphql_id,
                testing: true,
              },
              searchParams: { param1: "123", param2: "123" },
            };

            generateMetadata(defaultProps).then((metadata) => {
              const expectedMetadata = notFoundMetadata()[language];

              expect(metadata).toStrictEqual(expectedMetadata);
            });
          });
        });
      });
    });

    describe("existing booking", () => {
      const expected: Record<string, Metadata> = checkoutsVerifyIdMetadata();

      Object.keys(expected).map((language) =>
        describe(language, () => {
          mockCookies({ accessToken: user?.access_token, language });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: booking!.graphql_id,
                testing: true,
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
                testing: true,
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
      const expected: Record<string, Metadata> = notFoundMetadata();

      Object.keys(expected).map((language) =>
        describe(language, () => {
          mockCookies({ accessToken: user?.access_token, language });

          // /[language]/checkouts/verify/123==
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: "123==",
                testing: true,
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
                testing: true,
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