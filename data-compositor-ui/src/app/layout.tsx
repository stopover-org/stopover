import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { memo } from "react";
import Header from "@/components/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Data Compositor | Stopoverx",
  description: "",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session: Record<string, any> | null = await getServerSession(
    authOptions as any,
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        {children}
      </body>
    </html>
  );
};

export default memo(RootLayout);
