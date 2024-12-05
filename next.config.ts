import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "muebles-electrodomesticos-del-meta-tvy0g5xm53zbkhw.s3.us-east-2.amazonaws.com",
        port: "", // Deja vacío para HTTPS estándar
        pathname: "/**", // Permite cualquier ruta dentro del bucket
      },
    ],
  },
};

export default nextConfig;
