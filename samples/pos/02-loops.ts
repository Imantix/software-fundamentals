// ============================================================================
// STAGE 2 — LOOPS  ☕
// ----------------------------------------------------------------------------
// Pain from stage 1: every menu line was hand-written, and the subtotal was a
// growing chain of `+`. A 12-item order was 12 copy-pasted blocks.
//
// A loop walks the order ONCE, however many items it has, and accumulates the
// subtotal as it goes.
// ============================================================================

type LineItem = {
  name: string;
  price: number;
  qty: number;
};

// The order is now DATA — a list — separate from the logic that totals it.
const order: LineItem[] = [
  { name: "Latte", price: 4.5, qty: 2 },
  { name: "Muffin", price: 3.0, qty: 1 },
  { name: "Cookie", price: 2.25, qty: 3 }, // a new item is ONE line now
];

const TAX_RATE = 0.08; // named once — no longer a mystery 0.08

// Walk the list once, accumulating as we go (the classic loop pattern):
let subtotal = 0;
for (const item of order) {
  const lineTotal = item.price * item.qty;
  subtotal += lineTotal;
  console.log(`${item.qty}x ${item.name.padEnd(7)} $${lineTotal.toFixed(2)}`);
}

const tax = subtotal * TAX_RATE;
console.log("Subtotal: $" + subtotal.toFixed(2));
console.log("Tax:      $" + tax.toFixed(2));
console.log("TOTAL:    $" + (subtotal + tax).toFixed(2));

// ============================================================================
// WHAT THE LOOP BOUGHT US
//
//  • Any number of items, same code. 3 or 30 — the loop doesn't care.
//  • One place for the tax rate. Change TAX_RATE once; every order follows.
//  • Data (the order array) is cleanly separate from the rule (the loop body).
//
// REMAINING PAIN: the rules (line total, tax) are baked INTO this loop. Want
// the same totals on a receipt printer, a kitchen ticket, and an email? You'd
// copy this loop three times. Stage 3 (functions) names and reuses the rules.
// ============================================================================

// ── Try it ──
// Add { name: "Drip Coffee", price: 2.0, qty: 2 }. One line; the loop and the
// totals just absorb it. TypeScript also makes sure you didn't forget a field.
