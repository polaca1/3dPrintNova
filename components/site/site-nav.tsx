"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Menu,
  MessageCircle,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { contact, navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-primary-foreground"
        href="#catalogo"
      >
        Saltar al contenido
      </a>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/[0.12] bg-[#070707]/70 px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl"
        >
          <a className="group flex items-center gap-3" href="#inicio">
            <span className="grid size-10 place-items-center rounded-full border border-cyan-nova/35 bg-cyan-nova/10 text-sm font-black text-white shadow-glow">
              3D
            </span>
            <span className="hidden text-sm font-black uppercase text-white sm:block">
              PrintNova
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
              onClick={() => setDark((value) => !value)}
              size="icon"
              title={dark ? "Tema claro" : "Tema oscuro"}
              type="button"
              variant="icon"
            >
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button asChild className="hidden sm:inline-flex" size="sm">
              <a href={contact.whatsappHref}>
                <MessageCircle />
                WhatsApp
              </a>
            </Button>
            <Button
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="md:hidden"
              onClick={() => setOpen((value) => !value)}
              size="icon"
              type="button"
              variant="icon"
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>

        <AnimatePresence>
          {open ? (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/[0.12] bg-[#080b10]/92 p-2 shadow-[0_26px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl md:hidden"
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              {navItems.map((item, index) => (
                <a
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold text-white transition hover:bg-white/[0.08]",
                    index !== navItems.length - 1 &&
                      "border-b border-white/[0.06]",
                  )}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowRight className="size-4 text-cyan-nova" />
                </a>
              ))}
              <a
                className="mt-2 flex items-center justify-between rounded-2xl bg-primary px-4 py-4 text-base font-black text-primary-foreground"
                href={contact.whatsappHref}
                onClick={() => setOpen(false)}
              >
                Crear mi diseño
                <Sparkles className="size-4" />
              </a>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    </>
  );
}
