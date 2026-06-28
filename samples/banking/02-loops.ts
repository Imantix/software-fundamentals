// ============================================================================
// STAGE 2 — LOOPS  🏦
// ----------------------------------------------------------------------------
// Pain from stage 1: the same rule was copy-pasted per account, and 10,000
// accounts was impossible by hand.
//
// A loop writes the repetition ONCE and lets the machine repeat it — for
// however many accounts exist, a number we don't even need to know in advance.
// ============================================================================

// A `type` gives the shape of our data a name — TypeScript now checks that
// every account really has a name:string and balance:number.
type Account = {
  name: string;
  balance: number;
};

// The data is now a LIST, separate from the logic that processes it.
const accounts: Account[] = [
  { name: "Alice", balance: 1000 },
  { name: "Bob", balance: 250 },
  { name: "Carol", balance: 5000 },
  { name: "Dave", balance: 75 },   // adding a 4th account costs ONE line now,
  { name: "Erin", balance: 9999 }, // not 3 more copy-pasted statements.
];

const INTEREST_RATE = 0.1; // named once — no longer a "magic number"
const MAINTENANCE_FEE = 5;

// One rule, applied to every account, however many there are:
for (const account of accounts) {
  account.balance = account.balance + account.balance * INTEREST_RATE;
  account.balance = account.balance - MAINTENANCE_FEE;
  console.log(account.name + ": $" + account.balance.toFixed(2));
}

// ============================================================================
// WHAT THE LOOP BOUGHT US
//
//  • Change the fee in ONE place (MAINTENANCE_FEE) → every account updates.
//    The "fix it in 3 places and miss one" bug is now impossible.
//  • 5 accounts or 5 million: the code is the same length.
//  • Structure is visible: data (the array) is cleanly separate from the
//    rule (the loop body). This is the structured-programming idea that
//    replaced GOTO-style repetition.
//
// REMAINING PAIN: the *rule itself* (interest then fee) still lives inline,
// tangled into the loop. If we needed it elsewhere — say, a mid-month
// statement — we'd copy the two lines again. Stage 3 (functions) fixes that.
// ============================================================================

// ── Try it ──
// 1. Add { name: "Frank", balance: 4200 } — TypeScript enforces the shape.
// 2. Try { name: "Frank" } (no balance). The editor flags it before you run.
