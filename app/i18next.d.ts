// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import ru from "config/locales/ru";
import en from "config/locales/en";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom resources type
    resources: {
      en: typeof ru;
      ru: typeof en;
    };
    // other
  }
}
