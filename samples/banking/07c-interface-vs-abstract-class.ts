// ============================================================================
// OOP DEEP-DIVE (c) — INTERFACE vs ABSTRACT CLASS  🏦
// ----------------------------------------------------------------------------
// The single most common OO interview question. They look similar; their JOBS
// are opposite:
//
//   INTERFACE       = a CAPABILITY / CONTRACT.  "What can this thing DO?"
//                     No implementation. A class can implement MANY.
//                     Keep them small and focused (one capability each).
//
//   ABSTRACT CLASS  = COMMON CODE factored out. "What do these things SHARE?"
//                     Real fields + methods. A class extends exactly ONE.
//                     Like taking the common factor out in algebra.
// ============================================================================

// ── ABSTRACT CLASS: the common base every database entity shares. ───────────
// Written ONCE here so no entity has to repeat id / timestamps / soft-delete.
abstract class BaseEntity {
  readonly id: string;
  readonly createdOn: Date;
  isDeleted: boolean;

  constructor(id: string) {
    this.id = id;
    this.createdOn = new Date();
    this.isDeleted = false;
  }

  // Shared behavior, inherited by every child for free.
  softDelete(): void {
    this.isDeleted = true;
  }
}

// ── INTERFACES: small, focused CAPABILITIES. A class advertises what it can do
//    simply by implementing them. Reading the `implements` list tells you a lot. ─
interface PdfExportable {
  toPdf(): string;
}
interface CsvExportable {
  toCsv(): string;
}

// ── A class can EXTEND ONE base (shared code) and IMPLEMENT MANY capabilities.
//    At a glance, `UserEntity` IS-A BaseEntity and CAN export to PDF and CSV. ──
class UserEntity extends BaseEntity implements PdfExportable, CsvExportable {
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    super(id); // reuse BaseEntity's setup — no copy-pasted id/timestamp code
    this.name = name;
    this.email = email;
  }

  toPdf(): string {
    return `PDF<User ${this.name}>`;
  }
  toCsv(): string {
    return `${this.id},${this.name},${this.email}`;
  }
}

// Another entity reuses the SAME base, but advertises different capabilities.
class InvoiceEntity extends BaseEntity implements PdfExportable {
  amount: number;
  constructor(id: string, amount: number) {
    super(id);
    this.amount = amount;
  }
  toPdf(): string {
    return `PDF<Invoice $${this.amount.toFixed(2)}>`;
  }
  // note: no toCsv() — InvoiceEntity simply doesn't claim that capability.
}

// ── DEMO ────────────────────────────────────────────────────────────────────
const user = new UserEntity("U1", "Alice", "alice@bank.test");
const invoice = new InvoiceEntity("I1", 250);

console.log("user.id / createdOn come from BaseEntity:", user.id, user.createdOn.getFullYear());
console.log("user as PDF:", user.toPdf());
console.log("user as CSV:", user.toCsv());
console.log("invoice as PDF:", invoice.toPdf());

user.softDelete(); // shared behavior from the abstract base
console.log("user.isDeleted after softDelete():", user.isDeleted);

// POLYMORPHISM through a CAPABILITY interface: anything PdfExportable, uniformly.
const printables: PdfExportable[] = [user, invoice];
for (const p of printables) {
  console.log("Exporting:", p.toPdf());
}

// ============================================================================
// THE DISTINCTION, CRISP
//
//   Need to share IMPLEMENTATION across classes?      → abstract class (extends, one)
//   Need to declare a CAPABILITY / contract?          → interface     (implements, many)
//
//   BaseEntity   = "these all share id + timestamps"  (common factor pulled out)
//   PdfExportable = "this one CAN export to PDF"       (a promise about capability)
//
// Memory hook: abstract class answers "what do we SHARE?"; interface answers
// "what can it DO?". A class extends ONE base but can implement MANY interfaces.
// ============================================================================

// ── Try it ──
// Add `interface Emailable { send(): void }` and have UserEntity implement it.
// Notice UserEntity's `implements` list now documents three capabilities at a
// glance — that readability is exactly what small, focused interfaces buy you.
