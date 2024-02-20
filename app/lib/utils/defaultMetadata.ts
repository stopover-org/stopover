import { Metadata } from "next";
import i18n from "i18next";
import englishTranslations from "config/locales/en";
import russianTranslations from "config/locales/ru";
import { cookies } from "next/headers";

export const sharedPhones = ["+381621496696"];
export const sharedEmails = ["mikhail@stopoverx.com", "maxim@stopoverx.com"];
export const sharedImages = [
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
];

const defaultMetadata: Metadata = {
  title: "Stopover | Event Management",
  verification: {
    other: {
      me: [...sharedEmails, ...sharedPhones],
    },
  },
  openGraph: {
    title: "Stopover | Event Management",
    siteName: "Stopoverx",
    images: sharedImages,
    emails: sharedEmails,
    phoneNumbers: sharedPhones,
    locale: "en_US",
    // @ts-ignore
    type: "website",
    countryName: "Serbia",
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

export const translate = async (key: string) => {
  const language = (await cookies().get("i18next")?.value) || "en";
  const translator = await i18n.init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      ru: {
        translation: russianTranslations,
      },
    },
    lng: language,
    fallbackLng: "en",

    interpolation: {
      escapeValue: true,
    },
  });

  return translator(key);
};

export default defaultMetadata;
