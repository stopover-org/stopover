import { describeMyFirmResources } from "lib/testing/expectedMetadata";
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

describe("[language]/my-firm/payments", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.myFirm.payments.title");
  });

  it("revalidate", () => {
    expect(revalidate).toEqual(0);
  });

  ["en", "ru"].map((language) =>
    describeMyFirmResources(
      language,
      getVariables,
      generateMetadata,
      expectedMetadata,
      {}
    )
  );
});
