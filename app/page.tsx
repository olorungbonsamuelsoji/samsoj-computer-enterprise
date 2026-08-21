"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { business } from "@/lib/config";
import { products } from "@/lib/products";

const whatsappNumber = business.whatsApp
  .replace(/\D/g, "")
  .replace(/^0/, "234");

const whatsappUrl = `https://wa.me/${whatsappNumber}`;

const services = [
  {
    icon: "ðŸ’»",
    title: "Computer Sales",
    description:
      "Get reliable computers and IT equipment suitable for personal, educational, and business needs.",
    action: "Explore our products",
  },
  {
    icon: "ðŸ”§",
    title: "Repairs & Support",
    description:
      "Reliable technical assistance for computer faults, software issues, maintenance, and troubleshooting.",
    action: "Request technical support",
  },
  {
    icon: "ðŸŒ",
    title: "Web Design & Development",
    description:
      "Professional, responsive websites designed to help businesses, organisations, and individuals establish a strong online presence.",
    action: "Discuss your website",
  },
  {
    icon: "ðŸ“¡",
    title: "Networking Solutions",
    description:
      "Networking equipment and installation solutions designed for reliable connectivity at home, school, and business.",
    action: "Discuss your network",
  },
  {
    icon: "ðŸ“¹",
    title: "CCTV & Security",
    description:
      "Practical CCTV and security technology solutions to help protect homes, offices, shops, and organisations.",
    action: "Enquire about security",
  },
  {
    icon: "âš™ï¸",
    title: "IT Solutions",
    description:
      "Technology solutions tailored to your specific business, personal, or organisational needs.",
    action: "Discuss your IT needs",
  },
];

const reasons = [
  {
    title: "Quality Products",
    description:
      "We focus on practical and dependable technology products that meet your needs.",
  },
  {
    title: "Expert Repairs",
    description:
      "We provide careful technical support to help diagnose and resolve computer problems.",
  },
  {
    title: "Reliable Support",
    description:
      "We aim to make getting technology assistance simple, clear, and dependable.",
  },
  {
    title: "Business Solutions",
    description:
      "From networking to websites, we provide technology solutions that support business growth.",
  },
];

const enquiryTypes = [
  "Computer / Laptop",
  "Printer",
  "Accessories",
  "Computer Repair",
  "Networking",
  "CCTV / Security",
  "Web Design",
  "Other IT Service",
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    need: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Hello SAMSOJ COMPUTER ENTERPRISE,",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${form.name}`,
      `Phone/WhatsApp: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `What I need: ${form.need}`,
      "",
      "Message:",
      form.message,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              S
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-foreground">
                SAMSOJ
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Computer Enterprise
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#services"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </a>

            <a
              href="#products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </a>

            <a
              href="#why-samsoj"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Why SAMSOJ
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button variant="whatsapp" size="sm">
                WhatsApp Us
              </Button>
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="flex size-10 items-center justify-center rounded-xl border border-border text-xl transition hover:bg-muted md:hidden"
            >
              {mobileMenuOpen ? "âœ•" : "â˜°"}
            </button>
          </div>
        </Container>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden">
            <Container className="py-4">
              <nav className="flex flex-col gap-1">
                <a
                  href="#services"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Services
                </a>

                <a
                  href="#products"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Products
                </a>

                <a
                  href="#why-samsoj"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Why SAMSOJ
                </a>

                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted"
                >
                  Contact
                </a>

                <a
                  href="#enquire"
                  onClick={closeMobileMenu}
                  className="mt-2"
                >
                  <Button className="w-full">Make an Enquiry</Button>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1"
                >
                  <Button variant="whatsapp" className="w-full">
                    Chat on WhatsApp
                  </Button>
                </a>
              </nav>
            </Container>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

        <Container className="relative flex min-h-[calc(100vh-4rem)] items-center py-20 sm:py-24 lg:py-28">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-border bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent shadow-sm">
                Technology solutions you can rely on
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
                Reliable technology solutions for your{" "}
                <span className="text-primary">
                  business and everyday needs.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                Explore IT equipment, computer services, repairs, networking,
                security solutions, and professional web design from SAMSOJ
                COMPUTER ENTERPRISE.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#enquire" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    Make an Enquiry
                  </Button>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-5 border-t border-border pt-7">
                <div>
                  <p className="text-lg font-bold text-foreground">IT</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Equipment
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-foreground">24/7</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enquiry access
                  </p>
                </div>

                <div>
                  <p className="text-lg font-bold text-foreground">Web</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Development
                  </p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-[2rem] bg-primary/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-2xl">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                      SAMSOJ
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      Technology Hub
                    </h2>
                  </div>

                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl text-primary-foreground">
                    S
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6">
                  {[
                    ["ðŸ’»", "Computers"],
                    ["ðŸ”§", "Repairs"],
                    ["ðŸŒ", "Web Design"],
                    ["ðŸ“¡", "Networking"],
                    ["ðŸ“¹", "CCTV"],
                    ["âš™ï¸", "IT Support"],
                  ].map(([icon, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-border bg-background p-4 transition-transform hover:-translate-y-1"
                    >
                      <div className="text-2xl">{icon}</div>

                      <p className="mt-3 text-sm font-semibold">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-primary p-5 text-primary-foreground">
                  <p className="text-sm font-semibold">
                    Need a technology solution?
                  </p>

                  <p className="mt-1 text-xs text-primary-foreground/70">
                    Talk to SAMSOJ today and let&apos;s find the right solution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section id="services">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              What we do
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Technology services built around your needs
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              From computer sales and repairs to networking, security, and web
              design, we provide practical technology solutions designed around
              your needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} interactive>
                <CardContent className="p-6">
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                    {service.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {service.description}
                  </p>

                  <a
                    href="#enquire"
                    className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:underline"
                  >
                    {service.action} â†’
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="bg-muted/30">
        <Container>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                Products
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Technology equipment for every need
              </h2>

              <p className="mt-4 leading-7 text-muted-foreground">
                Tell us what you need and we can help you find the right
                equipment for your budget and purpose.
              </p>
            </div>

            <a href="#enquire">
              <Button variant="outline">Request a product</Button>
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} interactive className="overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">{product.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <a href="#enquire" className="flex-1">
                      <Button className="w-full">Enquire Now</Button>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="whatsapp" className="w-full">
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* WHY SAMSOJ */}
      <Section id="why-samsoj">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Why SAMSOJ
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              A simple, dependable technology experience
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              We combine practical technology knowledge with responsive
              customer support to help you get the solution you actually need.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Card key={reason.title}>
                <CardContent className="p-6">
                  <div className="mb-5 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  <h3 className="font-semibold">{reason.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CONTACT / ENQUIRY */}
      <Section id="enquire" className="bg-primary text-primary-foreground">
        <Container>
          <div
            id="contact"
            className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">
                Get in touch
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Have a technology need? Let&apos;s talk.
              </h2>

              <p className="mt-4 text-primary-foreground/70">
                Tell SAMSOJ what you need. Complete the quick enquiry form and
                we&apos;ll prepare your enquiry for WhatsApp.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 text-sm font-semibold transition hover:bg-primary-foreground/15"
                >
                  <span className="text-xl">ðŸ’¬</span>
                  Chat directly on WhatsApp
                </a>

                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  <span>âœ‰ï¸</span>
                  {business.email}
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-primary-foreground/15 bg-background p-5 text-foreground shadow-2xl sm:p-7"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                  Make an enquiry
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Tell us what you need
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your enquiry will be prepared for WhatsApp so you can send it
                  directly to SAMSOJ.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone / WhatsApp *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="080..."
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="need" className="text-sm font-medium">
                    What do you need? *
                  </label>

                  <select
                    id="need"
                    name="need"
                    value={form.need}
                    onChange={handleChange}
                    required
                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select an option</option>

                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="text-sm font-medium">
                  Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us more about what you need..."
                  className="mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:flex-1"
                >
                  Send Enquiry on WhatsApp
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    type="button"
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                  >
                    WhatsApp
                  </Button>
                </a>
              </div>
            </form>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <Container className="py-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
                  S
                </div>

                <div>
                  <p className="font-bold tracking-tight">SAMSOJ</p>

                  <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Computer Enterprise
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
                Reliable technology solutions for businesses and everyday
                needs â€” including computer sales, repairs, networking, CCTV,
                IT support, and professional web design.
              </p>

              <div className="mt-5 flex flex-col gap-2 text-sm">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  WhatsApp: {business.whatsApp}
                </a>

                <a
                  href={`mailto:${business.email}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {business.email}
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Quick Links</h3>

              <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <a href="#services" className="hover:text-foreground">
                  Services
                </a>

                <a href="#products" className="hover:text-foreground">
                  Products
                </a>

                <a href="#why-samsoj" className="hover:text-foreground">
                  Why SAMSOJ
                </a>

                <a href="#enquire" className="hover:text-foreground">
                  Make an Enquiry
                </a>
              </nav>
            </div>

            <div>
              <h3 className="font-semibold">Our Services</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
                <span>Computer Sales</span>
                <span>Repairs & Support</span>
                <span>Web Design</span>
                <span>Networking</span>
                <span>CCTV & Security</span>
                <span>IT Solutions</span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>
              Â© {new Date().getFullYear()} SAMSOJ COMPUTER ENTERPRISE. All
              rights reserved.
            </p>

            <p>Technology solutions you can rely on.</p>
          </div>
        </Container>
      </footer>
    </main>
  );
}
