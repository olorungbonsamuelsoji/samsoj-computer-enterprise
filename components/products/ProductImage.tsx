"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";

const categoryEmoji: Record<string, string> = {
  "laptops-computers": "💻",
  "printers-scanners": "🖨️",
  "networking": "📡",
  "storage-hardware": "💾",
  "cctv-security": "📹",
  "pos-equipment": "🧾",
  "accessories": "🖱️",
};

interface ProductImageProps {
  product: Product;
  /** Additional classes for the outer wrapper div */
  containerClass?: string;
  /** Size hint for Next.js Image optimisation */
  sizes?: string;
  /** Enlarges emoji and switches to a bordered card style for the detail modal */
  large?: boolean;
}

export function ProductImage({
  product,
  containerClass = "h-44",
  sizes = "(max-width: 768px) 100vw, 300px",
  large = false,
}: ProductImageProps) {
  const [imgError, setImgError] = useState(false);

  const rawSrc = product.image && !imgError ? product.image : product.imageUrl;
  const emoji = categoryEmoji[product.categoryId] ?? "📦";

  const src = rawSrc && product.updatedAt
    ? `${rawSrc}${rawSrc.includes("?") ? "&" : "?"}v=${product.updatedAt}`
    : rawSrc;

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-border/60 ${large ? "rounded-2xl border" : "rounded-t-3xl"} ${containerClass}`}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={`${product.name}${product.brand ? " — " + product.brand : ""}${product.modelNumber ? " " + product.modelNumber : ""}`}
            fill
            sizes={sizes}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
          />
          {/* Soft gradient at bottom for card readability */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card/20 to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1 select-none">
          <span className={`${large ? "text-7xl" : "text-6xl"} opacity-55`}>{emoji}</span>
          {!product.image && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/50 mt-1 px-2 text-center">
              Photo Pending
            </span>
          )}
        </div>
      )}
    </div>
  );
}
