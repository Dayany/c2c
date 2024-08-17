import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car2Car",
  description: "Buy car parts from trustworthy sources",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar session={session} />
          <main className="flex w-full flex-col items-center justify-between p-24 bg-white font-black ">
            <div className="min-h-screen p-6 w-full">{children}</div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
