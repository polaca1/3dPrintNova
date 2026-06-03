"use client";

import { motion } from "framer-motion";

import { SectionHeading } from "@/components/site/section-heading";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="proceso">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            copy="Un proceso transparente y detallado para asegurar la calidad, resistencia y precisión de tu pieza en cada etapa."
            eyebrow="Nuestro Método"
            title="Cómo hacemos realidad tu pieza"
          />
          <div className="mt-8 rounded-[2rem] border border-white/[0.1] bg-white/[0.045] p-4">
            <p className="text-sm leading-7 text-muted-foreground">
              Desde tu boceto inicial o archivo STL hasta el envío definitivo,
              controlamos cada parámetro (temperatura, velocidad, ventilación y 
              tomas de contacto) para entregarte un producto impecable.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-8 left-6 top-8 w-px origin-top bg-gradient-to-b from-cyan-nova via-violet-nova to-rose-400 timeline-driven" />
          <div className="space-y-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  className="depth-panel relative ml-10 overflow-hidden rounded-[2rem] p-5 sm:p-7"
                  data-gsap="reveal"
                  key={step.title}
                  whileHover={{ x: 6 }}
                >
                  <span className="absolute -left-[2.65rem] top-8 grid size-12 place-items-center rounded-full border border-cyan-nova/45 bg-[#070707] text-cyan-nova shadow-glow">
                    {index + 1}
                  </span>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase text-cyan-nova">
                        Paso 0{index + 1}
                      </p>
                      <h3 className="mt-2 text-3xl font-black text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                        {step.copy}
                      </p>
                    </div>
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-white">
                      <Icon className="size-6" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
