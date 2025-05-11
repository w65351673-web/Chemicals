import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "DarkChemSite | Premium Research Chemicals",
  description: "Premium quality research chemicals, cannabinoids, stimulants and benzos for your research needs.",
  keywords: ["research chemicals", "cannabinoids", "benzos", "premium quality"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-center" />
            <ConditionalNavbar>
              <Navbar />
            </ConditionalNavbar>
            <main className="flex-grow">{children}</main>
            <ConditionalNavbar>
              <Footer />
            </ConditionalNavbar>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
