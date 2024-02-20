import { Metadata } from "next";

const defaultMetadata: Metadata = {
  title: "Stopover | Event Management",
  verification: {
    other: {
      me: ["mikhail@stopoverx.com"],
    },
  },
  openGraph: {
    title: "Stopover | Event Management",
    siteName: "Stopoverx",
    alt: "Stopoverx Logo",
    image: {
      url: "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx.jpg",
      width: 170,
      height: 153,
      alo: "logo",
    },
    locale: "en_US",
    // @ts-ignore
    type: "website",
  },
  robots: {
    follow: true,
    index: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
};
export const sharedPhones = ["+381621496696"];
export const sharedEmails = ["mikhail@stopoverx.com", "maxim@stopoverx.com"];
export const sharedImages = [
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
];

export default defaultMetadata;
