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
  description: "High-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory use. Testosterone enanthate, trenbolone acetate, nandrolone decanoate, oxandrolone, 1P-LSD, 4-ACO-DMT, mescaline HCl, 2C-B, 3-MMC, 3-CMC, 2-FDCK and more \u2014 every batch assayed and documented.",
  other: {
    'theme-color': '#F7F3EC',
  },
  keywords: [
    "anabolic steroids",
    "psychedelic drugs",
    "research chemicals",
    "testosterone enanthate",
    "testosterone cypionate",
    "trenbolone acetate",
    "nandrolone decanoate",
    "boldenone undecylenate",
    "oxandrolone",
    "stanozolol",
    "methandienone",
    "drostanolone propionate",
    "sustanon 250",
    "1P-LSD",
    "4-ACO-DMT",
    "DMT",
    "5-MeO-DMT",
    "mescaline HCl",
    "psilocybin analogues",
    "2C-B",
    "LSZ",
    "3-MMC",
    "3-CMC",
    "4-MMC",
    "2-FDCK",
    "MDPHP",
    "alpha-PiHP",
    "buy anabolic steroids online",
    "buy psychedelics online",
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
    siteName: 'ChemicalsSite',
    title: 'ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals',
    description: 'High-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory use \u2014 assayed, documented and discreetly dispatched.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChemicalsSite | Anabolic Steroids, Psychedelics & Research Chemicals',
    description: 'High-purity anabolic steroids, psychedelic drugs and research chemicals for laboratory use \u2014 assayed, documented and discreetly dispatched.',
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
