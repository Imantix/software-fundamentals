// ============================================================================
// STAGE 1 — PROCEDURAL  ☕
// ----------------------------------------------------------------------------
// A coffee shop order, the way everyone first writes it: top to bottom, every
// number hardcoded. It prints a correct total — and that's exactly what hides
// how badly it scales.
//
// Order: 2 lattes ($4.50), 1 muffin ($3.00). Add 8% tax. Print the total.
//
//   Run:  node 01-procedural.ts
// ============================================================================

// --- Latte line -----------------------------------------------------------
const latteQty: number = 2;
const lattePrice: number = 4.5;
const latteLineTotal: number = latteQty * lattePrice;
console.log("Lattes:  $" + latteLineTotal);

// --- Muffin line ----------------------------------------------------------
const muffinQty: number = 1;
const muffinPrice: number = 3.0;
const muffinLineTotal: number = muffinQty * muffinPrice; // same shape, retyped
console.log("Muffin:  $" + muffinLineTotal);

// --- Totals ---------------------------------------------------------------
const subtotal: number = latteLineTotal + muffinLineTotal;
const tax: number = subtotal * 0.08; // what's 0.08? you have to just know
const total: number = subtotal + tax;
console.log("Subtotal: $" + subtotal);
console.log("Tax:      $" + tax.toFixed(2));
console.log("TOTAL:    $" + total.toFixed(2));

// ============================================================================
// FEEL THE PAIN
//
//  1. MAGIC NUMBERS: 0.08 is the tax rate — but nothing says so.
//  2. COPY-PASTE: every menu item repeats the qty*price shape by hand.
//  3. DOESN'T SCALE: a 12-item order means 12 hand-written blocks.
//  4. FRAGILE: tax changes to 8.5%? Hunt down 0.08 wherever it hides.
//
// A barrista's POS handles thousands of orders with any number of items.
// This style can't. Every later stage removes one of these pains.
// ============================================================================

// ── Try it ──
// Add a 3rd item (a cookie, $2.25) by hand. Notice you must copy the whole
// qty/price/lineTotal/console.log block again. That copy-paste is the smell
// loops (stage 2) remove.
