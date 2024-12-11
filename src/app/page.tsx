"use client";
import {
  Banner,
  CategoriesGrid,
  Category,
  FeaturedProducts,
  Services,
} from "@/components";

export default function TiendaElegante() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Banner />
      <Services />
      <Category />
      <CategoriesGrid />
      <FeaturedProducts />
    </div>
  );
}
