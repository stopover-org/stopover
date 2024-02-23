"use client";

import { Toaster } from "sonner";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { CssVarsProvider } from "@mui/joy";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { theme } from "lib/theme";
import { changeLanguage } from "i18next";
import { useCookies } from "react-cookie";

const SceneWrapper = ({ children }: { children: React.ReactNode }) => {
  const [value] = useCookies();
  React.useEffect(() => {
    changeLanguage(value.i18next || "en");
  }, []);
  return (
    <>
      <Toaster richColors />
      <CssVarsProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {children}
        </LocalizationProvider>
      </CssVarsProvider>
    </>
  );
};

export default React.memo(SceneWrapper);
