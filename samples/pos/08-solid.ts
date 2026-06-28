// ============================================================================
// STAGE 8 — SOLID  ☕
// ----------------------------------------------------------------------------
// Pain from stage 7: good OOP, but nothing stops the Order class from growing
// into a god-object that totals items AND saves to a database AND prints AND
// emails. SOLID is five named cures. We apply each, then run a checkout.
//
// Throughline: every principle serves HIGH COHESION + LOW COUPLING.
// ============================================================================

type Line = { name: string; price: number; qty: number };

// ─────────────────────────────────────────────────────────────────────────
// S — SINGLE RESPONSIBILITY: Order does totals. Nothing else.
// (Persistence, discounts, and printing each live in their own type below.)
// ─────────────────────────────────────────────────────────────────────────
class Order {
  readonly id: string;
  readonly #lines: Line[];
  constructor(id: string, lines: Line[]) {
    this.id = id;
    this.#lines = lines;
  }
  get subtotal(): number {
    return this.#lines.reduce((s, l) => s + l.price * l.qty, 0);
  }
  get lines(): readonly Line[] {
    return this.#lines;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// O — OPEN/CLOSED + L — LISKOV: new discounts arrive as NEW classes that
// implement DiscountPolicy. Every policy is substitutable wherever a
// DiscountPolicy is expected, so the checkout never grows a `switch`.
// ─────────────────────────────────────────────────────────────────────────
interface DiscountPolicy {
  readonly name: string;
  amountOff(order: Order): number;
}
class NoDiscount implements DiscountPolicy {
  readonly name = "None";
  amountOff(): number { return 0; }
}
class HappyHour implements DiscountPolicy {
  readonly name = "Happy Hour 20%";
  amountOff(order: Order): number { return order.subtotal * 0.2; }
}
class LoyaltyDiscount implements DiscountPolicy {
  // added later WITHOUT touching NoDiscount/HappyHour or the checkout
  readonly name = "Loyalty $2 off over $10";
  amountOff(order: Order): number { return order.subtotal > 10 ? 2 : 0; }
}

// ─────────────────────────────────────────────────────────────────────────
// I — INTERFACE SEGREGATION: a report only needs to READ orders; the kitchen
// only needs to be NOTIFIED. Don't force either to depend on save().
// ─────────────────────────────────────────────────────────────────────────
interface OrderReader {
  find(id: string): Order | undefined;
}
interface OrderWriter {
  save(order: Order): void;
}

// ─────────────────────────────────────────────────────────────────────────
// D — DEPENDENCY INVERSION: Checkout depends on ABSTRACTIONS (a store
// interface + a discount interface), handed in from outside. It never writes
// `new InMemoryOrderStore()`, so it works with any store — DB, fake, audited.
// ─────────────────────────────────────────────────────────────────────────
class Checkout {
  readonly #store: OrderWriter;
  readonly #discount: DiscountPolicy;
  constructor(store: OrderWriter, discount: DiscountPolicy) {
    this.#store = store;
    this.#discount = discount;
  }
  ring(order: Order): number {
    const off = this.#discount.amountOff(order);
    const total = order.subtotal - off;
    this.#store.save(order);
    console.log(
      `Order ${order.id}: subtotal $${order.subtotal.toFixed(2)} ` +
        `- ${this.#discount.name} ($${off.toFixed(2)}) = $${total.toFixed(2)}`
    );
    return total;
  }
}

// A concrete store. Swap for a Postgres-backed one and Checkout is unchanged.
class InMemoryOrderStore implements OrderReader, OrderWriter {
  #orders = new Map<string, Order>();
  save(order: Order): void { this.#orders.set(order.id, order); }
  find(id: string): Order | undefined { return this.#orders.get(id); }
}

// Receipt printing is its own responsibility (SRP) and only READS (ISP).
class ReceiptPrinter {
  readonly #reader: OrderReader;
  constructor(reader: OrderReader) {
    this.#reader = reader;
  }
  print(id: string): void {
    const order = this.#reader.find(id);
    if (!order) return console.log(`(no order ${id})`);
    for (const l of order.lines) {
      console.log(`  ${l.qty}x ${l.name.padEnd(8)} $${(l.price * l.qty).toFixed(2)}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// DEMO — the wiring is the ONLY place that knows the concrete types.
// ─────────────────────────────────────────────────────────────────────────
const store = new InMemoryOrderStore();
const order = new Order("A-101", [
  { name: "Latte", price: 4.5, qty: 2 },
  { name: "Muffin", price: 3.0, qty: 1 },
]);

// O + L: pick any policy; all interchangeable, new ones plug in freely.
const policies: DiscountPolicy[] = [new NoDiscount(), new HappyHour(), new LoyaltyDiscount()];
for (const policy of policies) {
  new Checkout(store, policy).ring(order);
}

console.log("Receipt for A-101:");
new ReceiptPrinter(store).print("A-101");

// ============================================================================
// SOLID, RECAPPED — five tactics, one goal (cohesion ↑, coupling ↓):
//
//   S  Order / Checkout / Store / Printer each change for ONE reason.
//   O  New DiscountPolicy = new class; existing code untouched.
//   L  Every DiscountPolicy works wherever a DiscountPolicy is expected.
//   I  ReceiptPrinter depends on OrderReader only — not save().
//   D  Checkout depends on interfaces; the concrete store is injected.
//
// This is where the whole evolution was heading:
// procedural → loops → functions → classes → modules → OOP → SOLID.
// ============================================================================

// ── Try it ──
// Add `class StudentDiscount implements DiscountPolicy` (10% off). Drop it into
// the `policies` array. Nothing else changes — Open/Closed in action.
