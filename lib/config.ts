export const business = {
  name: "SAMSOJ COMPUTER ENTERPRISE",
  shortName: "SAMSOJ",
  tagline: "Technology Solutions You Can Rely On",
  description:
    "Your trusted technology partner for IT equipment sales, computer repairs & maintenance, networking solutions, CCTV & security systems, POS equipment, and professional web design.",
  
  // Official Contact Channels
  whatsApp: "08079570725",
  whatsAppInternational: "2348079570725",
  phone: "08079570725",
  phoneDisplay: "+234 807 957 0725",
  email: "samsojcomputerenterprise@gmail.com",
  
  // Location & Operations
  country: "Nigeria",
  currency: "NGN",
  currencySymbol: "₦",
  hours: "Monday - Saturday: 8:00 AM - 6:00 PM",
  serviceAvailability: "24/7 Online & WhatsApp Enquiry Access",
  
  // Services List
  services: [
    {
      id: "computer-sales",
      title: "Computer & Laptop Sales",
      icon: "💻",
      description:
        "High-performance brand-new and certified desktop computers, laptops, and workstations tailored for office, school, and professional use.",
      action: "Explore Computers",
    },
    {
      id: "repairs-maintenance",
      title: "Repairs & Technical Support",
      icon: "🔧",
      description:
        "Expert hardware diagnostics, component replacements, OS installation, virus removal, thermal maintenance, and routine servicing.",
      action: "Book a Repair",
    },
    {
      id: "web-development",
      title: "Web Design & Development",
      icon: "🌐",
      description:
        "Modern, responsive, fast, and secure websites and business web applications built to scale your business presence online.",
      action: "Discuss Website Project",
    },
    {
      id: "networking-solutions",
      title: "Networking & Structured Cabling",
      icon: "📡",
      description:
        "LAN/WAN network design, Wi-Fi access point deployment, router/switch configuration, server racks, and structured cabling for homes and offices.",
      action: "Plan Network Setup",
    },
    {
      id: "cctv-security",
      title: "CCTV & Security Surveillance",
      icon: "📹",
      description:
        "High-definition IP cameras, DVR/NVR surveillance setup, remote mobile monitoring, and security technology solutions for properties.",
      action: "Get Security Quote",
    },
    {
      id: "pos-it-solutions",
      title: "POS Systems & IT Solutions",
      icon: "⚙️",
      description:
        "Point-of-sale hardware, barcode scanners, receipt printers, and customized IT infrastructure for retail, supermarkets, and enterprises.",
      action: "Consult on IT Setup",
    },
  ],
  
  // Value propositions
  reasons: [
    {
      title: "Authentic & Verified Equipment",
      description:
        "We source genuine, tested IT hardware and accessories with verified specifications so you invest with confidence.",
    },
    {
      title: "Certified Technical Expertise",
      description:
        "Our technician team delivers accurate diagnostics, careful component handling, and swift turnaround times on all repairs.",
    },
    {
      title: "Rapid Customer Support",
      description:
        "Direct communication via WhatsApp and Email ensures fast quotations, prompt answers, and post-sale technical assistance.",
    },
    {
      title: "Tailored Business Packages",
      description:
        "From small office setups to enterprise network deployments, we design custom technology solutions that fit your budget.",
    },
  ],
} as const;

export type Business = typeof business;
