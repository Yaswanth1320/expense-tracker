import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main> {children}</main>
        <Toaster />
      </body>
    </html>
  );
}
