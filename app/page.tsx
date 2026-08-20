import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { business } from "@/lib/config";

const whatsappNumber = business.whatsApp
  .replace(/\D/g, "")
  .replace(/^0/, "234");

const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export default function Home() {
  return (
    <main>
      <section className="border-b border-border bg-background">
        <Container className="flex min-h-[60vh] items-center py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              SAMSOJ COMPUTER ENTERPRISE
            </p>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Reliable technology solutions for your business and everyday needs.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Explore IT equipment, computer services, repairs, and networking
              solutions from SAMSOJ COMPUTER ENTERPRISE.
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
          </div>
        </Container>
      </section>

      <Section id="services">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              What we do
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              Technology services built around your needs
            </h2>

            <p className="mt-4 text-muted-foreground">
              From computer sales and repairs to networking and web design, we provide practical technology solutions designed around your needs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {[
    {
      title: "Computer Sales",
      description:
        "Get computers and IT equipment suitable for personal, educational, and business needs.",
      action: "Enquire about products",
    },
    {
      title: "Repairs & Support",
      description:
        "Get reliable technical assistance for computer faults, software issues, maintenance, and troubleshooting.",
      action: "Request technical support",
    },
    {
  title: "Web Design & Development",
  description:
    "Professional, responsive websites designed to help businesses, organisations, and individuals establish a strong online presence.",
  action: "Discuss your website",
},
  ].map((service) => (
    <Card key={service.title} interactive>
      <CardContent className="p-6">
        <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-lg font-bold">
            {service.title.charAt(0)}
          </span>
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
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Laptops & Computers",
          description:
            "Reliable laptops, desktop computers, and systems for work, school, business, and everyday use.",
        },
        {
          title: "Computer Accessories",
          description:
            "Keyboards, mice, flash drives, storage devices, chargers, cables, and other essential accessories.",
        },
        {
          title: "Printers & Office Equipment",
          description:
            "Practical printing and office technology solutions for homes, businesses, and organisations.",
        },
        {
          title: "Networking Equipment",
          description:
            "Routers, switches, cables, and networking equipment for reliable connectivity.",
        },
        {
          title: "Storage & Components",
          description:
            "Storage devices, memory, replacement components, and other computer hardware.",
        },
        {
          title: "IT Solutions",
          description:
            "Technology solutions tailored to your specific business, personal, or organisational needs.",
        },
      ].map((product) => (
        <Card key={product.title} interactive>
          <CardContent className="p-6">
            <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">
                {product.title.charAt(0)}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              {product.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {product.description}
            </p>

            <a
              href="#enquire"
              className="mt-5 inline-flex text-sm font-semibold text-accent transition-colors hover:underline"
            >
              Enquire about this →
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  </Container>
</Section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Why SAMSOJ
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              A simple, dependable technology experience
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Quality Products",
              "Expert Repairs",
              "Reliable Support",
              "Networking Solutions",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{item}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Designed to support customers with practical technology
                    solutions.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="enquire" className="bg-primary text-primary-foreground">
        <Container>
          <div
            id="contact"
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-400">
                Get in touch
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Have a technology need? Let&apos;s talk.
              </h2>

              <p className="mt-4 text-primary-foreground/70">
                Contact SAMSOJ COMPUTER ENTERPRISE through WhatsApp or email
                for your enquiry.
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
                  className="w-full sm:w-auto"
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
