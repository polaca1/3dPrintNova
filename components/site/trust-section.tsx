"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPinned, PackageCheck } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { logistics, trustItems } from "@/lib/data";

export function TrustSection() {
  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="confianza">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <SectionHeading
            copy="Servicio local de confianza: respuesta rápida por WhatsApp, fabricación propia y opciones a medida para particulares, regalos únicos, repuestos y empresas."
            eyebrow="Confianza local"
            title="Producción 3D ágil con acabado profesional"
          />

          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
            data-gsap="reveal"
          >
            {logistics.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="depth-panel flex min-h-24 items-center gap-3 rounded-3xl p-4"
                  key={item.label}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-cyan-nova/10 text-cyan-nova">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-bold leading-5 text-white">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                className="group depth-panel min-h-[19rem] overflow-hidden rounded-[2rem] p-6"
                data-gsap="reveal"
                key={item.title}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 280, damping: 22 }}
                whileHover={{ y: -8, rotateX: 2, rotateY: index % 2 ? -2 : 2 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.08] text-cyan-nova transition group-hover:bg-cyan-nova group-hover:text-[#071017]">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white/64">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-8 text-sm font-semibold uppercase text-cyan-nova">
                  {item.value}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {item.copy}
                </p>
                <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-white/75">
                  {index % 2 ? (
                    <PackageCheck className="size-4 text-violet-nova" />
                  ) : (
                    <CheckCircle2 className="size-4 text-cyan-nova" />
                  )}
                  <span>{index === 0 ? "Cercanía real" : "Listo para pedir"}</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div
          className="mt-6 flex overflow-hidden rounded-full border border-white/[0.1] bg-white/[0.045] py-3 text-sm font-semibold text-white/70"
          data-gsap="reveal"
        >
          <div className="flex min-w-max animate-[ticker_22s_linear_infinite] items-center gap-6 px-6">
            {[
              "Badajoz",
              "Mérida",
              "Almendralejo",
              "Don Benito",
              "Villanueva",
              "Zafra",
              "Provincia completa por correo",
            ].map((place) => (
              <span className="flex items-center gap-2" key={place}>
                <MapPinned className="size-4 text-cyan-nova" />
                {place}
              </span>
            ))}
            {[
              "Badajoz",
              "Mérida",
              "Almendralejo",
              "Don Benito",
              "Villanueva",
              "Zafra",
              "Provincia completa por correo",
            ].map((place) => (
              <span className="flex items-center gap-2" key={`${place}-loop`}>
                <MapPinned className="size-4 text-violet-nova" />
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
