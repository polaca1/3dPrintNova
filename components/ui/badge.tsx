import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.08] px-3 py-1 text-xs font-medium text-cyan-nova shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
