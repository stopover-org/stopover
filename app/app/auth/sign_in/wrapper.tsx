"use client";

import React from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "lib/relay/environment";

const PageWrapper = ({ children }: any) => {
  const environment = getCurrentEnvironment();

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
};

export default React.memo(PageWrapper);
