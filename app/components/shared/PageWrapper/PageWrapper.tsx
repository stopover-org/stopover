"use client";

import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const environment = getCurrentEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

export default React.memo(PageWrapper);
