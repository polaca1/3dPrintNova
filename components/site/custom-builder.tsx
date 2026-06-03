"use client";

import {
  AlertTriangle,
  ArrowRight,
  FileCheck,
  FileUp,
  ImageUp,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  Ruler,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState, type CSSProperties } from "react";

import { SectionHeading } from "@/components/site/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { builderOptions, contact } from "@/lib/data";
import { parseModelFile, type ModelInfo } from "@/lib/stl-parser";
import { cn } from "@/lib/utils";

// ── Material pricing rates (€ per cm³) ──────────────────────────────────────

const MATERIAL_RATES: Record<string, number> = {
  PLA: 0.08,
  PETG: 0.11,
  Silk: 0.10,
};

const SETUP_FEE = 5;
const MIN_PRICE = 8;

// ── Auto-select size based on max bounding box dimension (cm) ───────────────

function autoSizeIndex(maxDimensionCm: number): number {
  if (maxDimensionCm <= 8) return 0; // S – hasta 8 cm
  if (maxDimensionCm <= 16) return 1; // M – hasta 16 cm
  return 2; // L – hasta 28 cm
}

export function CustomBuilder() {
  const [sizeIndex, setSizeIndex] = useState(1);
  const [materialIndex, setMaterialIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // File‑parsing state
  const [modelInfo, setModelInfo] = useState<ModelInfo | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const size = builderOptions.sizes[sizeIndex];
  const material = builderOptions.materials[materialIndex];
  const color = builderOptions.colors[colorIndex];

  // ── Price calculation ───────────────────────────────────────────────────

  const price = useMemo(() => {
    if (modelInfo) {
      // Volume‑based pricing: volume_cm³ × material rate + setup, × qty
      const rate = MATERIAL_RATES[material.label] ?? 0.08;
      const unitPrice = modelInfo.volumeCm3 * rate + SETUP_FEE;
      return Math.max(MIN_PRICE, Math.round(unitPrice * quantity));
    }

    // Fallback generic estimator (original logic)
    const base = 12.5 * size.multiplier * material.multiplier;
    const setup = quantity > 1 ? 4 : 6;
    return Math.max(MIN_PRICE, Math.round((base + setup) * quantity));
  }, [material.label, material.multiplier, modelInfo, quantity, size.multiplier]);

  // ── File handler ────────────────────────────────────────────────────────

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsParsing(true);
      setParseError(null);
      setModelInfo(null);

      try {
        const info = await parseModelFile(file);
        setModelInfo(info);

        // Auto-select size based on max bounding box dimension
        const maxDim = Math.max(
          info.boundingBox.width,
          info.boundingBox.height,
          info.boundingBox.depth,
        );
        setSizeIndex(autoSizeIndex(maxDim));
      } catch (err) {
        setParseError(
          err instanceof Error ? err.message : "Error al procesar el archivo.",
        );
      } finally {
        setIsParsing(false);
      }
    },
    [],
  );

  const clearModel = useCallback(() => {
    setModelInfo(null);
    setParseError(null);
  }, []);

  const previewStyle = { "--preview": color.value } as CSSProperties;

  return (
    <section className="section-pad relative px-4 sm:px-6 lg:px-8" id="builder">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            copy="Deja preparado el briefing antes de escribir por WhatsApp: archivo, referencia, medidas, material, color y cantidad."
            eyebrow="Custom builder"
            title="Convierte un STL, una foto o una idea en presupuesto instantáneo"
          />
          <div
            className="depth-panel rounded-[2rem] p-5 sm:p-6"
            data-gsap="reveal"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase text-cyan-nova">
                  Precio estimado
                </p>
                <p className="mt-2 text-5xl font-black leading-none text-white">
                  €{price}
                </p>
              </div>
              <Badge className="border-emerald-300/30 text-emerald-200">
                Bizum / efectivo
              </Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {modelInfo
                ? "Precio basado en el volumen real de tu modelo 3D."
                : "El precio final se confirma tras revisar geometría, soportes y horas de impresión."}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_0.82fr]">
          <div className="depth-panel rounded-[2rem] p-4 sm:p-6" data-gsap="reveal">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* ── STL / OBJ upload ─────────────────────────────────── */}
              <label
                className={cn(
                  "group relative flex min-h-36 cursor-pointer flex-col justify-between rounded-[1.5rem] border border-dashed p-5 transition",
                  modelInfo
                    ? "border-emerald-400/40 bg-emerald-400/[0.08]"
                    : parseError
                      ? "border-red-400/40 bg-red-400/[0.08]"
                      : "border-cyan-nova/35 bg-cyan-nova/[0.08] hover:bg-cyan-nova/[0.12]",
                )}
              >
                <input
                  accept=".stl,.obj,.3mf"
                  className="sr-only"
                  onChange={handleFileChange}
                  type="file"
                />

                {/* Icon / Spinner */}
                {isParsing ? (
                  <Loader2 className="size-7 animate-spin text-cyan-nova" />
                ) : modelInfo ? (
                  <FileCheck className="size-7 text-emerald-400" />
                ) : parseError ? (
                  <AlertTriangle className="size-7 text-red-400" />
                ) : (
                  <FileUp className="size-7 text-cyan-nova" />
                )}

                <span>
                  <span className="block text-lg font-black text-white">
                    {isParsing
                      ? "Analizando…"
                      : modelInfo
                        ? modelInfo.fileName
                        : "Subir STL / OBJ"}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {isParsing
                      ? "Calculando volumen y dimensiones…"
                      : parseError
                        ? parseError
                        : modelInfo
                          ? `${modelInfo.boundingBox.width} × ${modelInfo.boundingBox.height} × ${modelInfo.boundingBox.depth} cm`
                          : "Archivo listo para validar escala y tolerancias."}
                  </span>
                </span>

                {/* Clear button */}
                {modelInfo && (
                  <button
                    className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20 hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      clearModel();
                    }}
                    title="Quitar archivo"
                    type="button"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </label>

              <label className="group flex min-h-36 cursor-pointer flex-col justify-between rounded-[1.5rem] border border-dashed border-violet-nova/35 bg-violet-nova/[0.08] p-5 transition hover:bg-violet-nova/[0.12]">
                <input
                  accept="image/*,.pdf"
                  className="sr-only"
                  type="file"
                />
                <ImageUp className="size-7 text-violet-nova" />
                <span>
                  <span className="block text-lg font-black text-white">
                    Subir referencia
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    Imagen, croquis, logo o pieza rota fotografiada.
                  </span>
                </span>
              </label>
            </div>

            {/* ── Parsed model info panel ───────────────────────────── */}
            {modelInfo && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 rounded-[1.25rem] border border-cyan-nova/20 bg-cyan-nova/[0.06] p-4 duration-300">
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <p className="font-semibold text-cyan-nova">Volumen</p>
                    <p className="mt-1 text-lg font-black text-white">
                      {modelInfo.volumeCm3}
                      <span className="text-xs font-medium text-white/60">
                        {" "}
                        cm³
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-nova">Dimensiones</p>
                    <p className="mt-1 text-sm font-bold text-white">
                      {modelInfo.boundingBox.width} × {modelInfo.boundingBox.height} ×{" "}
                      {modelInfo.boundingBox.depth}
                      <span className="text-xs font-medium text-white/60">
                        {" "}
                        cm
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-cyan-nova">Triángulos</p>
                    <p className="mt-1 text-lg font-black text-white">
                      {modelInfo.triangleCount.toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-7 grid gap-6 xl:grid-cols-2">
              <fieldset>
                <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
                  <Ruler className="size-4 text-cyan-nova" />
                  Tamaño
                  {modelInfo && (
                    <span className="ml-auto text-xs font-medium text-emerald-400">
                      auto
                    </span>
                  )}
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {builderOptions.sizes.map((option, index) => (
                    <button
                      aria-pressed={sizeIndex === index}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        sizeIndex === index
                          ? "border-cyan-nova bg-cyan-nova text-[#071017]"
                          : "border-white/[0.1] bg-white/[0.05] text-white hover:bg-white/[0.08]",
                      )}
                      key={option.label}
                      onClick={() => setSizeIndex(index)}
                      type="button"
                    >
                      <span className="block text-2xl font-black">{option.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-75">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-bold text-white">
                  Material
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {builderOptions.materials.map((option, index) => (
                    <button
                      aria-pressed={materialIndex === index}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        materialIndex === index
                          ? "border-violet-nova bg-violet-nova text-white"
                          : "border-white/[0.1] bg-white/[0.05] text-white hover:bg-white/[0.08]",
                      )}
                      key={option.label}
                      onClick={() => setMaterialIndex(index)}
                      type="button"
                    >
                      <span className="block text-base font-black">{option.label}</span>
                      <span className="mt-1 block text-xs font-semibold opacity-75">
                        {option.detail}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-bold text-white">Color</legend>
                <div className="flex flex-wrap gap-2">
                  {builderOptions.colors.map((option, index) => (
                    <button
                      aria-label={option.label}
                      aria-pressed={colorIndex === index}
                      className={cn(
                        "grid size-12 place-items-center rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        colorIndex === index
                          ? "border-white bg-white/12"
                          : "border-white/[0.14] bg-white/[0.04]",
                      )}
                      key={option.label}
                      onClick={() => setColorIndex(index)}
                      title={option.label}
                      type="button"
                    >
                      <span
                        className="size-7 rounded-full shadow-[0_0_20px_currentColor]"
                        style={{ backgroundColor: option.value, color: option.value }}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-sm font-bold text-white">
                  Cantidad
                </legend>
                <div className="flex max-w-56 items-center justify-between rounded-full border border-white/[0.1] bg-white/[0.06] p-2">
                  <button
                    aria-label="Reducir cantidad"
                    className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14] disabled:opacity-40"
                    disabled={quantity === 1}
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    type="button"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="text-2xl font-black text-white">{quantity}</span>
                  <button
                    aria-label="Aumentar cantidad"
                    className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-white transition hover:bg-white/[0.14]"
                    onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                    type="button"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </fieldset>
            </div>
          </div>

          <div
            className="depth-panel relative min-h-[34rem] overflow-hidden rounded-[2rem] p-5"
            data-gsap="parallax"
            style={previewStyle}
          >
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.42))]" />
            <div className="relative flex items-center justify-between">
              <Badge className="bg-black/24">
                <Sparkles className="size-3.5" />
                Vista previa
              </Badge>
              <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold text-white/70">
                {size.label} / {material.label}
              </span>
            </div>

            <div className="relative mt-12 grid place-items-center">
              <div className="relative h-72 w-56">
                <div className="absolute inset-x-4 bottom-2 h-12 rounded-full bg-black/45 blur-2xl" />
                <div className="absolute left-1/2 top-1/2 h-56 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[42%_42%_20%_20%] border border-white/24 bg-[linear-gradient(145deg,var(--preview),rgba(255,255,255,0.82))] shadow-[0_0_70px_var(--preview)]" />
                {Array.from({ length: 9 }).map((_, index) => (
                  <span
                    className="absolute left-1/2 h-px w-36 -translate-x-1/2 bg-white/34"
                    key={index}
                    style={{
                      animation: `print-layer ${2.2 + index * 0.1}s ease-in-out infinite`,
                      bottom: `${54 + index * 18}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative mt-10 rounded-[1.5rem] border border-white/[0.11] bg-black/28 p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Color</p>
                  <p className="mt-1 font-black text-white">{color.label}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cantidad</p>
                  <p className="mt-1 font-black text-white">{quantity} uds.</p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full" size="lg">
                <a
                  href={`${contact.whatsappHref}%20Builder%3A%20${size.label}%2C%20${material.label}%2C%20${encodeURIComponent(color.label)}%2C%20${quantity}%20uds.%20Estimado%3A%20${price}%E2%82%AC.${modelInfo ? `%20Archivo%3A%20${encodeURIComponent(modelInfo.fileName)}%20(${modelInfo.volumeCm3}cm%C2%B3%2C%20${modelInfo.boundingBox.width}%C3%97${modelInfo.boundingBox.height}%C3%97${modelInfo.boundingBox.depth}cm)` : ""}`}
                >
                  <MessageCircle />
                  Enviar presupuesto
                  <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
