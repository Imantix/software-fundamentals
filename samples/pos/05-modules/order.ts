// order.ts — MODULE: the rules of an order (items, validation, totals).
// ----------------------------------------------------------------------------
// Imports the Product shape from menu.ts, but knows nothing about formatting.
// The tax rate is private to this module — other files physically cannot depend
// on it, so it's safe to change.

import type { Product } from "./menu.ts";

const TAX_RATE = 0.08; // private to this module

export type OrderLine = { product: Product; qty: number };

export class Order {
  #lines: OrderLine[] = [];

  add(product: Product, qty: number): void {
    if (qty <= 0) throw new Error("Quantity must be positive");
    this.#lines.push({ product, qty });
  }

  get subtotal(): number {
    let sum = 0;
    for (const line of this.#lines) sum += line.product.price * line.qty;
    return sum;
  }

  get tax(): number {
    return this.subtotal * TAX_RATE;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  get lines(): readonly OrderLine[] {
    return this.#lines;
  }
}
