"use client";
import { Banner, Category, FeaturedProducts, Footer } from "@/components";

export default function TiendaElegante() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <Category />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
