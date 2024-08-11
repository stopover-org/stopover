"use client";

import { SessionProvider } from "next-auth/react";
import { memo, ReactNode } from "react";
import Header from "@/components/Header";
import environment from "@/utils/network";
import { RelayEnvironmentProvider } from "react-relay";

const SceneWrapper = ({ children }: { children: ReactNode }) => (
  <RelayEnvironmentProvider environment={environment}>
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      <Header />
      {children}
    </SessionProvider>
  </RelayEnvironmentProvider>
);

export default memo(SceneWrapper);
