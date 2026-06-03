import {
  BadgeCheck,
  Boxes,
  Building2,
  Clock3,
  Cuboid,
  Gamepad2,
  HeartHandshake,
  Home,
  MapPin,
  PackageCheck,
  Palette,
  Printer,
  Sparkles,
  ToyBrick,
  Wrench,
} from "lucide-react";

export const contact = {
  whatsapp: "+34 687 591 431",
  whatsappHref:
    "https://wa.me/34687591431?text=Hola%203DPrintNova%2C%20quiero%20crear%20un%20dise%C3%B1o%203D.",
  email: "printnovagroup@gmail.com",
  tiktok: "@3d_printnova",
};

export const navItems = [
  { label: "Catálogo", href: "#catalogo" },
  { label: "Personalizar", href: "#builder" },
  { label: "Proceso", href: "#proceso" },
  { label: "Showcase", href: "#showcase" },
  { label: "Contacto", href: "#contacto" },
];

export const trustItems = [
  {
    icon: MapPin,
    title: "Badajoz provincia",
    value: "Cobertura local",
    copy: "Reparto propio en cercanía, recogida en almacén y envío por correo.",
  },
  {
    icon: Clock3,
    title: "Producción ágil",
    value: "48-96 h",
    copy: "Piezas pequeñas y encargos sencillos con respuesta rápida por WhatsApp.",
  },
  {
    icon: Palette,
    title: "A medida",
    value: "Diseño único",
    copy: "STL, imagen de referencia o idea escrita: lo convertimos en un objeto.",
  },
  {
    icon: Printer,
    title: "Fabricación propia",
    value: "Control total",
    copy: "Impresión, acabado y revisión hechos por el mismo equipo.",
  },
];

export const categories = [
  { id: "all", label: "Todos", icon: Sparkles },
  { id: "decoracion", label: "Decoración", icon: Cuboid },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "hogar", label: "Hogar", icon: Home },
  { id: "empresas", label: "Empresas", icon: Building2 },
  { id: "personalizados", label: "Personalizados", icon: HeartHandshake },
  { id: "repuestos", label: "Repuestos", icon: Wrench },
  { id: "miniaturas", label: "Miniaturas", icon: ToyBrick },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Product = {
  id: string;
  name: string;
  category: Exclude<CategoryId, "all">;
  price: number;
  tag: string;
  description: string;
  finish: string;
  color: string;
  shape: "vase" | "controller" | "home" | "sign" | "bust" | "gear" | "mini";
};

export const products: Product[] = [
  {
    id: "nova-vase",
    name: "Jarrón Nova Twist",
    category: "decoracion",
    price: 18,
    tag: "Top venta",
    description: "Pieza decorativa con patrón paramétrico y acabado satinado.",
    finish: "PLA silk / mate",
    color: "#43E7FF",
    shape: "vase",
  },
  {
    id: "controller-stand",
    name: "Dock Gaming DualSense",
    category: "gaming",
    price: 16,
    tag: "Setup",
    description: "Soporte para mando, auriculares o accesorios de escritorio.",
    finish: "Negro mate",
    color: "#A855F7",
    shape: "controller",
  },
  {
    id: "cable-hub",
    name: "Hub organizador",
    category: "hogar",
    price: 9,
    tag: "Rápido",
    description: "Organizador modular para cables, llaves o herramientas ligeras.",
    finish: "PLA reciclado",
    color: "#4F8CFF",
    shape: "home",
  },
  {
    id: "brand-sign",
    name: "Logo físico para negocio",
    category: "empresas",
    price: 35,
    tag: "B2B",
    description: "Rótulo, placa o display de marca para mostrador y eventos.",
    finish: "Multicolor",
    color: "#22C55E",
    shape: "sign",
  },
  {
    id: "custom-bust",
    name: "Figura personalizada",
    category: "personalizados",
    price: 29,
    tag: "A medida",
    description: "Mini figura desde referencia, avatar o concepto preparado.",
    finish: "Acabado fino",
    color: "#FF4FD8",
    shape: "bust",
  },
  {
    id: "replacement-clip",
    name: "Repuesto funcional",
    category: "repuestos",
    price: 7,
    tag: "Fix it",
    description: "Clips, tapas, soportes y piezas rotas con medida personalizada.",
    finish: "PETG resistente",
    color: "#FACC15",
    shape: "gear",
  },
  {
    id: "tabletop-mini",
    name: "Miniatura tabletop",
    category: "miniaturas",
    price: 12,
    tag: "Detalle",
    description: "Miniaturas, props y escenografía con capas muy finas.",
    finish: "Resina look",
    color: "#FB7185",
    shape: "mini",
  },
  {
    id: "desk-totem",
    name: "Totem de escritorio",
    category: "decoracion",
    price: 14,
    tag: "Nuevo",
    description: "Objeto visual para setup, estantería o regalo personalizado.",
    finish: "Gradiente neon",
    color: "#14B8A6",
    shape: "vase",
  },
];

export const builderOptions = {
  sizes: [
    { label: "S", multiplier: 1, detail: "hasta 8 cm" },
    { label: "M", multiplier: 1.45, detail: "hasta 16 cm" },
    { label: "L", multiplier: 2.2, detail: "hasta 28 cm" },
  ],
  materials: [
    { label: "PLA", multiplier: 1, detail: "ligero, color vivo" },
    { label: "PETG", multiplier: 1.35, detail: "más resistente" },
    { label: "Silk", multiplier: 1.25, detail: "brillo premium" },
  ],
  colors: [
    { label: "Nova cyan", value: "#43E7FF" },
    { label: "Violet beam", value: "#A855F7" },
    { label: "Carbon black", value: "#111827" },
    { label: "Solar white", value: "#F8FAFC" },
    { label: "Signal red", value: "#F43F5E" },
  ],
};

export const processSteps = [
  {
    title: "Diseño",
    copy: "Recibimos idea, STL, foto o medidas y cerramos el objetivo.",
    icon: Sparkles,
  },
  {
    title: "Modelado",
    copy: "Ajustamos geometría, escala, tolerancias y orientación de impresión.",
    icon: Cuboid,
  },
  {
    title: "Impresión",
    copy: "Fabricamos la pieza con material y color seleccionados.",
    icon: Printer,
  },
  {
    title: "Acabado",
    copy: "Revisamos capas, soportes, textura y presentación final.",
    icon: BadgeCheck,
  },
  {
    title: "Envío",
    copy: "Entrega local, recogida en almacén o envío por correo.",
    icon: PackageCheck,
  },
];

export const showcase = [
  {
    title: "Setup gaming",
    metric: "3 piezas",
    copy: "Dock, soporte y organizador en negro mate.",
    tone: "cyan",
  },
  {
    title: "Logo para mostrador",
    metric: "2 colores",
    copy: "Rótulo físico listo para una campaña local.",
    tone: "violet",
  },
  {
    title: "Clip funcional",
    metric: "0,2 mm",
    copy: "Repuesto rediseñado para encajar sin holgura.",
    tone: "amber",
  },
  {
    title: "Miniatura",
    metric: "capas finas",
    copy: "Detalle alto para regalo y exposición.",
    tone: "rose",
  },
  {
    title: "Jarrón paramétrico",
    metric: "silk PLA",
    copy: "Textura de onda con brillo sutil.",
    tone: "blue",
  },
];

export const stats = [
  { label: "Piezas impresas", value: 1250, suffix: "+" },
  { label: "Diseños únicos", value: 180, suffix: "+" },
  { label: "Valoración local", value: 4.9, suffix: "/5" },
];

export const reviews = [
  {
    quote:
      "Les mandé una foto de una pieza rota y me hicieron un repuesto que encajó perfecto.",
    author: "Cliente de Badajoz",
  },
  {
    quote:
      "Muy rápidos por WhatsApp. Elegimos color, tamaño y recogida sin complicaciones.",
    author: "Pedido personalizado",
  },
  {
    quote:
      "El acabado quedó mejor de lo esperado, ideal para regalar algo diferente.",
    author: "Regalo a medida",
  },
];

export const footerLinks = [
  "Diseño 3D",
  "Impresión bajo demanda",
  "Catálogo",
  "WhatsApp",
  "TikTok",
  "Bizum",
];

export const logistics = [
  { icon: Boxes, label: "Recogida en almacén" },
  { icon: PackageCheck, label: "Reparto propio cercano" },
  { icon: BadgeCheck, label: "Bizum y efectivo" },
];
