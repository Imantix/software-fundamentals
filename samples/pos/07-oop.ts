// ============================================================================
// STAGE 7 — OOP PILLARS  ☕
// ----------------------------------------------------------------------------
// Pain from stage 5: every order was paid the same way. Real tills take CASH,
// CARD, and WALLET — each with different behavior (rounding, fees, loyalty).
// The naive fix is `if (method === "card") ... else if ...` in the checkout,
// which grows forever and must be edited for every new method.
//
// OOP models the FAMILY of payment methods. All four pillars appear here:
//   ENCAPSULATION · ABSTRACTION · INHERITANCE · POLYMORPHISM
// ============================================================================

// The result of charging — what the customer actually paid, and how.
type Charge = { label: string; charged: number };

// ── ABSTRACTION + INHERITANCE: a base class that declares WHAT a payment does
//    (charge an amount) and shares the common flow, while leaving the per-method
//    adjustment abstract for each subtype to fill in. ─────────────────────────
abstract class PaymentMethod {
  // ENCAPSULATION: subclasses can read the label, but the base owns the flow.
  protected abstract label: string;

  // The one thing each method does differently: adjust the amount due.
  protected abstract adjust(amount: number): number;

  // Shared template every method follows — written ONCE here.
  charge(amount: number): Charge {
    const charged = Math.max(0, this.adjust(amount));
    return { label: this.label, charged };
  }
}

class CashPayment extends PaymentMethod {
  protected label = "Cash";
  // Cash rounds to the nearest 5 cents (no pennies in the drawer).
  protected adjust(amount: number): number {
    return Math.round(amount * 20) / 20;
  }
}

class CardPayment extends PaymentMethod {
  protected label = "Card";
  // Card adds a 2% processing fee.
  protected adjust(amount: number): number {
    return amount * 1.02;
  }
}

class WalletPayment extends PaymentMethod {
  protected label = "Wallet";
  // The shop's own wallet gives 5% loyalty back.
  protected adjust(amount: number): number {
    return amount * 0.95;
  }
}

// ── POLYMORPHISM: checkout takes ANY PaymentMethod and calls charge().
//    It has no idea which concrete method it's holding — no if/else, no switch.
//    Adding a new method below requires ZERO changes here. ────────────────────
function checkout(total: number, method: PaymentMethod): void {
  const result = method.charge(total);
  console.log(`${result.label.padEnd(7)} → $${result.charged.toFixed(2)}`);
}

const orderTotal = 17.28;
console.log(`Order total: $${orderTotal.toFixed(2)}`);

const methods: PaymentMethod[] = [
  new CashPayment(),
  new CardPayment(),
  new WalletPayment(),
];

for (const method of methods) {
  checkout(orderTotal, method); // same call → different result per type
}

// ============================================================================
// THE FOUR PILLARS, RIGHT HERE
//
//  • ENCAPSULATION — each method owns its label and adjustment; the base owns
//    the shared charge() flow. Internals stay internal.
//  • ABSTRACTION — checkout() depends on the IDEA "a payment method", not on
//    cash/card/wallet specifics.
//  • INHERITANCE — the three methods reuse charge() and override only adjust().
//  • POLYMORPHISM — one loop, three behaviors. The ENGINE behind the next
//    stage's Open/Closed Principle.
//
// NEXT: this is solid OO — but OO alone won't stop a design from rotting. You
// could still bolt persistence, receipts, and email onto one class. Stage 8
// (SOLID) names those failure modes and their cures.
// ============================================================================

// ── Try it ──
// Add `class GiftCardPayment extends PaymentMethod` (full amount, no fee).
// Notice checkout() and the loop don't change at all — that's polymorphism.
