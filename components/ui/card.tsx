import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
        "transition-shadow duration-200",
        interactive &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardHeader({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-1.5 p-6 ${className}`.trim()} {...props} />
  );
}

export function CardTitle({
  className = "",
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`.trim()}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-muted-foreground ${className}`.trim()}
      {...props}
    />
  );
}

export function CardContent({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 pt-0 ${className}`.trim()} {...props} />;
}

export function CardFooter({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`.trim()}
      {...props}
    />
  );
}
