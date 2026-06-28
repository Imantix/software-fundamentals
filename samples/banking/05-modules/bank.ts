// bank.ts — MODULE: managing a COLLECTION of accounts.
// ----------------------------------------------------------------------------
// This module imports the BankAccount blueprint and adds higher-level behavior
// (opening accounts, running month-end for everyone). It depends on account.ts
// but knows nothing about formatting — that's money.ts's job.
//
// Note the import specifier ends in ".ts" — Node's native TypeScript runner
// resolves the real file extension, not a compiled ".js".

import { BankAccount } from "./account.ts";

export class Bank {
  #accounts: BankAccount[] = [];

  open(name: string, openingBalance: number): BankAccount {
    const account = new BankAccount(name, openingBalance);
    this.#accounts.push(account);
    return account;
  }

  runMonthEndForAll(): void {
    for (const account of this.#accounts) {
      account.applyMonthEnd();
    }
  }

  get accounts(): BankAccount[] {
    return [...this.#accounts]; // hand out a copy, not our private array
  }
}
