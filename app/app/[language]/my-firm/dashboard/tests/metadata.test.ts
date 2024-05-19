import { describeMyFirmResources } from "lib/testing/expectedMetadata";
import moment from "moment";
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

describe("[language]/my-firm/dashboard", () => {
  it("PAGE_TITLE", () => {
    expect(PAGE_TITLE).toEqual("seo.myFirm.dashboard.title");
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
      {
        bookingsFilter: {
          bookedFor: moment().startOf("minute").toDate(),
        },
        schedulesFilter: {
          scheduledFor: moment().startOf("minute").toDate(),
        },
      }
    )
  );
});
