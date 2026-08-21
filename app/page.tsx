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
    icon: "💻",
    title: "Computer Sales",
    description:
      "Get reliable computers and IT equipment suitable for personal, educational, and business needs.",
    action: "Explore our products",
  },
  {
    icon: "🔧",
    title: "Repairs & Support",
    description:
      "Reliable technical assistance for computer faults, software issues, maintenance, and troubleshooting.",
    action: "Request technical support",
  },
  {
    icon: "🌐",
    title: "Web Design & Development",
    description:
      "Professional, responsive websites designed to help businesses, organisations, and individuals establish a strong online presence.",
    action: "Discuss your website",
  },
  {
    icon: "📡",
    title: "Networking Solutions",
    description:
      "Networking equipment and installation solutions designed for reliable connectivity at home, school, and business.",
    action: "Discuss your network",
  },
  {
    icon: "📹",
    title: "CCTV & Security",
    description:
      "Practical CCTV and security technology solutions to help protect homes, offices, shops, and organisations.",
    action: "Enquire about security",
  },
  {
    icon: "⚙️",
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

export default function Home() {
  return (
    <main>
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              S
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-tight text-foreground">
                SAMSOJ
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Computer Enterprise
              </p>
            </div>
          </a>

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
        </Container>
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
                    ["💻", "Computers"],
                    ["🔧", "Repairs"],
                    ["🌐", "Web Design"],
                    ["📡", "Networking"],
                    ["📹", "CCTV"],
                    ["⚙️", "IT Support"],
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
                    {service.action} →
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
                      <Button
                        variant="whatsapp"
                        className="w-full"
                      >
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
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-300">
                Get in touch
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Have a technology need? Let&apos;s talk.
              </h2>

              <p className="mt-4 text-primary-foreground/70">
                Contact SAMSOJ COMPUTER ENTERPRISE through WhatsApp or email
                and tell us what you need. We&apos;ll be happy to help.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
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

              <a
                href={`mailto:${business.email}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
                >
                  Send us an email
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}