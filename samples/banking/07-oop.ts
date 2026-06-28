// ============================================================================
// STAGE 7 — OOP PILLARS  🏦
// ----------------------------------------------------------------------------
// Pain from stage 5: every account was identical. Real banks have SAVINGS,
// CHECKING, PREMIUM... each with different interest and overdraft rules.
// The naive fix is a `switch (accountType)` in every method — which grows
// forever and must be edited for each new type.
//
// OOP models a FAMILY of related types. We see all four pillars here:
//   ENCAPSULATION · ABSTRACTION · INHERITANCE · POLYMORPHISM
// ============================================================================

// ── ABSTRACTION: a base class that declares WHAT every account can do,
//    while leaving HOW interest works to each subtype (`abstract`). ───────────
abstract class Account {
  // ── ENCAPSULATION: subclasses use deposit/withdraw, but can't corrupt
  //    #balance directly. The invariant is protected for the whole family. ──
  #balance: number;
  readonly owner: string;

  constructor(owner: string, opening: number) {
    this.owner = owner;
    this.#balance = opening;
  }

  get balance(): number {
    return this.#balance;
  }

  protected credit(amount: number): void {
    this.#balance += amount;
  }

  // Each account type MUST define its own interest rate. The base class
  // doesn't know or care how — that's the "abstract" promise.
  abstract monthlyInterestRate(): number;

  // How far below zero this account may go (overdraft). Default: not at all.
  protected overdraftLimit(): number {
    return 0;
  }

  withdraw(amount: number): void {
    if (amount > this.#balance + this.overdraftLimit()) {
      throw new Error(`${this.owner}: withdrawal exceeds available funds`);
    }
    this.#balance -= amount;
  }

  // Shared behavior, written ONCE, that calls into the per-type pieces.
  applyMonthEnd(): void {
    this.credit(this.#balance * this.monthlyInterestRate());
  }

  // A label for printing — subtypes override to name themselves.
  abstract get kind(): string;
}

// ── INHERITANCE: each subtype reuses the base and specializes the parts
//    that differ. No copy-pasted balance/withdraw logic. ──────────────────────
class SavingsAccount extends Account {
  get kind(): string { return "Savings"; }
  monthlyInterestRate(): number { return 0.02; } // earns 2%
}

class CheckingAccount extends Account {
  get kind(): string { return "Checking"; }
  monthlyInterestRate(): number { return 0.0; }  // earns nothing
  protected overdraftLimit(): number { return 500; } // but may overdraft $500
}

class PremiumAccount extends Account {
  get kind(): string { return "Premium"; }
  monthlyInterestRate(): number { return 0.05; } // earns 5%
  protected overdraftLimit(): number { return 2000; }
}

// ── POLYMORPHISM: this loop treats every account as just an `Account`.
//    Each runs ITS OWN monthlyInterestRate — no `switch`, no type checks.
//    Adding a new account type below would require ZERO changes here. ─────────
const portfolio: Account[] = [
  new SavingsAccount("Alice", 1000),
  new CheckingAccount("Bob", 250),
  new PremiumAccount("Carol", 5000),
];

for (const account of portfolio) {
  account.applyMonthEnd(); // same call → different math per type
  console.log(
    `${account.owner.padEnd(6)} ${account.kind.padEnd(9)} $${account.balance.toFixed(2)}`
  );
}

// Checking can overdraft; savings cannot — the family enforces its own rules:
const bob = portfolio[1];
bob.withdraw(400); // ok: dips into overdraft
console.log(`Bob after overdraft: $${bob.balance.toFixed(2)}`);

// ============================================================================
// THE FOUR PILLARS, RIGHT HERE
//
//  • ENCAPSULATION — #balance is private to the whole hierarchy; only
//    credit()/withdraw() change it, so the "no illegal balance" rule holds.
//  • ABSTRACTION — `Account` says WHAT an account does; callers never see HOW.
//  • INHERITANCE — Savings/Checking/Premium reuse shared code, override the
//    1–2 things that differ.
//  • POLYMORPHISM — one loop, three behaviors. The ENGINE behind the next
//    stage's Open/Closed Principle: new types extend the system without
//    editing existing code.
//
// NEXT: this is good OO — but OO ALONE doesn't guarantee good design. You can
// still build something rigid and tangled. Stage 8 (SOLID) names the failure
// modes and their cures.
// ============================================================================

// ── Try it ──
// Add a `StudentAccount` (1% interest, $100 overdraft). Notice you DON'T touch
// the print loop or any existing class — that's polymorphism paying off.
