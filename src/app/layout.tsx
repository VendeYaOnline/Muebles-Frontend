import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "./provider";
import "./globals.css";
import { Footer, NavBar } from "@/components";
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

const fontBold = localFont({
  src: "./fonts/Poppins-Bold.ttf",
  variable: "--font-bold",
});

export const metadata: Metadata = {
  title: "Muebles y Electrodomésticos del Meta",
  description: "Tu destino para muebles y electrodomésticos de alta calidad en el Meta, Colombia.",
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
          className={`${fontLight.variable} ${fontRegular.variable} ${fontSemiBold.variable} ${fontBold.variable} antialiased`}
        >
          <NavBar />
          {children}
          <Footer />
          <Toaster
            position="bottom-right"
            gutter={10}
            toastOptions={{
              duration: 3500,
              style: {
                background: "#fdfcfb",
                color: "#1a1714",
                border: "1px solid #e8e0d8",
                borderRadius: "14px",
                padding: "12px 16px",
                fontSize: "13px",
                boxShadow: "0 8px 32px rgba(26,23,20,0.08)",
                maxWidth: "360px",
              },
              success: {
                iconTheme: { primary: "#b8975a", secondary: "#fdfcfb" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fdfcfb" },
              },
            }}
          />
        </body>
      </Provider>
    </html>
  );
}
