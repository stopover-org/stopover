import { setupData, teardownData } from "lib/testing/setupData";
import { beforeEach } from "@jest/globals";
import { mockCookies } from "lib/testing/mockCookies";
import { redirectMetadata } from "lib/testing/expectedMetadata";
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

xdescribe("[language]/firms/new", () => {
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
        beforeEach(() => {
          mockCookies({ accessToken, language });
        });

        describe("by user type", () => {
          // /[language]/firms/new
          describe("not authorized user", () => {
            it("default props", async () => {
              const props = {
                params: { language },
                searchParams: {},
              };
              const metadata = await generateMetadata(props);
              metadata.description = "";

              metadata.openGraph!.description = "";

              expect(metadata).toStrictEqual(expectedMetadata()[language]);
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
              const metadata = await generateMetadata(props);
              metadata.description = "";

              metadata.openGraph!.description = "";

              expect(metadata).toStrictEqual(expectedMetadata()[language]);
            });
          });

          describe("restricted user", () => {
            beforeEach(async () => {
              const [restrictedUser] = await setupData({
                setup_variables: [
                  {
                    factory: "inactive_user",
                  },
                ],
                skip_delivery: true,
              });

              mockCookies({
                accessToken: restrictedUser?.access_token,
                language,
              });
            });

            it("default props", async () => {
              const props = {
                params: { language },
                searchParams: {},
              };
              const metadata = await generateMetadata(props);
              metadata.description = "";

              metadata.openGraph!.description = "";

              expect(metadata).toStrictEqual(expectedMetadata()[language]);
            });
          });

          describe("manager user", () => {
            beforeEach(async () => {
              const [activeFirm] = await setupData({
                setup_variables: [
                  {
                    factory: "firm",
                  },
                ],
                skip_delivery: true,
              });

              mockCookies({
                accessToken: activeFirm?.accounts?.[0]?.user?.access_token,
                language,
              });
            });

            it("default props", async () => {
              const props = {
                params: { language },
                searchParams: {},
              };

              expect(await generateMetadata(props)).toStrictEqual(
                redirectMetadata(`${language}/my-firm/dashboard`)[language]
              );
            });
          });

          describe("service user", () => {
            beforeEach(async () => {
              const [serviceUser] = await setupData({
                setup_variables: [
                  {
                    factory: "service_user",
                  },
                ],
                skip_delivery: true,
              });

              mockCookies({
                accessToken: serviceUser?.access_token,
                language,
              });
            });

            it("default props", async () => {
              const props = {
                params: { language },
                searchParams: {},
              };
              const metadata = await generateMetadata(props);
              metadata.description = "";

              metadata.openGraph!.description = "";

              expect(metadata).toStrictEqual(expectedMetadata()[language]);
            });
          });
        });

        describe("by firm status", () => {
          it("active firm", async () => {
            const [activeFirm] = await setupData({
              setup_variables: [
                {
                  factory: "firm",
                  attributes: {
                    status: "active",
                  },
                },
              ],
              skip_delivery: true,
            });

            mockCookies({
              accessToken: activeFirm?.accounts?.[0]?.user?.access_token,
              language,
            });

            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              redirectMetadata(`${language}/my-firm/dashboard`)[language]
            );
          });

          it("pending firm", async () => {
            const [pendingFirm] = await setupData({
              setup_variables: [
                {
                  factory: "firm",
                  attributes: {
                    status: "pending",
                  },
                },
              ],
              skip_delivery: true,
            });

            mockCookies({
              accessToken: pendingFirm?.accounts?.[0]?.user?.access_token,
              language,
            });

            const props = {
              params: { language },
              searchParams: {},
            };

            expect(await generateMetadata(props)).toStrictEqual(
              redirectMetadata(`${language}/my-firm/dashboard`)[language]
            );
          });

          it("removed firm", async () => {
            const [removedFirm] = await setupData({
              setup_variables: [
                {
                  factory: "firm",
                  attributes: {
                    status: "removed",
                  },
                },
              ],
              skip_delivery: true,
            });

            mockCookies({
              accessToken: removedFirm?.accounts?.[0]?.user?.access_token,
              language,
            });

            const props = {
              params: { language },
              searchParams: {},
            };
            const metadata = await generateMetadata(props);
            metadata.description = "";

            metadata.openGraph!.description = "";

            expect(metadata).toStrictEqual(expectedMetadata()[language]);
          });
        });
      });
    })
  );
});
