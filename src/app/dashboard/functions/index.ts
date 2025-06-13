import { TpeValue, ValuesAttributes } from "../interfaces";

export const attributes = [
  {
    id: 1,
    name: "Color",
  },

  {
    id: 2,
    name: "Talla",
  },

  {
    id: 3,
    name: "Peso",
  },
  {
    id: 4,
    name: "Dimensión",
  },

  {
    id: 5,
    name: "Mililitro",
  },
  {
    id: 6,
    name: "Género",
  },
];

export const roles = [
  {
    id: 1,
    name: "Editor",
  },

  {
    id: 2,
    name: "Espectador",
  },
];

export const nameKey = (type: string) => {
  switch (type) {
    case "Color":
      return "color";

    case "Talla":
      return "size";

    case "Peso":
      return "weight";

    case "Dimensión":
      return "dimension";
    case "Mililitro":
      return "mililitir";

    case "Género":
      return "gender";
    default:
      return "";
  }
};

export const dataGenders = [
  {
    id: 1,
    gender: "Masculino",
  },
  {
    id: 2,
    gender: "Femenino",
  },
  {
    id: 3,
    gender: "Hombre",
  },
  {
    id: 4,
    gender: "Mujer",
  },
  {
    id: 5,
    gender: "Niño",
  },
  {
    id: 6,
    gender: "Niña",
  },
];

export function convertCurrencyToNumber(currency: string): number {
  // Remove the dollar sign and any spaces
  const sanitized = currency.replace(/[$\s]/g, "");

  // Replace dots with empty strings to handle thousand separators
  const numericString = sanitized.replace(/\./g, "");

  // Parse the resulting string into a number
  const numericValue = parseInt(numericString, 10);

  // Return the numeric value
  return numericValue;
}

export const getContrastingColor = (hexColor: string) => {
  // Convertir el color hex a valores RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calcular la luminancia relativa
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  // Si la luminancia es mayor que 128, el color es claro, si no, es oscuro
  return luminance > 128 ? "#000000" : "#FFFFFF";
};

export function convertPrice(value: string) {
  // Paso 1: Eliminar cualquier carácter que no sea un dígito
  const numericValue = value.replace(/\D/g, "");

  // Paso 2: Verificar si el campo está vacío
  if (!numericValue) {
    return ""; // Retornar cadena vacía si no hay números
  }

  // Paso 3: Convertir a número
  const numberValue = parseInt(numericValue, 10);

  // Paso 4: Formatear en pesos colombianos
  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(numberValue);

  return formattedValue; // Retorna el valor en formato "COP 10.000"
}

export function convertPriceDiscount(value: string, discount: number) {
  // Paso 1: Eliminar cualquier carácter que no sea un dígito
  const numericValue = value.replace(/\D/g, "");

  // Paso 2: Verificar si el campo está vacío
  if (!numericValue) {
    return ""; // Retornar cadena vacía si no hay números
  }

  // Paso 3: Convertir a número
  const numberValue = parseInt(numericValue, 10);

  // Paso 4: Aplicar el descuento
  const discountedValue = numberValue * (1 - discount / 100);

  // Paso 5: Formatear en pesos colombianos
  const formattedValue = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(Math.round(discountedValue));

  return formattedValue; // Retorna el valor con descuento en formato "COP 10.000"
}

export function calculatePageAfterDeletion(
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) {
  const totalPagesAfterDeletion = Math.ceil(totalItems / itemsPerPage);
  // Si la página actual ya no existe (por ejemplo eliminaste el único ítem de la última)
  return Math.min(currentPage, totalPagesAfterDeletion);
}

export function menuAttribute(objeto: ValuesAttributes) {
  return Object.keys(objeto)
    .filter((propiedad) => objeto[propiedad as TpeValue].length > 0)
    .map((propiedad) => ({ text: propiedad }));
}

export const getRole = (role: string) => {
  switch (role) {
    case "editor":
      return "Editor";

    case "viewer":
      return "Espectador";

    case "admin":
      return "Administrador";

    default:
      return "viewer";
  }
};

export function formatDate(date: Date) {
  // Convertir la fecha a un objeto Date (en caso de que no lo sea)
  const d = new Date(date);

  // Verificar si la fecha es válida
  if (isNaN(d.getTime())) {
    throw new Error("Fecha no válida");
  }

  // Extraer día, mes y año
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = d.getFullYear();

  // Formatear en DD/MM/YYYY
  return `${day}/${month}/${year}`;
}
