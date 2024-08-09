import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { memo, ReactNode } from "react";
import SceneWrapper from "@/components/SceneWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NoAccess from "@/components/NoAccess";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Compositor | Stopoverx",
  description: "",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const session: Record<string, any> | null = await getServerSession(
    authOptions as any,
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <SceneWrapper>{session?.user ? children : <NoAccess />}</SceneWrapper>
      </body>
    </html>
  );
};

export default memo(RootLayout);
