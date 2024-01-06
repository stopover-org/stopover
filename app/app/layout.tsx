"use client";

import "../styles/globals.css";
import React from "react";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>Stopover. Event Management</title>
    </head>

    <body>
      {children}
      <ProgressBar
        height="4px"
        color="#ff8a00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </body>
  </html>
);

export default React.memo(Layout);
