"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Heart, Quote, Star, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { reviews, stats } from "@/lib/data";

function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    value % 1 === 0 ? Math.round(latest).toLocaleString("es-ES") : latest.toFixed(1),
  );

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(count, value, {
      duration: 1.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, inView, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function SocialProofSection() {
  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="social">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          copy="Resultados reales respaldados por la satisfacción de nuestros clientes y el volumen de piezas entregadas con mimo."
          eyebrow="Opiniones"
          title="Lo que dicen nuestros clientes"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              className="depth-panel rounded-[2rem] p-6 text-center"
              data-gsap="reveal"
              key={stat.label}
            >
              <p className="text-5xl font-black text-white">
                <Counter suffix={stat.suffix} value={stat.value} />
              </p>
              <p className="mt-3 text-sm font-semibold uppercase text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              className="depth-panel min-h-64 rounded-[2rem] p-6"
              data-gsap="reveal"
              key={review.author}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-cyan-nova/10 text-cyan-nova">
                  <Quote className="size-5" />
                </span>
                <div className="flex gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star className="size-4 fill-current" key={starIndex} />
                  ))}
                </div>
              </div>
              <p className="mt-8 text-lg font-semibold leading-8 text-white">
                “{review.quote}”
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="text-sm font-bold text-muted-foreground">
                  {review.author}
                </p>
                {index === 0 ? (
                  <Heart className="size-4 text-rose-300" />
                ) : (
                  <TrendingUp className="size-4 text-cyan-nova" />
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
          <div className="depth-panel rounded-[2rem] p-6" data-gsap="reveal">
            <Badge>TikTok</Badge>
            <h3 className="mt-5 text-3xl font-black text-white">@3d_printnova</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Síguenos en TikTok para ver el día a día de nuestro taller, timelapses de impresión y los encargos más curiosos que nos pedís.
            </p>
          </div>
          <div className="depth-panel overflow-hidden rounded-[2rem]" data-gsap="reveal">
            <div className="flex min-w-max animate-[ticker_18s_linear_infinite] gap-3 p-4">
              {[
                "antes / después",
                "pieza rota → repuesto",
                "idea → prototipo",
                "STL → entrega",
                "setup gaming",
                "logo físico",
                "miniatura fina",
                "decoración silk",
                "antes / después",
                "pieza rota → repuesto",
                "idea → prototipo",
                "STL → entrega",
              ].map((item, index) => (
                <span
                  className="rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/72"
                  key={`${item}-${index}`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
