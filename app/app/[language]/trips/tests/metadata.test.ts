import { redirectMetadata } from "lib/testing/expectedMetadata";
import {
  getAuthorizedUser,
  getNotAuthorizedUser,
  getRestrictedUser,
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
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.trips.title");
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
              params: { language },
              searchParams: {},
            })
          ).toEqual({});
        });
      });

      describe("generateMetadata", () => {
        describe("authorized user", () => {
          it("generate", async () => {
            const accessToken = await getAuthorizedUser({
              tokenOnly: true,
              attributes: {},
            });

            mockCookies({ accessToken, language });

            expect(
              await generateMetadata({
                params: { language },
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
                params: { language },
                searchParams: {},
              })
            ).toStrictEqual(expectedMetadata()[language]);
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
              await generateMetadata({ params: { language }, searchParams: {} })
            ).toStrictEqual(
              redirectMetadata(`${language}/auth/sign_in`)[language]
            );
          });
        });
      });
    })
  );
});
