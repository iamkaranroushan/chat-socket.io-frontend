import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real time Messaging app",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#202020]">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}