// ============================================================================
// STAGE 3 — FUNCTIONS  🏦
// ----------------------------------------------------------------------------
// Pain from stage 2: the rule (interest, then fee) lived INLINE in the loop.
// Reuse it elsewhere and you copy it again. And one giant script is hard to
// read — there are no named "chapters".
//
// A function gives a task a NAME, a single home, and a private scope.
// In TypeScript the parameter and return TYPES also document the contract.
// ============================================================================

const INTEREST_RATE = 0.1;
const MAINTENANCE_FEE = 5;

type Account = { name: string; balance: number };

// Each rule is now a named, reusable, independently-testable piece.
// The signature `(balance: number): number` IS the documentation.

/** Add monthly interest to a balance. (Pure: same input → same output.) */
function applyInterest(balance: number): number {
  return balance + balance * INTEREST_RATE;
}

/** Deduct the flat maintenance fee. */
function applyFee(balance: number): number {
  return balance - MAINTENANCE_FEE;
}

/** The full month-end rule, composed from the two above. */
function runMonthEnd(balance: number): number {
  const withInterest = applyInterest(balance);
  return applyFee(withInterest);
}

/** Presentation is its own concern — formatting money in ONE place. */
function formatMoney(amount: number): string {
  return "$" + amount.toFixed(2);
}

// The top level now reads like a table of contents — WHAT happens, not HOW.
const accounts: Account[] = [
  { name: "Alice", balance: 1000 },
  { name: "Bob", balance: 250 },
  { name: "Carol", balance: 5000 },
];

for (const account of accounts) {
  account.balance = runMonthEnd(account.balance);
  console.log(account.name + ": " + formatMoney(account.balance));
}

// ============================================================================
// WHAT FUNCTIONS BOUGHT US
//
//  • NAMING = DOCUMENTATION: runMonthEnd(b) says what it does. The types say
//    what goes in and out. No comment needed.
//  • SINGLE SOURCE OF TRUTH: the fee rule lives in applyFee — change it once.
//  • REUSE: need a mid-month preview? Call applyInterest() without the fee.
//  • LOCAL SCOPE: `withInterest` inside runMonthEnd can't leak out. Sealed box.
//  • COMPOSITION: small functions snap together into bigger ones.
//
// REMAINING PAIN: data and the functions that guard it are still SEPARATE.
// Nothing stops someone writing `account.balance = -999` directly, bypassing
// every rule. The data is unprotected. Stage 4 (classes) fixes that.
// ============================================================================

// ── Try it ──
// Preview next month WITHOUT charging the fee — reuse, zero duplication:
//   console.log("Alice preview:", formatMoney(applyInterest(1000)));
