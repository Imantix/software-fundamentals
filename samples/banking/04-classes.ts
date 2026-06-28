// ============================================================================
// STAGE 4 — CLASSES  🏦
// ----------------------------------------------------------------------------
// Pain from stage 3: data and the rules that protect it were SEPARATE.
// `account.balance = -999` bypassed every guard. The C interlude showed we
// can bundle data + behavior by hand — painfully. A class does it for us,
// and now BOTH TypeScript (compile time) and `#` (runtime) enforce protection.
//
// A class is a blueprint that bundles state with the behavior that guards it.
// ============================================================================

class BankAccount {
  // `#balance` is TRULY private — unreachable from outside even at runtime.
  // (TypeScript also has the `private` keyword, but that's only compile-time;
  //  `#` is the language enforcing what C could only ask politely for.)
  #balance: number;

  // `readonly` means it's set once in the constructor and never reassigned.
  readonly name: string;

  constructor(name: string, openingBalance: number = 0) {
    if (openingBalance < 0) throw new Error("Cannot open with a negative balance");
    this.name = name;
    this.#balance = openingBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
  }

  // The invariant "balance never goes negative" is guaranteed HERE, in the
  // only code that can change the balance. No caller can break it.
  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }

  applyMonthEnd(): void {
    this.#balance += this.#balance * 0.1; // interest
    this.#balance -= 5;                     // fee
  }

  // Read-only window onto private state.
  get balance(): number {
    return this.#balance;
  }
}

// One blueprint, many independent instances — each owns its own private state.
const alice = new BankAccount("Alice", 1000);
const bob = new BankAccount("Bob", 250);

alice.deposit(500);
alice.withdraw(200);
alice.applyMonthEnd();
bob.applyMonthEnd();

console.log(`${alice.name}: $${alice.balance.toFixed(2)}`);
console.log(`${bob.name}:   $${bob.balance.toFixed(2)}`);

// The whole point — the guard CANNOT be bypassed:
try {
  bob.withdraw(999999); // more than the balance
} catch (err) {
  console.log("Blocked:", (err as Error).message); // "Insufficient funds"
}

// ============================================================================
// WHAT CLASSES BOUGHT US
//
//  • ENCAPSULATION (enforced): #balance is unreachable from outside. Invalid
//    states are now IMPOSSIBLE to construct, not just discouraged.
//  • COHESION: the data (#balance) lives with the rules that protect it.
//  • DOMAIN VOCABULARY: alice.withdraw(200) reads like the business.
//  • MANY INSTANCES: alice and bob each carry their own private state.
//
// REMAINING PAIN: everything is in ONE file. A real bank has accounts,
// transactions, statements, customers... thousands of classes. Put them all
// here and nobody can find anything, and names start to collide.
// Stage 5 (modules) organizes the growing codebase.
// ============================================================================

// ── Try it ──
// Uncomment and watch BOTH layers stop you:
//   console.log(alice.#balance);   // SyntaxError: Private field not accessible
//   alice.balance = 1000000;       // TS error: no setter — `balance` is read-only
