import type { Metadata } from "next";

import { ShopPage } from "@/components/site/shop-page";
import { contact } from "@/lib/data";
import { shopProducts } from "@/lib/shop-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dprintnova.es";

export const metadata: Metadata = {
  title: "Tienda 3D | Catálogo y Modelos Bambu Lab",
  description:
    "Comprar figuras, accesorios gaming y piezas funcionales impresas en 3D. Añade enlaces externos de MakerWorld o Thingiverse y estima su precio.",
  alternates: {
    canonical: "/tienda/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "3DPrintNova Tienda",
  url: `${siteUrl}/tienda/`,
  telephone: contact.whatsapp,
  email: contact.email,
  priceRange: "€",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Provincia de Badajoz",
  },
  makesOffer: shopProducts.slice(0, 10).map((product) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: product.name,
      description: product.description,
      category: product.category,
    },
    price: product.price,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ShopPage />
    </>
  );
}
