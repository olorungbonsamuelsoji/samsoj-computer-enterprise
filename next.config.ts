import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "ssl-product-images.www8-hp.com" },
      { protocol: "https", hostname: "*.hp.com" },
      { protocol: "https", hostname: "i.dell.com" },
      { protocol: "https", hostname: "*.dell.com" },
      { protocol: "https", hostname: "p1.lencnd.com" },
      { protocol: "https", hostname: "*.lenovo.com" },
      { protocol: "https", hostname: "static.tp-link.com" },
      { protocol: "https", hostname: "*.tp-link.com" },
      { protocol: "https", hostname: "resource.logitech.com" },
      { protocol: "https", hostname: "*.logitech.com" },
      { protocol: "https", hostname: "images.samsung.com" },
      { protocol: "https", hostname: "*.samsung.com" },
      { protocol: "https", hostname: "media.canon.com" },
      { protocol: "https", hostname: "*.canon-europe.com" },
      { protocol: "https", hostname: "*.canon.com" },
      { protocol: "https", hostname: "*.seagate.com" },
      { protocol: "https", hostname: "*.westerndigital.com" },
      { protocol: "https", hostname: "*.hikvision.com" },
      { protocol: "https", hostname: "*.zkteco.com" },
      { protocol: "https", hostname: "*.tendacn.com" },
      { protocol: "https", hostname: "*.kingston.com" },
      { protocol: "https", hostname: "*.sandisk.com" },
    ],
  },
};

export default nextConfig;
