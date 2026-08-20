import type { HTMLAttributes } from "react";

type ContainerVariant = "default" | "narrow" | "wide";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariant;
}

const variants: Record<ContainerVariant, string> = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[80rem]",
};

export function Container({
  variant = "default",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${variants[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
