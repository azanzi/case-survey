import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "case survey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className={cn(inter.className, "h-screen flex flex-col")}>
        <main className="grow">{children}</main>
        <div className="h-12 flex items-center justify-center">
          Made with ❤️ by FP and AZ.
        </div>
      </body>
    </html>
  );
}
