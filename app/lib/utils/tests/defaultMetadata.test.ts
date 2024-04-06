import defaultMetadata from "lib/utils/defaultMetadata";

describe("default metadata", () => {
  it("with follow", () => {
    expect(defaultMetadata).toStrictEqual({
      alternates: {
        languages: {
          "en-US": "/en",
          "ru-RU": "/ru",
        },
      },
      formatDetection: {
        address: true,
        date: true,
        email: true,
        telephone: true,
      },
      icons: {
        apple: "/icon.png",
        icon: "/favicon.ico",
        other: {
          rel: "apple-touch-icon-precomposed",
          url: "/icon.png",
        },
        shortcut: "/icon.png",
      },
      metadataBase: new URL("https://stopoverx.com"),
      openGraph: {
        countryName: "Serbia",
        emails: ["mikhail@stopoverx.com"],
        images: [
          "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
          "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
        ],
        locale: "en_US",
        phoneNumbers: ["+381621496696"],
        siteName: "Stopoverx",
        title: "Stopover | Event Management",
        type: "website",
      },
      robots: {
        follow: true,
        googleBot: {
          follow: true,
          index: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
          noimageindex: false,
        },
        index: true,
        nocache: false,
      },
      title: "Stopover | Event Management",
      verification: {
        other: {
          me: ["mikhail@stopoverx.com", "+381621496696"],
        },
      },
    });
  });
});
