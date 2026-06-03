import {
  Cuboid,
  Gamepad2,
  Home,
  Sparkles,
  ToyBrick,
  Wrench,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  printTime: string;
  dimensions: string;
  weight: string;
  color: string;
  popular: boolean;
  sourceUrl?: string;
  imageColor: string;
  shape: "cube" | "cylinder" | "sphere" | "wide" | "tall" | "vase";
};

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const shopCategories = [
  { id: "todos", label: "Todos", icon: Sparkles },
  { id: "decoracion", label: "Decoración", icon: Cuboid },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "funcional", label: "Funcional", icon: Wrench },
  { id: "hogar", label: "Hogar", icon: Home },
  { id: "figuras", label: "Figuras", icon: ToyBrick },
] as const;

export type ShopCategoryId = (typeof shopCategories)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Product catalog                                                    */
/* ------------------------------------------------------------------ */

export const shopProducts: ShopProduct[] = [
  {
    id: "benchy",
    name: "Benchy — Barco de calibración",
    description:
      "El clásico modelo de prueba para impresión 3D. Perfecto para evaluar la calidad de una impresora o como pieza de colección.",
    price: 5,
    category: "funcional",
    material: "PLA",
    printTime: "1h 30min",
    dimensions: "6 × 3 × 5 cm",
    weight: "14 g",
    color: "Naranja",
    popular: true,
    imageColor: "#FF8C42",
    shape: "wide",
  },
  {
    id: "soporte-telefono",
    name: "Soporte para teléfono articulado",
    description:
      "Soporte con bisagra funcional que permite ajustar el ángulo de visión. Compatible con la mayoría de smartphones.",
    price: 8,
    category: "funcional",
    material: "PETG",
    printTime: "3h 15min",
    dimensions: "10 × 8 × 12 cm",
    weight: "42 g",
    color: "Negro mate",
    popular: true,
    imageColor: "#4F8CFF",
    shape: "wide",
  },
  {
    id: "maceta-lowpoly",
    name: "Maceta geométrica low-poly",
    description:
      "Maceta decorativa con diseño geométrico facetado. Incluye agujero de drenaje. Ideal para suculentas y cactus.",
    price: 12,
    category: "decoracion",
    material: "PLA silk",
    printTime: "4h 00min",
    dimensions: "10 × 10 × 9 cm",
    weight: "68 g",
    color: "Bronce silk",
    popular: true,
    imageColor: "#C8965C",
    shape: "vase",
  },
  {
    id: "engranaje-repuesto",
    name: "Engranaje funcional de repuesto",
    description:
      "Engranaje personalizable para reemplazar piezas rotas de electrodomésticos, juguetes u otros mecanismos.",
    price: 6,
    category: "funcional",
    material: "PETG",
    printTime: "1h 00min",
    dimensions: "4 × 4 × 1,5 cm",
    weight: "12 g",
    color: "Blanco",
    popular: false,
    imageColor: "#FACC15",
    shape: "sphere",
  },
  {
    id: "llavero-custom",
    name: "Llavero personalizable",
    description:
      "Llavero con texto o forma personalizada. Envíanos tu nombre, logo o diseño y lo convertimos en un accesorio único.",
    price: 4,
    category: "funcional",
    material: "PLA",
    printTime: "0h 40min",
    dimensions: "5 × 3 × 0,5 cm",
    weight: "6 g",
    color: "Multicolor",
    popular: true,
    imageColor: "#43E7FF",
    shape: "cube",
  },
  {
    id: "soporte-auriculares",
    name: "Soporte de auriculares gaming",
    description:
      "Elegante soporte para auriculares con diseño minimalista y agujero para gestión de cables. Setup-ready.",
    price: 14,
    category: "gaming",
    material: "PLA",
    printTime: "5h 30min",
    dimensions: "12 × 8 × 22 cm",
    weight: "95 g",
    color: "Negro mate",
    popular: true,
    imageColor: "#A855F7",
    shape: "tall",
  },
  {
    id: "lampara-litofana",
    name: "Lámpara litófana decorativa",
    description:
      "Lámpara cilíndrica con tu foto grabada en litófana. Al iluminarse, revela la imagen con un efecto mágico.",
    price: 22,
    category: "decoracion",
    material: "PLA blanco",
    printTime: "8h 00min",
    dimensions: "10 × 10 × 15 cm",
    weight: "85 g",
    color: "Blanco translúcido",
    popular: false,
    imageColor: "#FDE68A",
    shape: "cylinder",
  },
  {
    id: "dragon-articulado",
    name: "Figura de dragón articulado",
    description:
      "Dragón impreso en una sola pieza con articulaciones móviles. Se mueve de forma fluida sin necesidad de ensamblaje.",
    price: 18,
    category: "figuras",
    material: "PLA silk",
    printTime: "6h 00min",
    dimensions: "28 × 5 × 4 cm",
    weight: "72 g",
    color: "Dorado silk",
    popular: true,
    imageColor: "#FF4FD8",
    shape: "wide",
  },
  {
    id: "organizador-escritorio",
    name: "Organizador de escritorio modular",
    description:
      "Sistema modular con compartimentos para bolígrafos, clips, tarjetas y móvil. Piezas encajables y ampliables.",
    price: 10,
    category: "hogar",
    material: "PLA",
    printTime: "4h 30min",
    dimensions: "18 × 10 × 8 cm",
    weight: "82 g",
    color: "Gris carbón",
    popular: false,
    imageColor: "#64748B",
    shape: "wide",
  },
  {
    id: "soporte-gafas",
    name: "Soporte para gafas",
    description:
      "Soporte elegante con forma de nariz y orejas para guardar las gafas con estilo sobre la mesita de noche.",
    price: 7,
    category: "hogar",
    material: "PLA",
    printTime: "2h 30min",
    dimensions: "7 × 6 × 10 cm",
    weight: "28 g",
    color: "Blanco",
    popular: false,
    imageColor: "#22C55E",
    shape: "tall",
  },
  {
    id: "caja-bisagra",
    name: "Caja con bisagra integrada",
    description:
      "Pequeña caja impresa en una sola pieza con bisagra funcional. Perfecta para joyería, dados o tornillos.",
    price: 9,
    category: "funcional",
    material: "PETG",
    printTime: "2h 45min",
    dimensions: "8 × 6 × 4 cm",
    weight: "35 g",
    color: "Azul traslúcido",
    popular: false,
    imageColor: "#38BDF8",
    shape: "cube",
  },
  {
    id: "maceta-autoriego",
    name: "Maceta autoriego",
    description:
      "Maceta de doble pared con depósito de agua inferior. Tu planta se riega sola durante días. Diseño elegante.",
    price: 15,
    category: "hogar",
    material: "PETG",
    printTime: "5h 00min",
    dimensions: "12 × 12 × 14 cm",
    weight: "92 g",
    color: "Verde mate",
    popular: false,
    imageColor: "#10B981",
    shape: "vase",
  },
  {
    id: "gripper-mecanico",
    name: "Gripper / pinza mecánica",
    description:
      "Pinza mecánica accionada por el mango. Funcional y divertida. Ideal como juguete o herramienta ligera.",
    price: 11,
    category: "funcional",
    material: "PLA",
    printTime: "3h 30min",
    dimensions: "22 × 5 × 5 cm",
    weight: "48 g",
    color: "Rojo",
    popular: false,
    imageColor: "#F43F5E",
    shape: "wide",
  },
  {
    id: "porta-vasos-coche",
    name: "Porta vasos para coche",
    description:
      "Adaptador porta vasos personalizado para encajar en la consola del coche. Medidas a tu modelo de vehículo.",
    price: 8,
    category: "funcional",
    material: "PETG",
    printTime: "2h 00min",
    dimensions: "9 × 9 × 7 cm",
    weight: "38 g",
    color: "Negro",
    popular: false,
    imageColor: "#6366F1",
    shape: "cylinder",
  },
  {
    id: "busto-decorativo",
    name: "Busto decorativo mini",
    description:
      "Busto artístico estilo clásico en miniatura. Pieza decorativa para estanterías, escritorios o regalos únicos.",
    price: 16,
    category: "figuras",
    material: "PLA marble",
    printTime: "7h 00min",
    dimensions: "6 × 6 × 12 cm",
    weight: "64 g",
    color: "Mármol",
    popular: false,
    imageColor: "#E2E8F0",
    shape: "tall",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

export function getPopularProducts(): ShopProduct[] {
  return shopProducts.filter((p) => p.popular);
}

/* ------------------------------------------------------------------ */
/*  Custom products (localStorage)                                     */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "3dprintnova_custom_products";

export function getCustomProducts(): ShopProduct[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShopProduct[]) : [];
  } catch {
    return [];
  }
}

export function addCustomProduct(partial: Partial<ShopProduct>): ShopProduct {
  const product: ShopProduct = {
    id: `custom-${Date.now()}`,
    name: partial.name ?? "Producto personalizado",
    description: partial.description ?? "Producto añadido por el usuario.",
    price: partial.price ?? 0,
    category: partial.category ?? "funcional",
    material: partial.material ?? "PLA",
    printTime: partial.printTime ?? "—",
    dimensions: partial.dimensions ?? "—",
    weight: partial.weight ?? "—",
    color: partial.color ?? "Personalizado",
    popular: false,
    sourceUrl: partial.sourceUrl,
    imageColor: partial.imageColor ?? "#A855F7",
    shape: partial.shape ?? "cube",
  };

  const current = getCustomProducts();
  current.push(product);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  return product;
}

export function removeCustomProduct(id: string): void {
  const current = getCustomProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
