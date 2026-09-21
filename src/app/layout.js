import { Inter, Fraunces } from "next/font/google";
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
  weight: ['400', '500', '600'],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif'],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://chemicalssite.com'),
  title: "ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals",
  description: "High-purity anabolic steroids, psychedelic drugs and research chemicals. Dianabol, Winstrol, Anadrol-50, 1P-LSD, DMT, MDMA, Ketamine, Golden Teacher Mushrooms, 4-MMC, 3-MMC, 2C-B, Crystal Meth, A-PVP and more \u2014 every batch assayed and discreetly dispatched.",
  other: {
    'theme-color': '#F7F3EC',
  },
  keywords: [
    "anabolic steroids",
    "psychedelic drugs",
    "research chemicals",
    "buy anabolic steroids online",
    "buy psychedelics online",
    "buy research chemicals online",
    "1-TEST CYP 200",
    "AICAR",
    "Alphabolin",
    "Anadrol-50",
    "Anapolon",
    "Anastrozole",
    "Astralean",
    "Dianabol",
    "Fentanyl",
    "Induject-250",
    "Scopolamine Hydrobromide",
    "Winstrol",
    "1P-LSD",
    "Ayahuasca",
    "DMT",
    "DMT Changa",
    "Golden Teacher Mushroom",
    "Ibogaine",
    "Ketamine",
    "Kratom Powder",
    "Liberty Cap Mushrooms",
    "Liquid LSD",
    "MDMA",
    "Mescaline Powder",
    "Morning Glory Seeds",
    "Penis Envy Mushrooms",
    "Psilocybe Cubensis",
    "Iboga Rootbark",
    "4-MMC",
    "3-MMC",
    "3-CMC",
    "4-CMC",
    "A-PVP",
    "Crystal Meth",
    "a-PiHP",
    "2-FDCK",
    "U-47700",
    "MDPV",
    "2C-B",
    "2C-C",
    "2C-E",
    "2C-H",
    "2C-I",
    "2C-T-2",
    "25B-NBF",
    "25I-NBMD",
    "4-AcO-DMT",
    "3-FMC",
    "3-FPM",
    "5F-SGT-151",
    "laboratory chemicals",
    "high purity compounds",
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
    siteName: 'ChemicalsSite',
    title: 'ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals',
    description: 'Dianabol, Winstrol, Anadrol-50, 1P-LSD, DMT, MDMA, Ketamine, Golden Teacher Mushrooms, 4-MMC, 3-MMC, 2C-B, Crystal Meth, A-PVP and more \u2014 assayed and discreetly dispatched.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals',
    description: 'Dianabol, Winstrol, Anadrol-50, 1P-LSD, DMT, MDMA, Ketamine, Golden Teacher Mushrooms, 4-MMC, 3-MMC, 2C-B, Crystal Meth, A-PVP and more \u2014 assayed and discreetly dispatched.',
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
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="dns-prefetch" href="https://analytics.ahrefs.com" />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-bone text-ink antialiased">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-ink focus:text-bone focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        
        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: '#14110F',
                  color: '#F7F3EC',
                  borderRadius: '2px',
                  fontSize: '14px',
                  letterSpacing: '0.01em',
                },
              }}
            />
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
      </body>
    </html>
  );
}
