import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={[
          "min-h-24 w-full resize-y rounded-md border bg-background px-3 py-2",
          "text-base text-foreground",
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

Textarea.displayName = "Textarea";
