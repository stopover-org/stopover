import { notFoundMetadata } from "lib/testing/expectedMetadata";
import { mockCookies } from "lib/testing/mockCookies";
import { setupData, teardownData } from "lib/testing/setupData";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "../metadata";
import { eventFoundMetadata } from "./metadata.expected";

jest.mock("next/headers", () => {
  const originalModule = jest.requireActual("next/headers");
  return {
    ...originalModule,
    cookies: jest.fn(),
  };
});

jest.retryTimes(3);

describe("[language]/events/[id]", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.events.id.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(1800);
  });

  describe("getVariables", () => {
    ["en", "ru"].map((language) =>
      describe(language, () => {
        it("default props", () => {
          expect(
            getVariables({ params: { id: "test-id" }, searchParams: {} })
          ).toEqual({
            id: "test-id",
          });
        });

        it("with search params", () => {
          expect(
            getVariables({
              params: { id: "test-id" },
              searchParams: {
                search: "test-search",
              },
            })
          ).toEqual({ id: "test-id" });
        });
      })
    );
  });

  describe("generateMetadata", () => {
    ["en", "ru"].map((language) =>
      describe(language, () => {
        beforeEach(() => {
          mockCookies({ accessToken: undefined, language });
        });

        describe("not found", () => {
          it("execute", async () => {
            const expected = notFoundMetadata();
            const metadata = await generateMetadata({
              params: { language, id: "incorrect-event-id" },
              searchParams: {},
            });

            expect(metadata).toEqual(expected[language]);
          });
        });

        describe("published", () => {
          let event: Record<string, any>;
          beforeAll(async () => {
            [event] = await setupData({
              setup_variables: [
                {
                  factory: "published_event",
                  attributes: {
                    title: "Event title",
                    description: "Event description",
                  },
                },
              ],
              skip_delivery: true,
            });
          });

          afterAll(async () => {
            await teardownData();
          });

          it("execute", async () => {
            const expected = eventFoundMetadata(event);
            const metadata = await generateMetadata({
              params: { language, id: event.graphql_id },
              searchParams: {},
            });

            delete metadata?.keywords;

            // @ts-ignore
            delete metadata?.openGraph?.keywords;

            delete metadata?.openGraph?.emails;

            delete expected[language]?.openGraph?.emails;

            expect(metadata).toEqual(expected[language]);
          });
        });

        describe("draft", () => {
          let event: Record<string, any>;
          beforeAll(async () => {
            [event] = await setupData({
              setup_variables: [
                {
                  factory: "event",
                  attributes: {
                    title: "Event title",
                    description: "Event description",
                  },
                },
              ],
              skip_delivery: true,
            });
          });

          afterAll(async () => {
            await teardownData();
          });

          it("execute", async () => {
            const expected = notFoundMetadata();
            const metadata = await generateMetadata({
              params: { language, id: event.graphql_id },
              searchParams: {},
            });

            expect(metadata).toEqual(expected[language]);
          });
        });

        describe("unpublished", () => {
          let event: Record<string, any>;
          beforeAll(async () => {
            [event] = await setupData({
              setup_variables: [
                {
                  factory: "event",
                  attributes: {
                    title: "Event title",
                    description: "Event description",
                    status: "unpublished",
                  },
                },
              ],
              skip_delivery: true,
            });
          });

          afterAll(async () => {
            await teardownData();
          });

          it("execute", async () => {
            const expected = notFoundMetadata();
            const metadata = await generateMetadata({
              params: { language, id: event.graphql_id },
              searchParams: {},
            });

            expect(metadata).toEqual(expected[language]);
          });
        });

        describe("removed", () => {
          let event: Record<string, any>;
          beforeAll(async () => {
            [event] = await setupData({
              setup_variables: [
                {
                  factory: "event",
                  attributes: {
                    title: "Event title",
                    description: "Event description",
                    status: "removed",
                  },
                },
              ],
              skip_delivery: true,
            });
          });

          afterAll(async () => {
            await teardownData();
          });

          it("execute", async () => {
            const expected = notFoundMetadata();
            const metadata = await generateMetadata({
              params: { language, id: event.graphql_id },
              searchParams: {},
            });

            expect(metadata).toEqual(expected[language]);
          });
        });
      })
    );
  });
});
