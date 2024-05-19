import { notFoundMetadata } from "lib/testing/expectedMetadata";
import {
  getAuthorizedUser,
  getNotAuthorizedUser,
  getRestrictedUser,
  setupData,
  teardownData,
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

describe("[language]/my-firm/schedules/[id]", () => {
  let schedule: Record<string, any> | undefined;

  beforeAll(async () => {
    [schedule] = await setupData({
      setup_variables: [
        { factory: "schedule", attributes: { with_event: true } },
      ],
      skip_delivery: true,
    });
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.myFirm.schedules.id.title");
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
              params: { language, id: schedule?.graphql_id },
              searchParams: {},
            })
          ).toEqual({ id: schedule?.graphql_id });
        });
      });

      describe("generateMetadata", () => {
        describe("incorrect id", () => {
          it("generate", async () => {
            const accessToken =
              schedule?.firm?.accounts?.[0]?.user?.access_token;

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language, id: "incorrect" },
                searchParams: {},
              })
            ).toStrictEqual(notFoundMetadata()[language]);
          });
        });

        describe("authorized user", () => {
          it("generate", async () => {
            const accessToken = await getAuthorizedUser({
              tokenOnly: true,
              attributes: {},
            });

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language, id: schedule?.graphql_id },
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
                params: { language, id: schedule?.graphql_id },
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
              await generateMetadata({
                params: { language, id: schedule?.graphql_id },
                searchParams: {},
              })
            ).toStrictEqual(notFoundMetadata()[language]);
          });
        });

        describe("manager", () => {
          it("generate", async () => {
            const accessToken =
              schedule?.firm?.accounts?.[0]?.user?.access_token;

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language, id: schedule?.graphql_id },
                searchParams: {},
              })
            ).toStrictEqual(
              expectedMetadata(schedule?.event?.seo_metadatum)[language]
            );
          });
        });
      });
    })
  );
});
