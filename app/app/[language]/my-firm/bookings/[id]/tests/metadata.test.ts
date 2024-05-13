import { setupData, teardownData } from "lib/testing/setupData";
import { mockCookies } from "lib/testing/mockCookies";
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

// jest.retryTimes(3);

describe("/[language]/my-firm/bookings/[id]", () => {
  let booking: Record<string, any> | undefined;
  beforeAll(async () => {
    [booking] = await setupData({
      setup_variables: [{ factory: "booking" }],
      skip_delivery: true,
    });
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.myFirm.bookings.id.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["en", "ru"].map((language) =>
    describe(language, () => {
      describe("generateVariables", () => {
        // /[language]/my-firm/bookings/[id]
        it("default props", () => {
          const props = {
            params: { language, id: "123==" },
            searchParams: {},
          };

          expect(getVariables(props)).toStrictEqual({ id: "123==" });
        });

        // /[language]/my-firm/bookings/[id]?param1=123&param2=456
        it("various params", () => {
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
        beforeEach(() => {
          mockCookies({
            accessToken: booking?.firm?.accounts?.[0]?.user.access_token,
            language,
          });

          console.log(
            {
              accessToken: booking?.firm?.accounts?.[0]?.user.access_token,
              language,
            },
            booking
          );
        });

        describe("existing booking", () => {
          // /[language]/my-firm/bookings/[id]
          it.only("default props", async () => {
            const props = {
              params: { language, id: booking?.graphql_id },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              expectedMetadata()[language]
            );
          });

          // /[language]/my-firm/bookings/[id]?param1=123&param2=456
          it("various params", async () => {
            const props = {
              params: { language, id: booking?.graphql_id },
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

        describe("non existing booking", () => {
          // /[language]/my-firm/bookings/[id]
          it("default props", async () => {
            const props = {
              params: { language, id: "123==" },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              notFoundMetadata()[language]
            );
          });

          // /[language]/my-firm/bookings/[id]?param1=123&param2=456
          it("various params", async () => {
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

        describe("not authorized", () => {
          beforeEach(() => {
            mockCookies({
              accessToken: undefined,
              language,
            });
          });

          // /[language]/my-firm/bookings/[id]
          it("default props", async () => {
            const props = {
              params: { language, id: booking?.graphql_id },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              notFoundMetadata()[language]
            );
          });

          // /[language]/my-firm/bookings/[id]?param1=123&param2=456
          it("various params", async () => {
            const props = {
              params: { language, id: booking?.graphql_id },
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
