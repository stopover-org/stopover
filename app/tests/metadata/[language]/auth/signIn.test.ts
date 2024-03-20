import { describe, expect, it } from "@jest/globals";
import { PAGE_TITLE } from "app/[language]/auth/sign_in/metadata";

describe("[language]/auth/sign_in]", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toBe("seo.auth.signIn.title");
  });
});
