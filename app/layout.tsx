import type { Metadata, Viewport } from "next";

import { LenisProvider } from "@/components/site/lenis-provider";
import { LoadingExperience } from "@/components/site/loading-experience";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dprintnova.es";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "3DPrintNova | Diseño 3D e impresión bajo demanda en Badajoz",
    template: "%s | 3DPrintNova",
  },
  description:
    "Diseño 3D personalizado, fabricación bajo demanda, tienda de objetos impresos en 3D y envíos en toda la provincia de Badajoz.",
  keywords: [
    "impresión 3D Badajoz",
    "diseño 3D personalizado",
    "fabricación bajo demanda",
    "tienda impresión 3D",
    "STL personalizado",
    "3DPrintNova",
  ],
  applicationName: "3DPrintNova",
  authors: [{ name: "3DPrintNova" }],
  creator: "3DPrintNova",
  publisher: "3DPrintNova",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "3DPrintNova | Convertimos ideas en objetos reales",
    description:
      "Diseño 3D personalizado, fabricación bajo demanda y envíos en toda la provincia de Badajoz.",
    url: siteUrl,
    siteName: "3DPrintNova",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3DPrintNova",
    description:
      "Diseño 3D personalizado, fabricación bajo demanda y tienda de objetos impresos en 3D.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070707",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body>
        <LenisProvider>
          <LoadingExperience />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
