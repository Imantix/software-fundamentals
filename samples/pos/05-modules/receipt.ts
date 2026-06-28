// receipt.ts — MODULE: turning an order into printed text. Presentation only.
// ----------------------------------------------------------------------------
// "How it looks" is a separate reason to change than "how it's totalled", so it
// gets its own module. It depends on Order's public surface (read-only), never
// on its private internals.

import type { Order } from "./order.ts";

function money(amount: number): string {
  return "$" + amount.toFixed(2);
}

export function renderReceipt(order: Order): string {
  const lines: string[] = ["── ☕ Corner Coffee ──"];
  for (const line of order.lines) {
    const lineTotal = line.product.price * line.qty;
    lines.push(`${line.qty}x ${line.product.name.padEnd(12)} ${money(lineTotal)}`);
  }
  lines.push("".padEnd(22, "-"));
  lines.push(`Subtotal ${money(order.subtotal)}`);
  lines.push(`Tax      ${money(order.tax)}`);
  lines.push(`TOTAL    ${money(order.total)}`);
  return lines.join("\n");
}
