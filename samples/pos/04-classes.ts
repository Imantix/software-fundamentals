// ============================================================================
// STAGE 4 — CLASSES  ☕
// ----------------------------------------------------------------------------
// Pain from stage 3: the order was a loose array. Anyone could push a
// {qty: -5} item and quietly corrupt every total. The data had no guardian.
//
// A class bundles the order's data with the rules that protect it — and the
// language enforces those rules (a `#private` list nobody outside can touch).
// ============================================================================

type LineItem = { name: string; price: number; qty: number };

class Order {
  // The line items are PRIVATE. The only way in is addItem(), which validates.
  // No caller can sneak a negative quantity past us.
  #items: LineItem[] = [];

  readonly taxRate: number;

  constructor(taxRate: number = 0.08) {
    this.taxRate = taxRate;
  }

  addItem(name: string, price: number, qty: number): void {
    if (price < 0) throw new Error("Price cannot be negative");
    if (qty <= 0) throw new Error("Quantity must be positive");
    this.#items.push({ name, price, qty });
  }

  get subtotal(): number {
    let sum = 0;
    for (const item of this.#items) sum += item.price * item.qty;
    return sum;
  }

  get tax(): number {
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  // A read-only snapshot for printing — callers can't mutate our list.
  get lines(): readonly LineItem[] {
    return this.#items;
  }
}

const order = new Order();
order.addItem("Latte", 4.5, 2);
order.addItem("Muffin", 3.0, 1);
order.addItem("Cookie", 2.25, 3);

for (const item of order.lines) {
  console.log(`${item.qty}x ${item.name.padEnd(7)} $${(item.price * item.qty).toFixed(2)}`);
}
console.log("Subtotal: $" + order.subtotal.toFixed(2));
console.log("Tax:      $" + order.tax.toFixed(2));
console.log("TOTAL:    $" + order.total.toFixed(2));

// The guard cannot be bypassed:
try {
  order.addItem("Refund hack", 5, -10); // negative qty
} catch (err) {
  console.log("Blocked:", (err as Error).message); // "Quantity must be positive"
}

// ============================================================================
// WHAT CLASSES BOUGHT US
//
//  • ENCAPSULATION (enforced): #items is unreachable; the only door is
//    addItem(), which validates. Corrupt orders become impossible.
//  • COHESION: the order's data and its totalling rules live together.
//  • DOMAIN VOCABULARY: order.addItem(...), order.total — reads like a till.
//  • MANY INSTANCES: every customer gets their own independent Order.
//
// REMAINING PAIN: everything's in one file — Order, and soon Product, Receipt,
// Payment, Inventory... Pile them here and it becomes unnavigable, with names
// starting to collide. Stage 5 (modules) splits the growing codebase up.
// ============================================================================

// ── Try it ──
// Uncomment — the language refuses to let you reach inside:
//   order.#items.push({ name: "free", price: 0, qty: 999 }); // SyntaxError
