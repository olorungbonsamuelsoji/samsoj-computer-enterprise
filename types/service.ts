export type ServicePricingType =
  | "starting_from"        // e.g. "Starting from ₦10,000"
  | "diagnostic_variable"  // e.g. "Price varies based on PC specification and issue"
  | "fixed"                // e.g. "₦15,000"
  | "custom_quote";        // e.g. "Custom Quote Required"

export type ServiceDeliveryMode =
  | "physical_and_remote"
  | "remote_only"
  | "physical_only"
  | "onsite_visit";

export interface ServicePricing {
  type: ServicePricingType;
  basePrice?: number;         // in NGN (e.g. 10000)
  priceLabel?: string;        // custom label override e.g. "Starting from ₦10,000"
  priceSubtitle?: string;     // e.g. "Final price depends on PC specifications and fault diagnosis"
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon: string;
  category: "maintenance" | "repairs" | "remote_it" | "networking" | "cctv" | "pos" | "web_dev" | "general";
  pricing: ServicePricing;
  deliveryMode: ServiceDeliveryMode;
  features: string[];
  isFeatured: boolean;
  isPublished: boolean;
  isCoreMaintenance: boolean;
  ctaLabel: string;
  ctaAction?: "whatsapp_maintenance" | "whatsapp_remote" | "whatsapp_general" | "enquiry_form";
  sortOrder: number;
  updatedAt?: string;
}
