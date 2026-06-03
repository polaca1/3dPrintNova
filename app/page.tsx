import { HomePage } from "@/components/site/home-page";
import { contact, products } from "@/lib/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://3dprintnova.es";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "3DPrintNova",
  url: siteUrl,
  telephone: contact.whatsapp,
  email: contact.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Provincia de Badajoz",
  },
  sameAs: ["https://www.tiktok.com/@3d_printnova"],
  paymentAccepted: ["Bizum", "Cash"],
  makesOffer: products.slice(0, 6).map((product) => ({
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
  description:
    "Diseño 3D personalizado, fabricación bajo demanda, tienda de objetos impresos en 3D y envíos en toda la provincia de Badajoz.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePage />
    </>
  );
}
