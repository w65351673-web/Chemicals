import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import VisitorTracker from "@/components/tracking/VisitorTracker";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: "--font-inter",
  display: 'swap',
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
        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
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

        {/* LiveChat Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__lc = window.__lc || {};
              window.__lc.license = 19399140;
              window.__lc.integration_name = "manual_onboarding";
              window.__lc.product_name = "livechat";
              ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
            `,
          }}
        />
        <noscript>
          <a href="https://www.livechat.com/chat-with/19399140/" rel="nofollow">
            Chat with us
          </a>
          , powered by{' '}
          <a
            href="https://www.livechat.com/?welcome"
            rel="noopener nofollow"
            target="_blank"
          >
            LiveChat
          </a>
        </noscript>
      </body>
    </html>
  );
}
