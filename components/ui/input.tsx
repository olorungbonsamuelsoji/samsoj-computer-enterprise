import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={[
          "h-10 w-full rounded-md border bg-background px-3 text-base text-foreground",
          "placeholder:text-muted-foreground",
          "transition-colors",
          "outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          error ? "border-error focus-visible:ring-error" : "border-input",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
