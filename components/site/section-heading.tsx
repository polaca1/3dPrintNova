import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "scroll-driven max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-5 text-4xl font-black leading-[0.98] text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          {copy}
        </p>
      ) : null}
    </div>
  );
}
