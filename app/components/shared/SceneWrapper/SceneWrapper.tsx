"use client";

import { Toaster } from "sonner";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import QueryProvider from "components/QueryProvider";
import { theme } from "lib/theme";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ReactGA from "react-ga4";
import englishTranslations from "config/locales/en";
import russianTranslations from "config/locales/ru";

ReactGA.initialize("G-VC1XS420Q4");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: englishTranslations,
      },
      ru: {
        translation: russianTranslations,
      },
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const SceneWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryProvider>
    <Toaster richColors />
    <CssVarsProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </CssVarsProvider>
  </QueryProvider>
);

export default React.memo(SceneWrapper);
