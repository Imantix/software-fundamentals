// ============================================================================
// STAGE 8 — SOLID  🏦
// ----------------------------------------------------------------------------
// Pain from stage 7: we had good OOP, but good OOP isn't automatically good
// DESIGN. Pile features onto the Account class and it becomes a god-object:
// it knows about balances AND databases AND email AND statements. Change one,
// risk all. SOLID is five named cures. We apply each, then run a demo.
//
// Throughline: every principle below serves HIGH COHESION + LOW COUPLING.
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────
// S — SINGLE RESPONSIBILITY: each class has ONE reason to change.
// Account = money rules. Statement = formatting. Store = persistence.
// (Contrast: a "User/Account does everything" class with 3 reasons to change.)
// ─────────────────────────────────────────────────────────────────────────
class Account {
  #balance: number;
  readonly id: string;
  constructor(id: string, opening: number) {
    this.id = id;
    this.#balance = opening;
  }
  get balance(): number { return this.#balance; }
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.#balance += amount;
  }
  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal must be positive");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// O — OPEN/CLOSED: open for extension, closed for modification.
// New fee schemes arrive as NEW classes implementing FeePolicy — we never
// reopen a `switch (accountType)`. (This is stage 7's polymorphism as design.)
// ─────────────────────────────────────────────────────────────────────────
interface FeePolicy {
  monthlyFee(account: Account): number;
}
class FreeAccountFee implements FeePolicy {
  monthlyFee(): number { return 0; }
}
class StandardFee implements FeePolicy {
  monthlyFee(): number { return 5; }
}
class BalanceTieredFee implements FeePolicy {
  // waive the fee for wealthy accounts — added WITHOUT touching the others
  monthlyFee(account: Account): number { return account.balance > 10_000 ? 0 : 8; }
}

// ─────────────────────────────────────────────────────────────────────────
// I — INTERFACE SEGREGATION: many small interfaces, not one fat one.
// A read-only report only needs to READ. Don't force it to depend on save().
// ─────────────────────────────────────────────────────────────────────────
interface AccountReader {
  find(id: string): Account | undefined;
}
interface AccountWriter {
  save(account: Account): void;
}

// ─────────────────────────────────────────────────────────────────────────
// D — DEPENDENCY INVERSION: high-level policy depends on ABSTRACTIONS.
// TransferService never says `new SqlDatabase()`. It's handed something that
// satisfies AccountReader & AccountWriter — in-memory now, a real DB later,
// a fake in tests — and it doesn't change.
// ─────────────────────────────────────────────────────────────────────────
class TransferService {
  readonly #store: AccountReader & AccountWriter;
  constructor(store: AccountReader & AccountWriter) {
    this.#store = store;
  }

  transfer(fromId: string, toId: string, amount: number): void {
    const from = this.#store.find(fromId);
    const to = this.#store.find(toId);
    if (!from || !to) throw new Error("Account not found");
    from.withdraw(amount); // invariant lives in Account, not here
    to.deposit(amount);
    this.#store.save(from);
    this.#store.save(to);
  }
}

// A concrete store. Swap this for a Postgres-backed one and NOTHING above
// changes — that's the payoff of depending on the interface, not the class.
class InMemoryAccountStore implements AccountReader, AccountWriter {
  #accounts = new Map<string, Account>();
  save(account: Account): void { this.#accounts.set(account.id, account); }
  find(id: string): Account | undefined { return this.#accounts.get(id); }
}

// Statement formatting is its own responsibility (SRP), and it only needs to
// READ — so it depends on AccountReader, not the whole store (ISP).
class StatementPrinter {
  readonly #reader: AccountReader;
  constructor(reader: AccountReader) {
    this.#reader = reader;
  }
  print(id: string): void {
    const account = this.#reader.find(id);
    if (!account) return console.log(`(no account ${id})`);
    console.log(`Statement ${account.id}: $${account.balance.toFixed(2)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// DEMO — assemble the pieces (this wiring is the only place that knows the
// concrete types; everything else talks to interfaces).
// ─────────────────────────────────────────────────────────────────────────
const store = new InMemoryAccountStore();
store.save(new Account("alice", 1000));
store.save(new Account("bob", 250));

const transfers = new TransferService(store);
transfers.transfer("alice", "bob", 300);

const printer = new StatementPrinter(store);
printer.print("alice"); // Statement alice: $700.00
printer.print("bob");   // Statement bob:   $550.00

// O + L in action: pick any fee policy; all are interchangeable (Liskov) and
// new ones plug in without editing this loop (Open/Closed).
const policies: FeePolicy[] = [new FreeAccountFee(), new StandardFee(), new BalanceTieredFee()];
const alice = store.find("alice")!;
for (const policy of policies) {
  console.log(`${policy.constructor.name}: fee $${policy.monthlyFee(alice).toFixed(2)}`);
}

// ============================================================================
// SOLID, RECAPPED — five tactics, one goal (cohesion ↑, coupling ↓):
//
//   S  Account / Statement / Store each change for ONE reason.
//   O  New FeePolicy = new class; existing code untouched.
//   L  Every FeePolicy is substitutable wherever FeePolicy is expected.
//   I  StatementPrinter depends on AccountReader only — not save().
//   D  TransferService depends on interfaces; concrete store injected.
//
// This is the destination the WHOLE evolution was walking toward:
// procedural → loops → functions → classes → modules → OOP → SOLID,
// each step trading a little freedom for a lot of changeability.
// ============================================================================

// ── Try it ──
// Write `class AuditedAccountStore implements AccountReader, AccountWriter`
// that logs every save, then pass it to TransferService instead. Nothing in
// TransferService changes — that's Dependency Inversion earning its keep.
