# SAMSOJ COMPUTER ENTERPRISE — PROJECT SETTINGS & CONFIGURATION MASTER

This document is the official, comprehensive project reference and configuration master for **SAMSOJ COMPUTER ENTERPRISE**. It captures all business settings, contact channels, page architecture, product catalogue records, real image integrations, admin access, and technical details.

---

## 1. Official Business Identity & Contact Channels

| Setting | Configured Value | Primary Code Location |
|---|---|---|
| **Business Name** | `SAMSOJ COMPUTER ENTERPRISE` | `lib/config.ts` |
| **Short Brand / Logo Name** | `SAMSOJ` | `lib/config.ts`, `components/layout/header.tsx` |
| **Tagline** | `Technology Solutions You Can Rely On` | `lib/config.ts` |
| **Primary WhatsApp (Major Communication)** | `08079570725` (Intl: `2348079570725`) | `lib/config.ts`, `lib/whatsapp.ts` |
| **Direct Phone** | `08079570725` / `+234 807 957 0725` | `lib/config.ts` |
| **Business Email** | `samsojcomputerenterprise@gmail.com` | `lib/config.ts`, `app/api/enquiry/route.ts` |
| **Country / Currency** | Nigeria / NGN (`₦`) | `lib/config.ts` |
| **Business Hours** | Mon – Sat: 8:00 AM – 6:00 PM (WhatsApp 24/7) | `lib/config.ts` |
| **Physical Address** | Nigeria (Available on request via WhatsApp/Phone) | `lib/config.ts` |

---

## 2. Website Page Architecture & Navigation

The website consists of **5 dedicated, distinct pages**:

```
SAMSOJ COMPUTER ENTERPRISE Website
├── 1. 🏠 Homepage (/)                      — Comprehensive Business Overview, Services Hub, Featured Products Showcase
├── 2. 🛠️ Computer Maintenance (/maintenance) — Dedicated OS Setup, Repairs, Upgrades, Formatting, Diagnostics
├── 3. 🛒 Products (/products)               — 8-Category Catalogue, Real Product Images, Search, Modal Specs View
├── 4. 💰 Pricing (/pricing)                 — Transparent Service Tier Packages & Hardware Pricing Calculator
└── 5. 📞 Contact & Enquire (/contact)        — Combined Contact Channel, Instant WhatsApp Bridge, Quote Generator
```

---

## 3. Synchronized Single-Record Product Catalogue (26 Products)

> **Architectural Principle**: `ONE PRODUCT RECORD = ONE PRODUCT IMAGE + ONE SET OF ACCURATE DETAILS + ONE PRICE/AVAILABILITY RECORD`  
> Data Source: `data/products.json` $\rightarrow$ `/api/products` $\rightarrow$ Powers Homepage, Products Catalogue, Search, Detail Modal, WhatsApp links, and Admin CMS.

### 8 Product Categories
1. **All Products 💻** (`all`)
2. **Laptops & Computers 🖥️** (`laptops-computers`)
3. **Printers & Scanners 🖨️** (`printers-scanners`)
4. **Networking 📡** (`networking`)
5. **Storage & Hardware 💾** (`storage-hardware`)
6. **CCTV & Security 📹** (`cctv-security`)
7. **POS Systems 🧾** (`pos-equipment`)
8. **Accessories 🖱️** (`accessories`)

### Full Catalogue Master Table

| SKU / ID | Product Name | Brand | Model | Category | Price (₦) | Status | Real Image Source |
|---|---|---|---|---|---|---|---|
| `HP-EB840G6-01` | HP EliteBook 840 G6 Business Laptop | HP | 840 G6 | Laptops & Computers | ₦395,000 | In Stock | HP Official CDN |
| `DELL-LAT7490-02` | Dell Latitude 7490 Business Notebook | Dell | Latitude 7490 | Laptops & Computers | ₦420,000 | In Stock | Dell Official CDN |
| `LEN-TPT14G1-03` | Lenovo ThinkPad T14 Gen 1 Laptop | Lenovo | ThinkPad T14 Gen 1 | Laptops & Computers | Contact | On Request | Lenovo Official CDN |
| `SAMSOJ-WSi7-04` | SAMSOJ Core i7 Desktop Workstation PC | SAMSOJ | WORKSTATION-i7-10700 | Laptops & Computers | Starting ₦280,000 | In Stock | *Pending Business Photo* |
| `DELL-OPT3060-23` | Dell OptiPlex 3060 Micro Core i5 Desktop | Dell | OptiPlex 3060 Micro | Laptops & Computers | ₦185,000 | Limited Stock | Dell Official CDN |
| `CAN-G3411-05` | Canon PIXMA G3411 Wireless MegaTank Printer | Canon | PIXMA G3411 | Printers & Scanners | ₦210,000 | In Stock | Canon Europe CDN |
| `HP-M404DN-06` | HP LaserJet Pro M404dn Monochrome Laser | HP | LaserJet Pro M404dn | Printers & Scanners | ₦315,000 | In Stock | HP Official CDN |
| `HP-DJ2720E-17` | HP DeskJet 2720e All-In-One Inkjet Printer | HP | DeskJet 2720e | Printers & Scanners | ₦75,000 | In Stock | HP Official CDN |
| `TPL-WR841N-07` | TP-Link TL-WR841N 300Mbps Wireless Router | TP-Link | TL-WR841N | Networking | ₦18,500 | In Stock | TP-Link Official CDN |
| `TPL-DECOM4-08` | TP-Link Deco M4 Mesh Wi-Fi System (2-Pack) | TP-Link | Deco M4 | Networking | ₦85,000 | In Stock | TP-Link Official CDN |
| `TEN-F3-09` | Tenda F3 300Mbps Wireless Router | Tenda | F3 | Networking | ₦16,000 | In Stock | Tenda Official CDN |
| `TPL-SG108-18` | TP-Link TL-SG108 8-Port Gigabit Switch | TP-Link | TL-SG108 | Networking | ₦22,000 | In Stock | TP-Link Official CDN |
| `SEA-EXP1TB-10` | Seagate Expansion 1TB USB 3.0 External HDD | Seagate | STEA1000400 | Storage & Hardware | ₦42,000 | In Stock | Seagate Official CDN |
| `SAM-970EVOP-11` | Samsung 970 EVO Plus 500GB NVMe M.2 SSD | Samsung | MZ-V7S500BW | Storage & Hardware | ₦58,000 | In Stock | Samsung Official CDN |
| `SAN-ULTRA128-19` | SanDisk Ultra 128GB USB 3.0 Flash Drive | SanDisk | SDCZ48-128G | Storage & Hardware | ₦12,500 | In Stock | Western Digital CDN |
| `KIN-DDR4-8GB-20` | Kingston ValueRAM 8GB DDR4 SODIMM RAM | Kingston | KVR26S19S6/8 | Storage & Hardware | ₦28,000 | In Stock | Kingston Official CDN |
| `HIK-DOM2MP-12` | Hikvision DS-2CE56D0T-IRPF 1080P Dome | Hikvision | DS-2CE56D0T-IRPF | CCTV & Security | ₦14,500 | In Stock | Hikvision Official CDN |
| `HIK-KIT4CH-13` | Hikvision 4-Channel Turbo HD CCTV Kit | Hikvision | DS-7204HGHI-K1 Kit | CCTV & Security | Contact | Enquire | Hikvision Official CDN |
| `HIK-IP4MP-21` | Hikvision DS-2CD2143G2-I 4MP Outdoor Dome | Hikvision | DS-2CD2143G2-I | CCTV & Security | Contact | Enquire | Hikvision Official CDN |
| `SAMSOJ-POS15-14` | SAMSOJ All-In-One Touchscreen POS System | SAMSOJ | POS-TOUCH-156 | POS Systems | Starting ₦380,000 | In Stock | *Pending Business Photo* |
| `ZKT-SCAN050-15` | ZKTeco ZK-D050 Handheld Barcode Scanner | ZKTeco | ZK-D050 | POS Systems | ₦28,500 | In Stock | ZKTeco Official CDN |
| `SAMSOJ-THERM80-22` | SAMSOJ 80mm USB Thermal POS Receipt Printer | SAMSOJ | THERMAL-80-USB | POS Systems | ₦48,000 | In Stock | *Pending Business Photo* |
| `LOG-MK270-16` | Logitech MK270 Wireless Keyboard & Mouse | Logitech | MK270 | Accessories | ₦24,500 | In Stock | Logitech Official CDN |
| `HP-MOUSE100-24` | HP 100 Series Wired USB Optical Mouse | HP | HP 100 Wired Mouse | Accessories | ₦4,500 | In Stock | HP Official CDN |
| `SAMSOJ-UPS850-25` | SAMSOJ 850VA UPS Battery Backup | SAMSOJ | UPS-850VA | Accessories | Starting ₦38,000 | In Stock | *Pending Business Photo* |

---

## 4. Admin Management Dashboard

- **Admin URL**: `http://localhost:3000/admin` (or `https://your-domain.com/admin`)
- **Admin Passkey**: `samsoj2026!`
- **What You Can Manage in Admin Panel**:
  - **Products**: Add new products, update prices, change stock status, update direct image URLs (`imageUrl`), edit specifications, update manufacturer datasheet links.
  - **Services**: Edit service descriptions, pricing, and maintenance items.
  - **Enquiries**: View and manage customer submissions.
  - **Settings**: Change business phone, email, and notification settings.
  - **Backups**: Download or restore JSON data backups.

---

## 5. Communication & Automated WhatsApp Routing

1. **Direct WhatsApp Links**: Every product, service package, maintenance item, and quote calculation generates an instant pre-filled WhatsApp message directed to `08079570725`.
2. **Email $\rightarrow$ WhatsApp 1-Click Bridge**: When a customer submits an email form, the owner receives an email with an immediate **`[💬 Reply to Customer on WhatsApp]`** button that opens WhatsApp with that customer instantly.
3. **AI Customer Assistant**: Embedded across all pages to guide visitors, answer common computer questions, and escalate to human WhatsApp support.

---

## 6. How to Update Settings & Assets in the Future

| Task | Where to Update |
|---|---|
| **Change phone, email, brand name** | Update in `/admin/settings` or in `lib/config.ts` |
| **Change product prices or availability** | Update in `/admin/products` (instant site-wide sync) |
| **Replace or add product photos** | In `/admin/products`, enter new image link in `Direct Product Image URL` or place file in `/public/products/` |
| **Add new products** | In `/admin/products` $\rightarrow$ click "+ Add Product" |
| **Edit maintenance services** | In `/admin/services` or `data/services.json` |

---

*Last Updated: August 2026 — Verified & Stored in Project Master Files.*
