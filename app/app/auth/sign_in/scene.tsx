"use client";

import React from "react";
import { SerializablePreloadedQuery } from "lib/relay/loadSerializableQuery";
import SignInScene from "scenes/Auth/SignInScene";
import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";
import Layout from "components/MainPage/Layout";
import AuthGuard from "components/shared/AuthGuard";
import useSerializablePreloadedQuery from "lib/relay/useSerializablePreloadedQuery";
import scene_SignIn_QueryNode, {
  scene_SignIn_Query,
} from "artifacts/scene_SignIn_Query.graphql";
import { Toaster } from "sonner";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ReactGA from "react-ga4";
import englishTranslations from "config/locales/en";
import russianTranslations from "config/locales/ru";
import { theme } from "lib/theme";
import QueryProvider from "components/QueryProvider";
import ApiKeysProvider from "components/ApiKeysProvider";

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

const Scene = ({
  preloadedQuery,
}: {
  preloadedQuery: SerializablePreloadedQuery<
    typeof scene_SignIn_QueryNode,
    scene_SignIn_Query
  >;
}) => {
  const environment = getCurrentEnvironment();
  const queryRef: PreloadedQuery<scene_SignIn_Query> =
    useSerializablePreloadedQuery(environment, preloadedQuery);

  const { currentUser } = usePreloadedQuery(
    graphql`
      query scene_SignIn_Query {
        currentUser {
          ...Layout_CurrentUserFragment
          status
        }
      }
    `,
    queryRef
  );

  return (
    <QueryProvider>
      <ApiKeysProvider>
        <Toaster richColors />
        <CssVarsProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <React.Suspense fallback="Loading...">
              <Layout currentUserFragment={currentUser}>
                <AuthGuard
                  accessible={currentUser.status === "temporary"}
                  redirectTo="/"
                >
                  <SignInScene />
                </AuthGuard>
              </Layout>
            </React.Suspense>
          </LocalizationProvider>
        </CssVarsProvider>
      </ApiKeysProvider>
    </QueryProvider>
  );
};

export default React.memo(Scene);
