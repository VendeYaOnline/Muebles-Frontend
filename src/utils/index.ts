import Muebles from "/public/muebles.jpg";
import Camas from "/public/camas.webp";
import Comedores from "/public/comedores.jpg";
import Televisores from "/public/televisores.jpeg";

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
