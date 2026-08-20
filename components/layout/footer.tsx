import { business } from "@/lib/config";
import { Container } from "@/components/ui/container";

const whatsappNumber = business.whatsApp.replace(/\D/g, "").replace(/^0/, "234");
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4">
              <p className="font-bold tracking-tight">SAMSOJ</p>
              <p className="text-xs tracking-[0.12em] text-primary-foreground/60">
                COMPUTER ENTERPRISE
              </p>
            </div>

            <p className="max-w-xs text-sm leading-6 text-primary-foreground/70">
              IT equipment sales, services, repairs, and networking solutions.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Quick Links</h2>

            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              <a
                href="#products"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                Products
              </a>
              <a
                href="#services"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                Contact
              </a>
              <a
                href="#enquire"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                Enquire
              </a>
            </nav>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Contact</h2>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                WhatsApp: {business.whatsApp}
              </a>

              <a
                href={`mailto:${business.email}`}
                className="break-all text-sm text-primary-foreground/70 transition-colors hover:text-accent"
              >
                {business.email}
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-semibold">Stay Connected</h2>

            <p className="mb-4 text-sm leading-6 text-primary-foreground/70">
              Have a question or need technical assistance? Get in touch with
              our team.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-md bg-whatsapp px-4 text-sm font-medium text-whatsapp-foreground transition-colors hover:bg-whatsapp/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6">
          <p className="text-center text-sm text-primary-foreground/60">
            © {year} {business.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
