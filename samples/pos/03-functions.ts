// ============================================================================
// STAGE 3 — FUNCTIONS  ☕
// ----------------------------------------------------------------------------
// Pain from stage 2: the rules (line total, subtotal, tax) were welded into
// one loop. Reuse them anywhere else and you copy the loop.
//
// Functions give each rule a NAME, a single home, and a private scope — and
// in TypeScript, a typed contract that documents itself.
// ============================================================================

type LineItem = { name: string; price: number; qty: number };

const TAX_RATE = 0.08;

/** Price for one order line. (Pure: depends only on its input.) */
function lineTotal(item: LineItem): number {
  return item.price * item.qty;
}

/** Sum every line. Reuses lineTotal — no inline arithmetic. */
function subtotalOf(order: LineItem[]): number {
  let sum = 0;
  for (const item of order) {
    sum += lineTotal(item);
  }
  return sum;
}

/** Tax on an amount — the rate lives here and nowhere else. */
function taxOn(amount: number): number {
  return amount * TAX_RATE;
}

/** Formatting is its own concern, in one place. */
function money(amount: number): string {
  return "$" + amount.toFixed(2);
}

/** Compose the small pieces into the whole receipt total. */
function orderTotal(order: LineItem[]): number {
  const sub = subtotalOf(order);
  return sub + taxOn(sub);
}

const order: LineItem[] = [
  { name: "Latte", price: 4.5, qty: 2 },
  { name: "Muffin", price: 3.0, qty: 1 },
  { name: "Cookie", price: 2.25, qty: 3 },
];

// Top level reads like a summary: WHAT we do, not HOW each step works.
for (const item of order) {
  console.log(`${item.qty}x ${item.name.padEnd(7)} ${money(lineTotal(item))}`);
}
console.log("Subtotal: " + money(subtotalOf(order)));
console.log("Tax:      " + money(taxOn(subtotalOf(order))));
console.log("TOTAL:    " + money(orderTotal(order)));

// ============================================================================
// WHAT FUNCTIONS BOUGHT US
//
//  • NAMING = DOCUMENTATION: orderTotal(order) says exactly what you get.
//  • SINGLE SOURCE OF TRUTH: the tax rule lives in taxOn — change it once.
//  • REUSE: a kitchen ticket can call subtotalOf(); email can call money().
//    No copied loops.
//  • COMPOSITION: orderTotal is built from subtotalOf + taxOn, which are built
//    from lineTotal. Small pieces, snapped together.
//
// REMAINING PAIN: the order is still a loose array anyone can mutate —
// push a {qty: -5} item and every total silently goes wrong. The data has no
// guardian. Stage 4 (classes) bundles the data with the rules that protect it.
// ============================================================================

// ── Try it ──
// A barista wants the pre-tax total only? Call subtotalOf(order) directly.
// One function, reused, zero duplication.
