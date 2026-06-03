"use client";

import {
  ArrowRight,
  Mail,
  MessageCircle,
  Music2,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contact, footerLinks } from "@/lib/data";

export function ContactFooter() {
  return (
    <section className="relative px-4 pb-6 pt-16 sm:px-6 lg:px-8" id="contacto">
      <div className="mx-auto max-w-7xl">
        <div className="depth-panel overflow-hidden rounded-[2rem] p-5 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Badge className="gap-2">
                <MessageCircle className="size-3.5" />
                Contacto directo
              </Badge>
              <h2 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Tu próxima pieza empieza con un WhatsApp.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Manda STL, foto, medidas o una idea. Te respondemos con
                viabilidad, material, color, precio estimado y opción de
                entrega.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <a href={contact.whatsappHref}>
                    <MessageCircle />
                    Crear mi diseño
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <a href={`mailto:${contact.email}`}>
                    <Mail />
                    Email
                  </a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <a
                className="rounded-[1.5rem] border border-white/[0.1] bg-white/[0.05] p-5 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={contact.whatsappHref}
              >
                <MessageCircle className="size-6 text-cyan-nova" />
                <p className="mt-5 text-sm uppercase text-muted-foreground">
                  WhatsApp
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {contact.whatsapp}
                </p>
              </a>
              <a
                className="rounded-[1.5rem] border border-white/[0.1] bg-white/[0.05] p-5 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={`mailto:${contact.email}`}
              >
                <Mail className="size-6 text-violet-nova" />
                <p className="mt-5 text-sm uppercase text-muted-foreground">
                  Email
                </p>
                <p className="mt-2 break-words text-lg font-black text-white">
                  {contact.email}
                </p>
              </a>
              <a
                className="rounded-[1.5rem] border border-white/[0.1] bg-white/[0.05] p-5 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href="https://www.tiktok.com/@3d_printnova"
              >
                <Music2 className="size-6 text-rose-300" />
                <p className="mt-5 text-sm uppercase text-muted-foreground">
                  TikTok
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  {contact.tiktok}
                </p>
              </a>
              <div className="rounded-[1.5rem] border border-white/[0.1] bg-white/[0.05] p-5">
                <PackageCheck className="size-6 text-emerald-300" />
                <p className="mt-5 text-sm uppercase text-muted-foreground">
                  Entrega
                </p>
                <p className="mt-2 text-xl font-black text-white">
                  Recogida / reparto / correo
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-4 rounded-[2rem] border border-white/[0.1] bg-white/[0.045] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-cyan-nova text-sm font-black text-[#071017]">
                3D
              </span>
              <div>
                <p className="font-black text-white">3DPrintNova</p>
                <p className="text-sm text-muted-foreground">
                  Impresión 3D premium en Badajoz
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {footerLinks.map((link) => (
                <span
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-white/62"
                  key={link}
                >
                  {link}
                </span>
              ))}
            </div>
            <a
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-nova transition hover:text-white"
              href={contact.whatsappHref}
            >
              <ShieldCheck className="size-4" />
              Pedir ahora
              <ArrowRight className="size-4" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
