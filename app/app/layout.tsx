import "../styles/globals.css";
import React from "react";
import "rc-slider/assets/index.css";
import "react-phone-input-2/lib/style.css";
import "@fontsource/public-sans";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <title>Stopover. Event Management</title>
    </head>
    <body>{children}</body>
  </html>
);

export default React.memo(Layout);
