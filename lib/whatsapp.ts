import { business } from "./config";
import type { BusinessConfig } from "@/types/admin";

/**
 * The subset of BusinessConfig needed to build WhatsApp links.
 */
type WhatsAppConfig = Pick<
  BusinessConfig,
  "whatsAppInternational" | "name" | "currencySymbol"
>;

/**
 * Builds a direct WhatsApp chat URL with pre-filled message text.
 * The destination number is read from the live BusinessConfig when provided
 * so changes made in Admin Settings are reflected automatically.
 */
export function buildWhatsAppUrl(
  message: string,
  config: WhatsAppConfig = business
): string {
  const number = config.whatsAppInternational;
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Standard WhatsApp greeting URL.
 */
export function getGeneralWhatsAppUrl(config: WhatsAppConfig = business): string {
  const message = `Hello ${config.name}, I would like to make an enquiry regarding your products and IT services.`;
  return buildWhatsAppUrl(message, config);
}

/**
 * WhatsApp message for a specific product enquiry.
 */
export function getProductWhatsAppUrl(
  product: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    pricingType?: string;
  },
  config: WhatsAppConfig = business
): string {
  const priceDisplay =
    product.price && product.pricingType === "fixed"
      ? `${config.currencySymbol}${product.price.toLocaleString()}`
      : "Contact For Current Price";

  const lines = [
    `Hello ${config.name},`,
    "",
    "I am interested in this product from your catalogue:",
    `• Product: ${product.name}`,
    `• Item Code: ${product.id}`,
    product.category ? `• Category: ${product.category}` : "",
    `• Price / Quote: ${priceDisplay}`,
    "",
    "Could you please confirm availability and provide more details?",
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"), config);
}

/**
 * WhatsApp message for a repair / technical support request.
 */
export function getRepairWhatsAppUrl(
  deviceType?: string,
  config: WhatsAppConfig = business
): string {
  const lines = [
    `Hello ${config.name},`,
    "",
    "I would like to request technical support / repair service.",
    deviceType ? `• Device / Equipment: ${deviceType}` : "• Device / Fault enquiry",
    "",
    "Please let me know the diagnosis process and schedule.",
  ];

  return buildWhatsAppUrl(lines.join("\n"), config);
}

/**
 * WhatsApp message specifically for Computer Maintenance & Formatting.
 */
export function getMaintenanceWhatsAppUrl(
  serviceName = "Computer Maintenance / Formatting",
  details?: string,
  config: WhatsAppConfig = business
): string {
  const lines = [
    `Hello ${config.name},`,
    "",
    `I would like to request *${serviceName}*.`,
    details ? `• Details/Issue: ${details}` : "• Request: Diagnostics, formatting, optimization, or servicing",
    "",
    "Please provide the diagnosis schedule, requirements, and quote.",
  ];

  return buildWhatsAppUrl(lines.join("\n"), config);
}

/**
 * WhatsApp message for Instant Remote Computer Support.
 */
export function getRemoteSupportWhatsAppUrl(
  issueDescription?: string,
  pcSpec?: string,
  config: WhatsAppConfig = business
): string {
  const lines = [
    `Hello ${config.name},`,
    "",
    "I need *Instant Remote Computer Support* (AnyDesk / TeamViewer / Remote Desktop).",
    pcSpec ? `• Computer Spec / OS: ${pcSpec}` : "",
    issueDescription ? `• Problem Description: ${issueDescription}` : "• Problem: Software issue / system error / slow PC / driver bug",
    "",
    "Please let me know when a technician can connect remotely to assist me.",
  ].filter(Boolean);

  return buildWhatsAppUrl(lines.join("\n"), config);
}

/**
 * WhatsApp message for web design / networking / IT consultation.
 */
export function getServiceWhatsAppUrl(
  serviceTitle: string,
  config: WhatsAppConfig = business
): string {
  const lines = [
    `Hello ${config.name},`,
    "",
    `I would like to discuss a project regarding: ${serviceTitle}`,
    "",
    "Please let me know when we can discuss the requirements.",
  ];

  return buildWhatsAppUrl(lines.join("\n"), config);
}

