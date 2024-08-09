import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { memo, ReactNode } from "react";
import SceneWrapper from "@/components/SceneWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Compositor | Stopoverx",
  description: "",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => (
  <html lang="en">
    <body className={inter.className}>
      <SceneWrapper>{children}</SceneWrapper>
    </body>
  </html>
);

export default memo(RootLayout);
