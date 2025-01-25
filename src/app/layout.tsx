import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "./provider";
import "./globals.css";
import { Footer, MenuProducts, NavBar } from "@/components";
import { Toaster } from "react-hot-toast";

const fontLight = localFont({
  src: "./fonts/Poppins-Light.ttf",
  variable: "--font-light",
});
const fontRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-regular",
});

const fontSemiBold = localFont({
  src: "./fonts/Poppins-SemiBold.ttf",
  variable: "--font-semibold",
});

export const metadata: Metadata = {
  title: "Muebles y Electrodomesticos del Meta",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body
          className={`${fontLight.variable} ${fontRegular.variable} ${fontSemiBold.variable} antialiased`}
        >
          <NavBar />
          <MenuProducts />
          {children}
          <Footer />
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}
