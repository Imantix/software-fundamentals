// main.ts — the ENTRY POINT. Notice how it reads like a high-level summary.
// ----------------------------------------------------------------------------
// main.ts imports exactly what it needs from each module. It doesn't know (or
// care) HOW interest is calculated or HOW money is formatted — it just composes
// the pieces. That separation keeps a 3-file demo, or a 3000-file bank, sane.
//
//   Run:  node main.ts     (this folder's package.json sets "type": "module")

import { Bank } from "./bank.ts";
import { format } from "./money.ts";

const bank = new Bank();
bank.open("Alice", 1000);
bank.open("Bob", 250);
bank.open("Carol", 5000);

bank.runMonthEndForAll();

for (const account of bank.accounts) {
  console.log(`${account.name.padEnd(6)} ${format(account.balance)}`);
}

// ============================================================================
// WHAT MODULES BOUGHT US
//
//  • FINDABILITY: need the interest rule? account.ts. Formatting? money.ts.
//    You navigate by responsibility, not by scrolling one huge file.
//  • INFORMATION HIDING: INTEREST_RATE is private to account.ts. Other modules
//    physically cannot depend on it, so it's safe to change.
//  • NO NAME COLLISIONS: each file is its own namespace.
//  • REUSE: bank.ts could be imported by a web server, a CLI, or tests —
//    unchanged. A module is a shippable unit (this is what npm packages are).
//
// NEXT: we have accounts, but they're all the SAME. Real banks have savings,
// checking, premium... each with different interest and overdraft rules.
// Stage 7 (OOP) models a family of related types without copy-pasting.
// ============================================================================
