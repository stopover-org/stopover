import { describe, expect, it } from "@jest/globals";
import {
  generateMetadata,
  getVariables,
  PAGE_TITLE,
  revalidate,
} from "app/[language]/auth/sign_in/metadata";
import { Metadata } from "next";
import { expectedMetadata } from "./metadata.expected";

describe("[language]/auth/sign_in]", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.auth.signIn.title");
  });

  it("revalidate", () => {
    expect(revalidate).toBe(0);
  });

  ["en", "ru"].map((language) =>
    describe(`${language} getVariables`, () => {
      // /[language]/auth/sign_in
      it("default props", () => {
        const defaultProps = {
          params: { language, id: "id" },
          searchParams: {},
        };

        expect(getVariables(defaultProps)).toStrictEqual({});
      });

      // /[language]/auth/sign_in?param1=123&param2=123
      it("various searchParams", () => {
        const defaultProps = {
          params: { language, id: "id" },
          searchParams: { param1: "123", param2: "123" },
        };

        expect(getVariables(defaultProps)).toStrictEqual({});
      });
    })
  );

  describe("generateMetadata", () => {
    const expected: Record<string, Metadata> = expectedMetadata();

    Object.keys(expected).map((language) =>
      describe(language, () => {
        // /[language]/auth/sign_in
        it("default props", async () => {
          const defaultProps = {
            params: { language, id: "id" },
            searchParams: {},
          };

          expect(await generateMetadata(defaultProps)).toStrictEqual(
            expected[language]
          );
        });

        // /[language]/auth/sign_in?param1=123&param2=123
        it("various searchParams", async () => {
          const defaultProps = {
            params: { language, id: "id" },
            searchParams: { param1: "123", param2: "123" },
          };

          expect(await generateMetadata(defaultProps)).toStrictEqual(
            expected[language]
          );
        });
      })
    );
  });
});
