// account.ts — MODULE: everything about a single account, and nothing else.
// ----------------------------------------------------------------------------
// A module is a namespace. Only what we `export` is visible outside; the rest
// (like INTEREST_RATE below) stays private to this file. That's information
// hiding at the file level.

const INTEREST_RATE = 0.1; // private to this module — not exported, not leaked
const MAINTENANCE_FEE = 5;

export class BankAccount {
  #balance: number;

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

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }

  applyMonthEnd(): void {
    this.#balance += this.#balance * INTEREST_RATE;
    this.#balance -= MAINTENANCE_FEE;
  }

  get balance(): number {
    return this.#balance;
  }
}
