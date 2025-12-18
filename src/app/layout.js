import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import VisitorTracker from "@/components/tracking/VisitorTracker";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '600', '700'], // Reduced font weights for better performance
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://darkchemsite.com'),
  title: "DarkChemSite | Premium Research Chemicals",
  description: "Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca, ab-pinaca, 5F-EDMB-PINACA, ADB-FUBINACA, 4FADB, AMB-FUBINACA, MDMB-4en-PINACA, Etizolam, Flualprazolam, Clonazolam, Flubromazolam, Diclazepam, Bromazolam, Pyrazolam, Phenazepam, AB-FUBINACA, MDMB-CHMINACA, MDMB-FUBINACA, Isotonitazene, Protonitazene, Metonitazene, Alprazolam, 5fmdmb-2201. Top-grade cannabinoids, stimulants and benzos for your research needs.",
  keywords: [
    "research chemicals",
    "5cl-adba",
    "5cladba", 
    "5fadb",
    "jwh-018",
    "adb-butinaca",
    "ab-pinaca",
    "5F-EDMB-PINACA",
    "ADB-FUBINACA",
    "4FADB",
    "AMB-FUBINACA",
    "MDMB-4en-PINACA",
    "Etizolam",
    "Flualprazolam",
    "Clonazolam",
    "Flubromazolam",
    "Diclazepam",
    "Bromazolam",
    "Pyrazolam",
    "Phenazepam",
    "AB-FUBINACA",
    "MDMB-CHMINACA",
    "MDMB-FUBINACA",
    "Isotonitazene",
    "Protonitazene",
    "Metonitazene",
    "Alprazolam",
    "5fmdmb-2201",
    "4fadb",
    "cannabinoids",
    "synthetic cannabinoids",
    "benzos",
    "benzodiazepines",
    "nitazenes",
    "premium quality research chemicals",
    "buy research chemicals online",
    "laboratory chemicals"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'DarkChemSite',
    title: 'DarkChemSite | Premium Research Chemicals',
    description: 'Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DarkChemSite | Premium Research Chemicals',
    description: 'Premium quality research chemicals including 5cl-adba, 5cladba, 5fadb, jwh-018, adb-butinaca and more.',
  },
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans min-h-screen flex flex-col">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-purple-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        
        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
            <Toaster position="top-center" />
            <WhatsAppButton />
            <ConditionalNavbar>
              <Navbar />
            </ConditionalNavbar>
            <main id="main-content" className="flex-grow">{children}</main>
            <ConditionalNavbar>
              <Footer />
            </ConditionalNavbar>
          </CartProvider>
        </AuthProvider>

        {/* Ahrefs Analytics - Lazy load for better performance */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+CffPsHUUwlzmNtibduF4Q"
          strategy="lazyOnload"
        />

        {/* Tawk.to Chat Widget - Lazy load for better performance */}
        <Script
          id="tawk-to"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/6937ef887055cf197f3f3df7/1jc17vc06';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
