import { afterAll, beforeAll, describe, expect } from "@jest/globals";
import moment from "moment";
import { setupData, teardownData } from "lib/testing/setupData";
import { PAGE_TITLE, getVariables, revalidate } from "../metadata";

describe("[language]/events", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.events.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["en", "ru"].map((language) =>
    describe(`${language} getVariables`, () => {
      // /[language]/events
      it("default props", () => {
        expect(
          getVariables({ params: { language }, searchParams: {} })
        ).toEqual({ filters: {} });
      });

      describe("search params", () => {
        // /[language]/events?query="query"
        it("query", () => {
          const searchParams = {
            query: JSON.stringify("query"),
          };

          expect(getVariables({ params: { language }, searchParams })).toEqual({
            filters: {
              query: "query",
            },
          });

          expect(
            getVariables({
              params: { language, humanReadable: true },
              searchParams,
            })
          ).toEqual({
            filters: {
              query: "query",
            },
          });
        });

        // /[language]/events?interests=%5B"active-holiday"%5D
        it("interests", () => {
          const searchParams = {
            interests: JSON.stringify(["active-holiday"]),
          };

          expect(getVariables({ params: { language }, searchParams })).toEqual({
            filters: {
              interests: ["active-holiday"],
            },
          });

          expect(
            getVariables({
              params: { language, humanReadable: true },
              searchParams,
            })
          ).toEqual({
            filters: {
              interests: ["active-holiday"],
            },
          });
        });

        // /[language]/events?minPrice=345
        it("minPrice", () => {
          const searchParams = {
            minPrice: JSON.stringify(345),
          };

          expect(getVariables({ params: { language }, searchParams })).toEqual({
            filters: {
              minPrice: 345,
            },
          });

          expect(
            getVariables({
              params: { language, humanReadable: true },
              searchParams,
            })
          ).toEqual({
            filters: {
              minPrice: 345,
            },
          });
        });

        // /[language]/events?maxPrice=345
        it("maxPrice", () => {
          const searchParams = {
            maxPrice: JSON.stringify(345),
          };

          expect(getVariables({ params: { language }, searchParams })).toEqual({
            filters: {
              maxPrice: 345,
            },
          });

          expect(
            getVariables({
              params: { language, humanReadable: true },
              searchParams,
            })
          ).toEqual({
            filters: {
              maxPrice: 345,
            },
          });
        });

        // /[language]/events?city="Beograd"
        it("city", () => {
          const searchParams = {
            city: JSON.stringify("Beograd"),
          };

          expect(getVariables({ params: { language }, searchParams })).toEqual({
            filters: {
              city: "Beograd",
            },
          });

          expect(
            getVariables({
              params: { language, humanReadable: true },
              searchParams,
            })
          ).toEqual({
            filters: {
              city: "Beograd",
            },
          });
        });

        describe("dates", () => {
          // /[language]/events?dates=%5B"2024-05-21"%2C"2024-05-22"%5D
          it("minDate and max Date", () => {
            const searchParams = {
              dates: JSON.stringify(["2024-05-21", "2024-05-22"]),
            };

            expect(
              getVariables({ params: { language }, searchParams })
            ).toEqual({
              filters: {
                startDate: moment("2024-05-21").toISOString(),
                endDate: moment("2024-05-22").toISOString(),
              },
            });

            expect(
              getVariables({
                params: { language, humanReadable: true },
                searchParams,
              })
            ).toEqual({
              filters: {
                startDate: moment("2024-05-21").calendar(),
                endDate: moment("2024-05-22").calendar(),
              },
            });
          });

          // /[language]/events?dates=%5B"2024-05-22"%2C"2024-05-21"%5D
          it("minDate and max Date order independently", () => {
            const searchParams = {
              dates: JSON.stringify(["2024-05-22", "2024-05-21"]),
            };

            expect(
              getVariables({ params: { language }, searchParams })
            ).toEqual({
              filters: {
                startDate: moment("2024-05-21").toISOString(),
                endDate: moment("2024-05-22").toISOString(),
              },
            });

            expect(
              getVariables({
                params: { language, humanReadable: true },
                searchParams,
              })
            ).toEqual({
              filters: {
                startDate: moment("2024-05-21").calendar(),
                endDate: moment("2024-05-22").calendar(),
              },
            });
          });

          // /[language]/events?dates=%5B"invalid"%2C"invalid"%5D
          it("invalid dates", () => {
            const searchParams = {
              dates: JSON.stringify(["invalid-date", "invalid-date2"]),
            };

            expect(
              getVariables({ params: { language }, searchParams })
            ).toEqual({
              filters: {},
            });

            expect(
              getVariables({
                params: { language, humanReadable: true },
                searchParams,
              })
            ).toEqual({
              filters: {},
            });
          });

          // /[language]/events?dates=%5B"2024-05-22"%5D
          it("incomplete dates", () => {
            const searchParams = {
              dates: JSON.stringify(["2024-05-21"]),
            };

            expect(
              getVariables({ params: { language }, searchParams })
            ).toEqual({
              filters: {},
            });

            expect(
              getVariables({
                params: { language, humanReadable: true },
                searchParams,
              })
            ).toEqual({
              filters: {},
            });
          });
        });
      });

      // /[language]/events?invalidParam"invalid"
      it("invalid params", () => {
        expect(
          getVariables({
            params: { language },
            searchParams: { invalidParam: JSON.stringify("invalid") },
          })
        ).toEqual({
          filters: {},
        });
      });
    })
  );

  describe("generateMetadata", () => {
    const expected = { en: {}, ru: {} };
    beforeAll(async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await setupData({
        setup_variables: [
          { factory: "recurring_event" },
          { factory: "recurring_event" },
          { factory: "active_user" },
        ],
        skip_delivery: true,
      });
      const user = data[data.length - 1];

      console.log(user);
    });

    afterAll(async () => {
      await teardownData();
    });

    ["authorized", "not_authorized"].map((userType) =>
      describe(`${userType} user`, () => {
        Object.keys(expected).map((language) =>
          describe(`${language} generateMetadata`, () => {
            // /[language]/events
            it("default props", () => {});

            // /[language]/events
            it("without events", () => {});

            describe("search params", () => {
              // /[language]/events?query="query"
              it("query", () => {});

              // /[language]/events?interests=%5B"active-holiday"%5D
              it("interests", () => {});

              // /[language]/events?minPrice=345
              it("minPrice", () => {});

              // /[language]/events?maxPrice=345
              it("maxPrice", () => {});

              // /[language]/events?city="Beograd"
              it("city", () => {});

              it("interests", () => {});

              describe("dates", () => {
                // /[language]/events?dates=%5B"2024-05-21"%2C"2024-05-22"%5D
                it("minDate and max Date", () => {});

                // /[language]/events?dates=%5B"2024-05-22"%2C"2024-05-21"%5D
                it("minDate and max Date order independently", () => {});

                // /[language]/events?dates=%5B"invalid"%2C"invalid"%5D
                it("invalid dates", () => {});

                // /[language]/events?dates=%5B"2024-05-22"%5D
                it("incomplete dates", () => {});
              });

              // /[language]/events?invalidParam"invalid"
              it("invalid params", () => {});
            });
          })
        );
      })
    );
  });
});
