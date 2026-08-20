import type { HTMLAttributes } from "react";

type SectionVariant = "default" | "tight";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
}

const variants: Record<SectionVariant, string> = {
  default: "py-16 md:py-20 lg:py-24",
  tight: "py-8 md:py-12",
};

export function Section({
  variant = "default",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
