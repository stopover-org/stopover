import { setupData, teardownData } from "lib/testing/setupData";
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

describe("[language]/firms/landing", () => {
  afterEach(async () => {
    await teardownData();
  });

  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.firms.landing.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe(language, () => {
      describe("getVariables", () => {
        // /[language]/firms/landing
        it("default props", () => {
          const defaultProps = {
            params: { language },
            searchParams: {},
          };

          expect(getVariables(defaultProps)).toStrictEqual({});
        });

        // /[language]/firms/landing?param1=123&param2=456
        it("various searchParams", () => {
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
        it("authorized user", async () => {
          const [currentUser] = await setupData({
            setup_variables: [{ factory: "active_user" }],
            skip_delivery: true,
          });

          mockCookies({
            accessToken: currentUser?.access_token,
            language,
          });

          const props = {
            params: { language },
            searchParams: {},
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });

        it("not authorized user", async () => {
          mockCookies({
            accessToken: undefined,
            language,
          });

          const props = {
            params: { language },
            searchParams: {},
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });

        it("restricted user", async () => {
          const [currentUser] = await setupData({
            setup_variables: [{ factory: "disabled_user" }],
            skip_delivery: true,
          });

          mockCookies({
            accessToken: currentUser?.access_token,
            language,
          });

          const props = {
            params: { language },
            searchParams: {},
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });

        it("manager user", async () => {
          const [firm] = await setupData({
            setup_variables: [{ factory: "firm" }],
            skip_delivery: true,
          });

          mockCookies({
            accessToken: firm?.accounts?.[0]?.user?.access_token,
            language,
          });

          const props = {
            params: { language },
            searchParams: {},
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });

        it("service user", async () => {
          const [currentUser] = await setupData({
            setup_variables: [{ factory: "service_user" }],
            skip_delivery: true,
          });

          mockCookies({
            accessToken: currentUser?.access_token,
            language,
          });

          const props = {
            params: { language },
            searchParams: {},
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });

        // /[language]/firms/landing?param1=123&param2=456
        it("with custom search params", async () => {
          const props = {
            params: { language },
            searchParams: {
              param1: "123",
              param2: "456",
            },
          };

          expect(await generateMetadata(props)).toStrictEqual(
            expectedMetadata()[language]
          );
        });
      });
    })
  );
});
