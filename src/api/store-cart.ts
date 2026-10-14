import { axiosConfig } from "./config";

/** Identificador estable del carrito de este navegador (recordatorio de carrito abandonado). */
const cartToken = (): string => {
  const KEY = "mem:cart-token";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return saved;
    const token = crypto.randomUUID();
    localStorage.setItem(KEY, token);
    return token;
  } catch {
    return crypto.randomUUID();
  }
};

/**
 * Guarda el carrito en progreso cuando el comprador llena sus datos, para que
 * la tienda pueda recordárselo si no termina la compra (carritos abandonados
 * en el panel). No bloquea ni rompe el checkout si falla.
 */
export const saveStoreCart = (
  user: { first_name: string; last_name: string; phone: string; email: string; id_number: string },
  products: { product: { id?: string | number }; quantity: number }[],
) => {
  axiosConfig
    .post("/save-store-cart", {
      token: cartToken(),
      customer: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        id_number: user.id_number,
      },
      // Solo ids y cantidades: el backend toma los precios del catálogo.
      products: products.map((item) => ({ id: String(item.product.id ?? ""), quantity: item.quantity })),
    })
    .catch(() => {});
};
