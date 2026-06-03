"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  Cpu,
  MessageCircle,
  MousePointer2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useState, type CSSProperties, type PointerEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data";

const NovaScene = dynamic(
  () => import("@/components/site/nova-scene").then((mod) => mod.NovaScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-[420px] place-items-center text-sm text-cyan-nova/80">
        Generando vista 3D
      </div>
    ),
  },
);

const heroStats = [
  { label: "Provincia", value: "Badajoz" },
  { label: "Pedidos", value: "WhatsApp" },
  { label: "Entrega", value: "Local + correo" },
];

export function HeroSection() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  };

  const floatingStyle = {
    "--tilt-x": `${pointer.y * -10}deg`,
    "--tilt-y": `${pointer.x * 12}deg`,
    "--move-x": `${pointer.x * 24}px`,
    "--move-y": `${pointer.y * 18}px`,
  } as CSSProperties;

  return (
    <section
      className="relative isolate min-h-[92svh] overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8"
      id="inicio"
      onPointerMove={handlePointerMove}
    >
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.88)_34%,rgba(7,7,7,0.28)_70%,#070707_100%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070707] to-transparent"
      />

      <div className="absolute inset-y-0 right-0 z-0 w-full opacity-[0.58] sm:opacity-[0.78] lg:w-[68%] lg:opacity-100">
        <NovaScene />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(92svh-9rem)] max-w-7xl flex-col justify-center">
        <motion.div
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          className="max-w-5xl"
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="mb-6 gap-2 border-cyan-nova/30 bg-cyan-nova/10 text-cyan-nova">
            <Sparkles className="size-3.5" />
            Diseño 3D bajo demanda en Badajoz
          </Badge>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.92] text-white text-shadow-glow sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.7rem]">
            Convertimos ideas en{" "}
            <span className="neon-text block">objetos reales</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg md:text-xl">
            Diseño 3D personalizado, fabricación bajo demanda y envíos en toda
            la provincia de Badajoz.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/tienda/">
                <ShoppingBag />
                Ir a tienda
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={contact.whatsappHref}>
                <MessageCircle />
                Crear mi diseño
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#catalogo">
                Ver catálogo
                <ArrowRight />
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3"
          initial={{ opacity: 0, y: 22 }}
          transition={{ delay: 0.28, duration: 0.7 }}
        >
          {heroStats.map((stat) => (
            <div
              className="depth-panel rounded-3xl px-4 py-3 sm:px-5"
              key={stat.label}
            >
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-sm font-black text-white sm:text-base">
                {stat.value}
              </p>
            </div>
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-20 right-0 hidden w-[25rem] max-w-[38vw] lg:block"
          style={floatingStyle}
        >
          <div className="depth-panel premium-outline animate-float rounded-[2rem] p-5 [transform:translate3d(var(--move-x),var(--move-y),0)_rotateX(var(--tilt-x))_rotateY(var(--tilt-y))]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-cyan-nova">
                  Nova quote engine
                </p>
                <p className="mt-2 text-2xl font-black text-white">€18 - €35</p>
              </div>
              <div className="grid size-12 place-items-center rounded-2xl bg-white/[0.08] text-cyan-nova">
                <Cpu className="size-5" />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {["STL validado", "PLA silk cyan", "Entrega local"].map(
                (item, index) => (
                  <div
                    className="flex items-center justify-between rounded-2xl bg-white/[0.06] px-3 py-2"
                    key={item}
                  >
                    <span className="flex items-center gap-2 text-sm text-white/84">
                      {index === 0 ? (
                        <MousePointer2 className="size-4 text-cyan-nova" />
                      ) : (
                        <Boxes className="size-4 text-violet-nova" />
                      )}
                      {item}
                    </span>
                    <span className="size-2 rounded-full bg-cyan-nova shadow-glow" />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <a
        aria-label="Bajar a secciones"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/[0.12] bg-white/[0.06] p-3 text-white/70 backdrop-blur transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:block"
        href="#confianza"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-5" />
        </motion.span>
      </a>
    </section>
  );
}
