// menu.ts — MODULE: what the shop sells. The product catalog, and nothing else.
// ----------------------------------------------------------------------------
// A module is a namespace: only the exports are visible outside. The MENU data
// and the Product shape live here; how an order is totalled is NOT this file's
// job (that's order.ts), and how it's printed isn't either (receipt.ts).

export type Product = {
  sku: string;
  name: string;
  price: number;
};

// The single source of truth for prices. Change a price here, everywhere follows.
export const MENU: Record<string, Product> = {
  LATTE: { sku: "LATTE", name: "Latte", price: 4.5 },
  MUFFIN: { sku: "MUFFIN", name: "Muffin", price: 3.0 },
  COOKIE: { sku: "COOKIE", name: "Cookie", price: 2.25 },
  DRIP: { sku: "DRIP", name: "Drip Coffee", price: 2.0 },
};
