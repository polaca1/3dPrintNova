"use client";

import { motion } from "framer-motion";
import { Camera, Play, ScanLine, WandSparkles } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { showcase } from "@/lib/data";
import { cn } from "@/lib/utils";

const toneClasses = {
  cyan: "from-cyan-nova/28 via-cyan-nova/10 to-white/[0.04]",
  violet: "from-violet-nova/28 via-violet-nova/10 to-white/[0.04]",
  amber: "from-amber-300/25 via-amber-300/10 to-white/[0.04]",
  rose: "from-rose-400/25 via-rose-400/10 to-white/[0.04]",
  blue: "from-blue-nova/26 via-blue-nova/10 to-white/[0.04]",
} as const;

export function ShowcaseSection() {
  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="showcase">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            copy="Echa un vistazo a nuestros trabajos más recientes. Fotos reales de piezas listas, acabados en detalle y resultados de impresión."
            eyebrow="Galería"
            title="Nuestras impresiones en el mundo real"
          />
          <div className="flex gap-3" data-gsap="reveal">
            <Badge className="gap-2">
              <Camera className="size-3.5" />
              Fotos Reales
            </Badge>
            <Badge className="gap-2">
              <ScanLine className="size-3.5" />
              Timelapse
            </Badge>
          </div>
        </div>

        <div className="mt-10 grid auto-rows-[16rem] grid-cols-1 gap-4 md:grid-cols-6">
          {showcase.map((item, index) => (
            <motion.article
              className={cn(
                "group depth-panel relative overflow-hidden rounded-[2rem] p-5",
                "bg-gradient-to-br",
                toneClasses[item.tone as keyof typeof toneClasses],
                index === 0 && "md:col-span-3 md:row-span-2",
                index === 1 && "md:col-span-3",
                index === 2 && "md:col-span-2",
                index === 3 && "md:col-span-2",
                index === 4 && "md:col-span-2",
              )}
              data-gsap="reveal"
              key={item.title}
              whileHover={{ y: -7, scale: 1.01 }}
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-white/[0.08]" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/50" />
                <div className="absolute inset-x-0 top-1/2 h-px animate-[layer-drift_4s_ease-in-out_infinite_alternate] bg-white/28" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <Badge className="bg-black/24">{item.metric}</Badge>
                  <span className="grid size-11 place-items-center rounded-full bg-white/[0.1] text-white">
                    {index % 2 ? (
                      <Play className="size-4 fill-current" />
                    ) : (
                      <WandSparkles className="size-4" />
                    )}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-black leading-none text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/68">
                    {item.copy}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
