import { Metadata } from "next";
import { createInstance } from "i18next";
import englishTranslations from "config/locales/en";
import russianTranslations from "config/locales/ru";
import { cookies } from "next/headers";

export const sharedPhones = ["+381621496696"];
export const sharedEmails = ["mikhail@stopoverx.com"];
export const sharedImages = [
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/stopoverx+(1).png",
  "https://s3.eu-north-1.amazonaws.com/stopoverx.production/orange_onion.png",
];
export const verification: Metadata["verification"] = {
  other: {
    me: [...sharedEmails, ...sharedPhones],
  },
};
const icons: Metadata["icons"] = {
  icon: "/favicon.ico",
  shortcut: "/icon.png",
  apple: "/icon.png",
  other: {
    rel: "apple-touch-icon-precomposed",
    url: "/icon.png",
  },
};

export const formatDetection: Metadata["formatDetection"] = {
  telephone: true,
  email: true,
  date: true,
  address: true,
};

export const openGraph: Metadata["openGraph"] = {
  title: "Stopover | Event Management",
  siteName: "Stopoverx",
  images: sharedImages,
  emails: sharedEmails,
  phoneNumbers: sharedPhones,
  locale: "en_US",
  // @ts-ignore
  type: "website",
  countryName: "Serbia",
};

export const robots: Metadata["robots"] = {
  follow: true,
  index: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    nocache: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export const alternates: Metadata["alternates"] = {
  languages: {
    "en-US": "/en",
    "ru-RU": "/ru",
  },
};

const defaultMetadata: Metadata = {
  alternates,
  formatDetection,
  icons,
  metadataBase: new URL("https://stopoverx.com"),
  openGraph,
  robots,
  title: "Stopover | Event Management",
  verification,
};
/**
 * Translates the given set of keywords into the specified language using the provided translation data.
 *
 * @param {object} translations - An object containing keyword translations in multiple languages.
 * @param {object} variables - An object containing variables to be replaced in the translated keywords.
 * @param {string} language - The language code for the desired translation.
 * @returns {Promise<string>} - A Promise that resolves with the translated keywords.
 *
 * @throws {Error} If translations is not an object, variables is not an object, or language is not a string.
 *
 * @example
 *
 * const translations = {
 *   keywords: {
 *     hello: 'Bonjour',
 *     world: 'monde',
 *     code: 'code'
 *   }
 * };
 *
 * const variables = {
 *   name: 'John'
 * };
 *
 * const language = 'fr';
 *
 * const keywords = await translate(translations.keywords, variables, language);
 * console.log(keywords); // Output: "Bonjour, monde!"
 */
export const translate = async (key: string, opts?: any, lang?: string) => {
  const language =
    lang || (await cookies().get("i18next" as any)?.value) || "en";
  const translator = createInstance();

  await translator.init({
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
  } as any);

  return translator.t(key as any, opts);
};

export default defaultMetadata;
