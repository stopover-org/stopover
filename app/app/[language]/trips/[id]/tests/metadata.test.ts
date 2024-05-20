import { redirectMetadata } from "lib/testing/expectedMetadata";
import {
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

describe("[language]/trips", () => {
  let trip: Record<string, any> | undefined;
  beforeAll(async () => {
    [trip] = await setupData({
      setup_variables: [{ factory: "trip" }],
      skip_delivery: true,
    });
  });

  afterAll(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.trips.id.title");
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
              params: { language, id: trip?.graphql_id },
              searchParams: {},
            })
          ).toEqual({ id: trip?.graphql_id });
        });
      });

      describe("generateMetadata", () => {
        describe("authorized user", () => {
          it("generate", async () => {
            const accessToken = trip?.user?.access_token;

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language, id: trip?.graphql_id },
                searchParams: {},
              })
            ).toStrictEqual(expectedMetadata()[language]);
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
                params: { language, id: trip?.graphql_id },
                searchParams: {},
              })
            ).toStrictEqual(redirectMetadata(`${language}/trips`)[language]);
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
                params: { language, id: trip?.graphql_id },
                searchParams: {},
              })
            ).toStrictEqual(redirectMetadata(`${language}/trips`)[language]);
          });
        });
      });
    })
  );
});
