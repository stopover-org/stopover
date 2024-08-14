"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { memo, ReactNode } from "react";
import Header from "@/components/Header";
import getEnvironment from "@/utils/network";
import { RelayEnvironmentProvider } from "react-relay";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const SceneWrapper = ({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: ReadonlyRequestCookies;
}) => (
  <RelayEnvironmentProvider environment={getEnvironment(cookies)}>
    <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
      <Header />
      {children}
    </SessionProvider>
  </RelayEnvironmentProvider>
);

export default memo(SceneWrapper);
