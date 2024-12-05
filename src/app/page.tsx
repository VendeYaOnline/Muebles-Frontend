"use client";
import {
  Banner,
  Category,
  FeaturedProducts,
  Footer,
  NavBar,
} from "@/components";

export default function TiendaElegante() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <Banner />
      <Category />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
