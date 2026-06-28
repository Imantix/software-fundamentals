// ============================================================================
// STAGE 1 — PROCEDURAL  🏦
// ----------------------------------------------------------------------------
// Where everyone starts: a straight list of instructions, top to bottom.
// It WORKS. That's the trap — "it works" hides how badly it scales.
//
// The task: at month end, every account earns 10% interest, then pays a $5
// maintenance fee. Print the new balance.
//
//   Run:  node 01-procedural.ts   (Node 23+ runs TypeScript directly)
// ============================================================================

// --- Account 1 -------------------------------------------------------------
let aliceBalance: number = 1000;
aliceBalance = aliceBalance + aliceBalance * 0.1; // interest... what's 0.1?
aliceBalance = aliceBalance - 5;                    // fee... what's 5?
console.log("Alice:   $" + aliceBalance);

// --- Account 2 -------------------------------------------------------------
let bobBalance: number = 250;
bobBalance = bobBalance + bobBalance * 0.1;        // exact same rule, retyped
bobBalance = bobBalance - 5;
console.log("Bob:     $" + bobBalance);

// --- Account 3 -------------------------------------------------------------
let carolBalance: number = 5000;
carolBalance = carolBalance + carolBalance * 0.1;  // and again...
carolBalance = carolBalance - 5;
console.log("Carol:   $" + carolBalance);

// ============================================================================
// FEEL THE PAIN  (this is the whole point of stage 1)
//
//  1. MAGIC NUMBERS: what are 0.1 and 5? You have to be in the author's head.
//  2. COPY-PASTE: the interest+fee rule is written 3 times. Three places to
//     keep in sync.
//  3. DOESN'T SCALE: 3 accounts = 9 lines. 10,000 accounts = impossible.
//  4. FRAGILE: the bank raises the fee to $6. Now find and fix every copy...
//     and pray you didn't miss one. (Try it below — change ONE, see the bug.)
//
// Note: even the TYPE annotation (`: number`) is doing a small job already —
// it stops you assigning "oops" to a balance. Types are an early guardrail;
// the later stages add structural ones. Every later stage removes a pain.
// ============================================================================

// ── Try it ──
// Change Bob's fee to 6 but leave Alice and Carol at 5.
// Now the same "rule" behaves differently per account. That inconsistency is
// exactly the bug copy-paste invites. Loops (stage 2) start to fix this.
