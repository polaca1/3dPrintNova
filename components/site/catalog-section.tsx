"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";

import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, contact, products, type CategoryId, type Product } from "@/lib/data";
import { cn } from "@/lib/utils";

function ProductVisual({ product }: { product: Product }) {
  const style = { "--product": product.color } as CSSProperties;

  return (
    <div
      className="relative h-48 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0b111a]"
      style={style}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),transparent_34%),linear-gradient(90deg,rgba(67,231,255,0.09),rgba(168,85,247,0.12),transparent)]" />
      <div className="absolute inset-x-6 bottom-5 h-10 rounded-full bg-black/36 blur-xl" />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-28 w-24 -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-[linear-gradient(145deg,var(--product),rgba(255,255,255,0.76))] shadow-[0_0_44px_color-mix(in_srgb,var(--product)_38%,transparent)]",
          product.shape === "vase" && "rounded-[42%_42%_22%_22%]",
          product.shape === "controller" && "h-20 w-36 rounded-[2rem]",
          product.shape === "home" && "h-24 w-32 rounded-[1.2rem]",
          product.shape === "sign" && "h-20 w-40 rounded-[1rem]",
          product.shape === "bust" && "h-32 w-24 rounded-[48%_48%_26%_26%]",
          product.shape === "gear" && "h-28 w-28 rounded-full",
          product.shape === "mini" && "h-32 w-20 rounded-[46%_46%_18%_18%]",
        )}
      >
        <div className="absolute inset-x-3 top-4 h-px bg-white/45" />
        <div className="absolute inset-x-4 top-9 h-px bg-white/30" />
        <div className="absolute inset-x-5 bottom-8 h-px bg-black/25" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <span className="rounded-full bg-black/38 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {product.finish}
        </span>
        <span className="size-3 rounded-full bg-[var(--product)] shadow-[0_0_18px_var(--product)]" />
      </div>
    </div>
  );
}

export function CatalogSection() {
  const [active, setActive] = useState<CategoryId>("all");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filteredProducts = useMemo(
    () =>
      active === "all"
        ? products
        : products.filter((product) => product.category === active),
    [active],
  );

  const toggleWish = (id: string) => {
    setWishlist((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="catalogo">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            copy="Una tienda pensada para vender hoy por WhatsApp y evolucionar mañana hacia checkout completo, stock, reservas y pagos online."
            eyebrow="Catálogo / tienda"
            title="Productos listos para pedir, modificar o convertir en algo tuyo"
          />
          <div
            className="depth-panel flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm text-muted-foreground lg:max-w-sm"
            data-gsap="reveal"
          >
            <Search className="size-4 text-cyan-nova" />
            Filtra por categoría y abre vista rápida
          </div>
        </div>

        <div
          className="mt-9 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
          data-gsap="reveal"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            const selected = active === category.id;

            return (
              <button
                aria-pressed={selected}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-cyan-nova/70 text-[#071017]"
                    : "border-white/[0.12] bg-white/[0.06] text-white/72 hover:text-white",
                )}
                key={category.id}
                onClick={() => setActive(category.id)}
                type="button"
              >
                {selected ? (
                  <motion.span
                    className="absolute inset-0 -z-10 rounded-full bg-cyan-nova shadow-glow"
                    layoutId="active-category"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                ) : null}
                <Icon className="size-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        <motion.div
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.article
                className="group depth-panel overflow-hidden rounded-[2rem] p-3"
                exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                key={product.id}
                layout
                transition={{ duration: 0.32 }}
                whileHover={{ y: -8 }}
              >
                <ProductVisual product={product} />
                <div className="p-3">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge className="border-white/[0.12] text-white/72">
                      {product.tag}
                    </Badge>
                    <button
                      aria-label={
                        wishlist.has(product.id)
                          ? `Quitar ${product.name} de favoritos`
                          : `Añadir ${product.name} a favoritos`
                      }
                      className={cn(
                        "grid size-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.07] text-white/72 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        wishlist.has(product.id) && "border-rose-400/50 text-rose-300",
                      )}
                      onClick={() => toggleWish(product.id)}
                      type="button"
                    >
                      <Heart
                        className={cn(
                          "size-4",
                          wishlist.has(product.id) && "fill-current",
                        )}
                      />
                    </button>
                  </div>
                  <h3 className="min-h-14 text-xl font-black leading-tight text-white">
                    {product.name}
                  </h3>
                  <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                        desde
                      </p>
                      <p className="text-2xl font-black text-white">
                        €{product.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        aria-label={`Vista rápida de ${product.name}`}
                        onClick={() => setQuickView(product)}
                        size="icon"
                        type="button"
                        variant="icon"
                      >
                        <Eye />
                      </Button>
                      <Button asChild size="icon">
                        <a
                          aria-label={`Pedir ${product.name} por WhatsApp`}
                          href={`${contact.whatsappHref}%20Me%20interesa%20${encodeURIComponent(product.name)}.`}
                        >
                          <ShoppingBag />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {quickView ? (
          <motion.div
            aria-modal="true"
            className="fixed inset-0 z-[90] grid place-items-center bg-black/72 p-4 backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="dialog"
          >
            <motion.div
              className="depth-panel max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-[2rem] p-4 sm:p-5"
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center justify-between gap-4">
                <Badge>{quickView.tag}</Badge>
                <Button
                  aria-label="Cerrar vista rápida"
                  onClick={() => setQuickView(null)}
                  size="icon"
                  type="button"
                  variant="icon"
                >
                  <X />
                </Button>
              </div>
              <div className="mt-5 grid gap-6 md:grid-cols-[0.95fr_1.05fr]">
                <ProductVisual product={quickView} />
                <div>
                  <h3 className="text-4xl font-black leading-none text-white">
                    {quickView.name}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {quickView.description}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-3xl border border-white/[0.1] bg-white/[0.05] p-4">
                      <dt className="text-xs uppercase text-muted-foreground">
                        Acabado
                      </dt>
                      <dd className="mt-1 text-sm font-black text-white">
                        {quickView.finish}
                      </dd>
                    </div>
                    <div className="rounded-3xl border border-white/[0.1] bg-white/[0.05] p-4">
                      <dt className="text-xs uppercase text-muted-foreground">
                        Precio base
                      </dt>
                      <dd className="mt-1 text-sm font-black text-white">
                        €{quickView.price}
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg">
                      <a
                        href={`${contact.whatsappHref}%20Quiero%20presupuesto%20para%20${encodeURIComponent(quickView.name)}.`}
                      >
                        <MessageCircle />
                        Pedir por WhatsApp
                      </a>
                    </Button>
                    <Button
                      onClick={() => setQuickView(null)}
                      size="lg"
                      type="button"
                      variant="secondary"
                    >
                      Seguir mirando
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
