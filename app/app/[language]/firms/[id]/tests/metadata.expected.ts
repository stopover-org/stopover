import { Metadata } from "next";

export const expectedMetadata = (
  firm?: Record<string, any>
): Record<string, Metadata> => ({
  en: {
    alternates: {
      languages: {
        "en-US": "/en",
        "ru-RU": "/ru",
      },
    },
    description: firm?.description,
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
    keywords: "",
    openGraph: {
      countryName: "Serbia",
      description: firm?.description,
      emails: ["anneliese_mann@botsford.co", "mikhail@stopoverx.com"],
      images: [
        "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
        "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
      ],
      locale: "en",
      phoneNumbers: ["+381621496696"],
      siteName: "Stopoverx",
      title: firm?.title,
      type: "profile",
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: false,
        noimageindex: false,
      },
      index: true,
      nocache: false,
    },
    title: firm?.title,
    verification: {
      other: {
        me: ["mikhail@stopoverx.com", "+381621496696"],
      },
    },
  },
  ru: {
    alternates: {
      languages: {
        "en-US": "/en",
        "ru-RU": "/ru",
      },
    },
    description: firm?.description,
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
    keywords: "",
    openGraph: {
      countryName: "Serbia",
      description: firm?.description,
      emails: ["anneliese_mann@botsford.co", "mikhail@stopoverx.com"],
      images: [
        "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
        "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
      ],
      locale: "en",
      phoneNumbers: ["+381621496696"],
      siteName: "Stopoverx",
      title: firm?.title,
      type: "profile",
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        nocache: false,
        noimageindex: false,
      },
      index: true,
      nocache: false,
    },
    title: firm?.title,
    verification: {
      other: {
        me: ["mikhail@stopoverx.com", "+381621496696"],
      },
    },
  },
});
