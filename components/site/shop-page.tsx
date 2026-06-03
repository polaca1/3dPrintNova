"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  X,
  Search,
  ExternalLink,
  Link2,
  CheckCircle2,
  Sparkles,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo, type CSSProperties } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";
import {
  shopCategories,
  shopProducts,
  getCustomProducts,
  addCustomProduct,
  removeCustomProduct,
  type ShopProduct,
  type ShopCategoryId,
} from "@/lib/shop-data";
import { cn } from "@/lib/utils";

// ── Local Cart Interface ───────────────────────────────────────────────────
interface CartItem {
  product: ShopProduct;
  quantity: number;
}

// ── Visual Helper for Shop ─────────────────────────────────────────────────
function ShopProductVisual({ product }: { product: ShopProduct }) {
  const style = { "--product-color": product.imageColor } as CSSProperties;

  return (
    <div
      className="relative h-44 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b111a] flex items-center justify-center"
      style={style}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_40%),linear-gradient(90deg,rgba(67,231,255,0.05),rgba(168,85,247,0.07),transparent)]" />
      <div className="absolute inset-x-4 bottom-4 h-6 rounded-full bg-black/40 blur-lg" />

      {/* 3D-like geometric shape rendering depending on type */}
      <motion.div
        className={cn(
          "h-20 w-20 border border-white/20 shadow-[0_0_35px_color-mix(in_srgb,var(--product-color)_30%,transparent)]",
          product.shape === "vase" && "rounded-[35%_35%_18%_18%] bg-[linear-gradient(145deg,var(--product-color),rgba(0,0,0,0.85))]",
          product.shape === "cylinder" && "rounded-t-full rounded-b-full bg-[linear-gradient(145deg,var(--product-color),rgba(20,20,20,0.9))]",
          product.shape === "sphere" && "rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--product-color),#050505)]",
          product.shape === "tall" && "h-24 w-12 rounded-lg bg-[linear-gradient(145deg,var(--product-color),rgba(10,10,10,0.85))]",
          product.shape === "cube" && "rounded-xl bg-[linear-gradient(145deg,var(--product-color),rgba(15,15,15,0.9))]",
          !product.shape || product.shape === "wide"
            ? "h-14 w-24 rounded-lg bg-[linear-gradient(145deg,var(--product-color),rgba(15,15,15,0.9))]"
            : ""
        )}
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </div>
  );
}

export function ShopPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ShopCategoryId>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [customList, setCustomList] = useState<ShopProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  // Link import states
  const [urlInput, setUrlInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState<string>("decoracion");
  const [priceInput, setPriceInput] = useState("10");
  const [importMessage, setImportMessage] = useState<{ text: string; success: boolean } | null>(null);

  // Load cart and custom products from localStorage
  useEffect(() => {
    setMounted(true);
    setCustomList(getCustomProducts());

    try {
      const storedCart = localStorage.getItem("3dprintnova_cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart) as CartItem[]);
      }
    } catch (e) {
      console.error("Error loading cart", e);
    }
  }, []);

  // Sync cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("3dprintnova_cart", JSON.stringify(newCart));
  };

  // Combine standard and custom products
  const allProducts = useMemo(() => {
    return [...shopProducts, ...customList];
  }, [customList]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "todos" || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allProducts, activeCategory, searchQuery]);

  // Handle URL import change to auto-prefill name
  useEffect(() => {
    if (!urlInput) return;
    try {
      const url = new URL(urlInput);
      let autoName = "";
      if (url.hostname.includes("makerworld.com")) {
        autoName = "Modelo MakerWorld";
      } else if (url.hostname.includes("thingiverse.com")) {
        autoName = "Diseño Thingiverse";
      } else if (url.hostname.includes("printables.com")) {
        autoName = "Modelo Printables";
      } else if (url.hostname.includes("bambulab.com")) {
        autoName = "Pieza Bambu Lab";
      } else {
        autoName = "Modelo Importado";
      }
      if (!nameInput) {
        setNameInput(autoName);
      }
    } catch {
      // Invalid URL, ignore auto-prefill
    }
  }, [urlInput, nameInput]);

  // Cart operations
  const addToCart = (product: ShopProduct, quantityToAdd = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);
    let newCart: CartItem[];

    if (existing) {
      newCart = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantityToAdd }
          : item
      );
    } else {
      newCart = [...cart, { product, quantity: quantityToAdd }];
    }

    saveCart(newCart);

    // Show visual confirmation on the item modal if it's open
    if (selectedProduct?.id === product.id) {
      // Close modal on success
      setSelectedProduct(null);
    }
  };

  const updateCartQty = (productId: string, delta: number) => {
    const newCart = cart
      .map((item) => {
        if (item.product.id === productId) {
          const qty = item.quantity + delta;
          return { ...item, quantity: qty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    saveCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

  // Add custom item from URL
  const handleImportProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;

    try {
      new URL(urlInput); // Validation
    } catch {
      setImportMessage({ text: "Introduce un enlace web válido.", success: false });
      return;
    }

    const price = parseFloat(priceInput) || 10;
    const name = nameInput.trim() || "Modelo de Enlace";

    // Select shape randomly or based on name
    const shapes: ("cube" | "cylinder" | "sphere" | "wide" | "tall" | "vase")[] = [
      "cube",
      "cylinder",
      "sphere",
      "wide",
      "tall",
      "vase",
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const colors = ["#43E7FF", "#A855F7", "#4F8CFF", "#FB7185", "#FACC15"];
    const imageColor = colors[Math.floor(Math.random() * colors.length)];

    const partial: Partial<ShopProduct> = {
      name,
      description: `Importado desde enlace web: ${new URL(urlInput).hostname}. Listo para estimar impresión bajo demanda.`,
      price,
      category: categoryInput,
      sourceUrl: urlInput,
      material: "PLA",
      printTime: "Variable",
      dimensions: "Personalizado",
      weight: "Variable",
      color: "Según bobina",
      shape,
      imageColor,
    };

    const added = addCustomProduct(partial);
    setCustomList(getCustomProducts());

    // Reset fields
    setUrlInput("");
    setNameInput("");
    setPriceInput("10");
    setImportMessage({ text: `¡"${added.name}" añadido al catálogo local!`, success: true });

    setTimeout(() => {
      setImportMessage(null);
    }, 4000);
  };

  // Remove custom product
  const handleRemoveCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeCustomProduct(id);
    setCustomList(getCustomProducts());
    // Also remove from cart if present
    removeFromCart(id);
  };

  // Calculate cart metrics
  const totalCartItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Construct WhatsApp checkout message
  const whatsappHref = useMemo(() => {
    if (cart.length === 0) return "#";

    let message = "Hola 3DPrintNova! Quiero realizar el siguiente pedido desde la tienda:\n\n";

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity}) - ${item.product.price * item.quantity}€\n`;
      message += `   Material: ${item.product.material} | Color: ${item.product.color}\n`;
      if (item.product.sourceUrl) {
        message += `   Enlace: ${item.product.sourceUrl}\n`;
      }
      message += `\n`;
    });

    message += `Total estimado: ${totalCartPrice}€\n\n`;
    message += "Por favor, confirmadme disponibilidad, tiempos y costes finales. ¡Gracias!";

    return `${contact.whatsappHref.split("?text=")[0]}?text=${encodeURIComponent(message)}`;
  }, [cart, totalCartPrice]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#070707] text-[#f5f5f5]">
      {/* ── Shop Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.12] bg-[#070707]/75 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-cyan-nova/35 bg-cyan-nova/10 text-sm font-black text-white shadow-glow">
              3D
            </span>
            <span className="hidden text-sm font-black uppercase text-white sm:block">
              PrintNova
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.08] hover:text-white"
            >
              <ArrowLeft className="size-4" />
              <span>Volver</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative grid size-11 place-items-center rounded-full border border-cyan-nova/30 bg-cyan-nova/10 text-cyan-nova hover:bg-cyan-nova/20 transition"
              title="Ver Carrito"
            >
              <ShoppingBag className="size-5" />
              {totalCartItems > 0 && (
                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-violet-nova text-[10px] font-black text-white shadow-md">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Tienda Hero ──────────────────────────────────────────────────────── */}
      <section className="px-4 pt-12 pb-6 max-w-7xl mx-auto text-center">
        <Badge className="border-cyan-nova/20 bg-cyan-nova/10 text-cyan-nova mb-4">
          Catálogo funcional & Tienda
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
          La Tienda de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-nova to-violet-nova">3DPrintNova</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
          Explora los modelos más populares de Bambu Lab y repositorios libres, añádelos al carrito y haz tu pedido instantáneo por WhatsApp.
        </p>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.2fr_0.8fr]">
        {/* ── Columna Izquierda: Catálogo y Filtros ─────────────────────────── */}
        <section className="flex flex-col gap-6">
          {/* Barra de Búsqueda y Categorías */}
          <div className="depth-panel rounded-[2rem] p-5 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
              <input
                type="text"
                placeholder="Buscar piezas, soportes, figuras..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-muted-foreground focus:outline-none focus:border-cyan-nova focus:ring-1 focus:ring-cyan-nova text-sm transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Categorías Slider/Tabs */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-white/[0.05]">
              {shopCategories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-300",
                      isSelected
                        ? "bg-cyan-nova border-cyan-nova text-[#070707] shadow-glow"
                        : "bg-white/[0.04] border-white/[0.08] text-muted-foreground hover:text-white hover:bg-white/[0.08]"
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de Productos */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                Catálogo ({filteredProducts.length})
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="depth-panel rounded-[2rem] p-12 text-center">
                <Info className="size-8 text-cyan-nova mx-auto mb-3" />
                <p className="text-white font-bold">No se encontraron productos</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Prueba cambiando la categoría o escribiendo otra palabra de búsqueda.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="depth-panel group cursor-pointer rounded-3xl p-4 transition-all duration-300 hover:border-cyan-nova/30 hover:bg-white/[0.02] flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual del Producto */}
                      <ShopProductVisual product={product} />

                      {/* Header de la Tarjeta */}
                      <div className="mt-4 flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white group-hover:text-cyan-nova transition text-sm sm:text-base line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="font-black text-cyan-nova text-base shrink-0">
                          {product.price}€
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                        <span className="bg-white/[0.06] px-2 py-0.5 rounded-full border border-white/[0.04]">
                          {product.material}
                        </span>
                        {product.id.startsWith("custom-") && (
                          <span className="bg-violet-nova/10 text-violet-300 border border-violet-nova/20 px-2 py-0.5 rounded-full font-semibold">
                            Enlace
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {product.id.startsWith("custom-") && (
                          <button
                            onClick={(e) => handleRemoveCustom(product.id, e)}
                            className="p-2 rounded-full text-red-400 hover:bg-red-400/10 transition"
                            title="Quitar de mi catálogo"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <Plus className="size-3.5" />
                          <span>Añadir</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Columna Derecha: Añadir desde Enlace Web ───────────────────────── */}
        <section className="flex flex-col gap-6">
          <div className="depth-panel rounded-[2rem] p-5 sm:p-6" data-gsap="reveal">
            <div className="flex items-center gap-2 mb-4">
              <Link2 className="size-5 text-cyan-nova" />
              <h2 className="text-lg font-black text-white uppercase tracking-wider">
                Añadir por enlace (Bambu / MakerWorld)
              </h2>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
              ¿Has visto un modelo 3D que te encanta en MakerWorld, Thingiverse o Printables? Pega la URL aquí para añadirlo a tu tienda y estimar su impresión.
            </p>

            <form onSubmit={handleImportProduct} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
                  Enlace del modelo *
                </label>
                <input
                  type="url"
                  placeholder="https://makerworld.com/es/models/..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-nova text-xs transition"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
                  Nombre de la pieza *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Organizador de Cables Bambu"
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-nova text-xs transition"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
                    Categoría
                  </label>
                  <select
                    className="w-full px-3 py-3 rounded-2xl bg-[#0b111a] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-nova text-xs transition"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                  >
                    <option value="decoracion">Decoración</option>
                    <option value="gaming">Gaming</option>
                    <option value="funcional">Funcional</option>
                    <option value="hogar">Hogar</option>
                    <option value="figuras">Figuras</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wide">
                    Precio Estimado (€)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white focus:outline-none focus:border-cyan-nova text-xs transition"
                    value={priceInput}
                    onChange={(e) => setPriceInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              {importMessage && (
                <div
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-xl text-xs",
                    importMessage.success
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  )}
                >
                  {importMessage.success && <CheckCircle2 className="size-4" />}
                  <span>{importMessage.text}</span>
                </div>
              )}

              <Button type="submit" className="w-full mt-2">
                <Plus className="size-4" />
                <span>Añadir a mi catálogo</span>
              </Button>
            </form>
          </div>

          {/* Información del flujo */}
          <div className="depth-panel rounded-[2rem] p-5 sm:p-6 bg-gradient-to-br from-violet-nova/[0.04] to-cyan-nova/[0.04]">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="size-4 text-violet-nova" />
              ¿Cómo funciona el pedido?
            </h3>
            <ol className="mt-3 flex flex-col gap-3 text-xs text-muted-foreground list-decimal pl-4">
              <li>Añade al carrito todos los artículos que te gusten (o importa los tuyos por enlace).</li>
              <li>Pulsa el botón de WhatsApp en tu carrito para enviar la lista prefabricada de tu encargo.</li>
              <li>Revisamos las medidas, volumen de impresión, bobina y cerramos el presupuesto definitivo.</li>
            </ol>
          </div>
        </section>
      </main>

      {/* ── MODAL: Detalle de Producto ───────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.94, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#080b10] p-6 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 grid size-8 place-items-center rounded-full bg-white/[0.06] text-white/70 hover:bg-white/10 hover:text-white transition"
              >
                <X className="size-4" />
              </button>

              <div className="flex flex-col gap-5">
                {/* Visual */}
                <div className="mt-2">
                  <ShopProductVisual product={selectedProduct} />
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">{selectedProduct.name}</h3>
                    <span className="text-xl font-black text-cyan-nova">{selectedProduct.price}€</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Características técnicas */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 text-xs">
                  <h4 className="font-bold text-white uppercase mb-3 tracking-wide">Ficha Estimativa</h4>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-bold text-white">{selectedProduct.material}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span className="text-muted-foreground">Color sugerido</span>
                      <span className="font-bold text-white">{selectedProduct.color}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span className="text-muted-foreground">Dimensiones</span>
                      <span className="font-bold text-white">{selectedProduct.dimensions}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.04] pb-1.5">
                      <span className="text-muted-foreground">Peso pieza</span>
                      <span className="font-bold text-white">{selectedProduct.weight}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer / Cart Action */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  {selectedProduct.sourceUrl ? (
                    <a
                      href={selectedProduct.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cyan-nova flex items-center gap-1 hover:underline"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>Ver origen del archivo</span>
                    </a>
                  ) : (
                    <span className="text-[10px] text-muted-foreground">
                      * El filamento y color definitivo se pueden cambiar.
                    </span>
                  )}

                  <Button
                    onClick={() => addToCart(selectedProduct)}
                    className="shadow-glow"
                  >
                    <Plus className="size-4" />
                    <span>Añadir al carrito</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── DRAW-BAR: Carrito lateral ────────────────────────────────────────── */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#080b10] border-l border-white/[0.12] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header del carro */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-5 text-cyan-nova" />
                    <h3 className="text-lg font-black text-white uppercase tracking-wider">Tu Carrito</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full text-muted-foreground hover:text-white"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Items */}
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground flex flex-col items-center">
                    <ShoppingBag className="size-12 text-white/[0.1] mb-3" />
                    <p className="text-sm font-bold text-white">El carrito está vacío</p>
                    <p className="text-xs mt-1">Explora la tienda y añade piezas a tu pedido.</p>
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-[60vh] flex flex-col gap-3 pr-2 scrollbar-thin">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between border border-white/[0.06] bg-white/[0.02] p-3 rounded-2xl gap-3"
                      >
                        <div className="flex items-center gap-3">
                          {/* Mini visual */}
                          <div
                            className="size-11 rounded-lg border border-white/[0.1] flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${item.product.imageColor}1a` }}
                          >
                            <div
                              className="size-5 rounded-full"
                              style={{ backgroundColor: item.product.imageColor }}
                            />
                          </div>

                          <div>
                            <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-cyan-nova font-black mt-0.5">
                              {item.product.price}€
                              <span className="text-[10px] text-muted-foreground font-normal ml-2">
                                (Total: {item.product.price * item.quantity}€)
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Controles de Qty */}
                          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-full p-1 text-xs font-semibold">
                            <button
                              onClick={() => updateCartQty(item.product.id, -1)}
                              className="p-1 text-muted-foreground hover:text-white"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="px-2 text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.product.id, 1)}
                              className="p-1 text-muted-foreground hover:text-white"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-red-400 p-1"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer del carro */}
              {cart.length > 0 && (
                <div className="border-t border-white/[0.08] pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-white mb-4">
                    <span>Total Estimado:</span>
                    <span className="text-2xl font-black text-cyan-nova">{totalCartPrice}€</span>
                  </div>

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 px-6 rounded-full shadow-lg transition text-center text-sm"
                  >
                    <MessageCircleIcon className="size-4" />
                    <span>Hacer pedido por WhatsApp</span>
                    <ArrowRight className="size-4" />
                  </a>

                  <p className="text-[10px] text-muted-foreground mt-3 text-center leading-relaxed">
                    * El precio final se confirma por chat tras validar stock del filamento y el volumen final de la impresión.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simple WhatsApp logo SVG inside the page
function MessageCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-3.811c1.626.965 3.237 1.488 4.96.488c.307-.182.607-.156.918-.009 2.051.97 3.993.42 5.679-.624.238-.148.406-.118.601.036 1.378 1.09 2.92 1.343 4.545.698 1.554-.616 2.016-1.879 2.115-3.376.126-1.921-.497-3.664-1.637-5.183-.342-.455-.386-.481.045-.964.919-1.031 1.704-2.179 2.378-3.447.531-.998.423-1.944-.316-2.738-.724-.777-1.652-.942-2.656-.632-1.026.317-1.937.896-2.753 1.579-.208.175-.349.19-.572.036-1.74-1.196-3.626-1.517-5.691-.941-.453.126-.641.056-.913-.312-.907-1.223-2.032-2.128-3.486-2.502-.924-.238-1.776-.048-2.434.646-.669.706-.757 1.564-.403 2.479.52 1.346 1.309 2.518 2.217 3.593.189.224.208.366-.008.599-.958 1.036-1.782 2.186-2.474 3.446-.575 1.047-.48 2.011.298 2.825z" />
    </svg>
  );
}
