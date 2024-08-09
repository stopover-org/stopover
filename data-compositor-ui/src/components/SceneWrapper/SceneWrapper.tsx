"use client";

import { SessionProvider } from "next-auth/react";
import { memo, ReactNode } from "react";
import Header from "@/components/Header";

const SceneWrapper = ({ children }: { children: ReactNode }) => (
  <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus>
    <Header />
    {children}
  </SessionProvider>
);

export default memo(SceneWrapper);
