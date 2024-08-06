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

jest.retryTimes(3);

xdescribe("[language]/firms/[id]", () => {
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

        describe("by user type", () => {
          it("authorized user", async () => {
            const [user] = await setupData({
              setup_variables: [{ factory: "user" }],
              skip_delivery: true,
            });

            mockCookies({ accessToken: user.access_token, language });

            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          it("not authorized user", async () => {
            mockCookies({ accessToken: undefined, language });

            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          it("restricted user", async () => {
            const [user] = await setupData({
              setup_variables: [{ factory: "inactive_user" }],
              skip_delivery: true,
            });

            mockCookies({ accessToken: user?.access_token, language });

            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          it("manager", async () => {
            const data = await setupData({
              setup_variables: [{ factory: "firm" }],
              skip_delivery: true,
            });

            mockCookies({
              accessToken: data[0]?.accounts?.[0]?.user?.access_token,
              language,
            });

            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          it("service user", async () => {
            const [user] = await setupData({
              setup_variables: [{ factory: "service_user" }],
              skip_delivery: true,
            });

            mockCookies({ accessToken: user?.access_token, language });

            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });
        });

        describe("by firm status", () => {
          it("active firm", async () => {
            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          it("pending firm", async () => {
            const [pendingFirm] = await setupData({
              setup_variables: [
                { factory: "firm", attributes: { status: "pending" } },
              ],
              skip_delivery: true,
            });

            const defaultProps = {
              params: {
                language,
                id: pendingFirm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);

            expect(metadata).toStrictEqual(notFoundMetadata()[language]);
          });

          it("removed firm", async () => {
            const [removedFirm] = await setupData({
              setup_variables: [
                { factory: "firm", attributes: { status: "removed" } },
              ],
              skip_delivery: true,
            });

            const defaultProps = {
              params: {
                language,
                id: removedFirm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            expect(metadata).toStrictEqual(notFoundMetadata()[language]);
          });
        });

        describe("by firm ID", () => {
          // /[language]/firms/[id]
          it("default props", async () => {
            const defaultProps = {
              params: {
                language,
                id: firm?.graphql_id,
              },
              searchParams: {},
            };
            const metadata = await generateMetadata(defaultProps);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });

          // /[language]/firms/[id]
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

          // /[language]/firms/[id]?param1=123&param2=456
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
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata(firm)[language]);
          });
        });
      });
    })
  );
});
