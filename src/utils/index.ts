import Muebles from "/public/muebles.jpg";
import Camas from "/public/camas.webp";
import Comedores from "/public/comedores.jpg";
import Televisores from "/public/televisores.jpeg";
import { IProduct } from "@/interfaces";

export const featured = [
  {
    name: "Muebles de sala",
    img: Muebles,
  },
  {
    name: "Televisores",
    img: Televisores,
  },
  {
    name: "Camas",
    img: Camas,
  },
  {
    name: "Comedores",
    img: Comedores,
  },
];

export const calculateTotal = (price: string, amount: number) => {
  // Extraer el valor numérico del string y eliminar caracteres no numéricos como $ y .
  const precioNumerico = parseFloat(price.replace(/[^\d]/g, ""));

  // Multiplicar el precio por la cantidad
  const total = precioNumerico * amount;

  // Convertir de vuelta al formato original
  const totalFormateado = `$ ${total.toLocaleString("es-CO")}`;

  return totalFormateado;
};

interface ProductWithQuantity {
  quantity: number;
  product: IProduct;
  variant: string; // Propiedad para identificar la variante, como "color".
}

export const totalSum = (products: ProductWithQuantity[]) => {
  let total = 0;

  products.forEach(({ product, quantity }) => {
    // Extraer el valor numérico del string y eliminar caracteres no numéricos como $ y .
    const precioNumerico = parseFloat(
      product.discount_price
        ? product.discount_price.replace(/[^\d]/g, "")
        : product.price.replace(/[^\d]/g, "")
    );

    // Multiplicar el precio por la cantidad
    total += precioNumerico * quantity;
  });

  return `$ ${total.toLocaleString("es-CO")}`;
};
