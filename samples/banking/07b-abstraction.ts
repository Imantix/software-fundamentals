// ============================================================================
// OOP DEEP-DIVE (b) — ABSTRACTION, on real code  🏦
// ----------------------------------------------------------------------------
// Encapsulation hid the internals of ONE class. Abstraction goes further: it
// defines WHAT something does as a *contract* (an interface) and defers HOW
// entirely. The killer reason isn't tidiness — it's PARALLEL TEAMWORK.
//
// Scenario: a banking app. Team B builds Payroll; Team A builds the Employee
// module. Payroll needs employee data — but Team A's module will take two
// weeks. Without abstraction, Team B is BLOCKED. With it, both work at once.
// ============================================================================

// ── THE CONTRACT (published on day 1, before any real code exists). ─────────
// These interfaces are pure "what": no implementation, no database, nothing.
interface Employee {
  id: string;
  name: string;
  monthlySalary: number;
}

interface EmployeeRepository {
  getEmployees(): Employee[]; // "there WILL be a way to get employees"
}

// ── TEAM B builds Payroll NOW, against the contract. ────────────────────────
// Payroll has no idea where employees come from — a database, an API, a CSV.
// It depends only on the IDEA "something that can getEmployees()".
class PayrollService {
  #repo: EmployeeRepository;
  constructor(repo: EmployeeRepository) {
    this.#repo = repo;
  }

  runMonthlyPayroll(): void {
    const employees = this.#repo.getEmployees();
    let totalPaid = 0;
    for (const e of employees) {
      console.log(`Paying ${e.name.padEnd(8)} $${e.monthlySalary.toFixed(2)}`);
      totalPaid += e.monthlySalary;
    }
    console.log(`Total payroll: $${totalPaid.toFixed(2)}`);
  }
}

// ── TEAM A is still building the real module. In the meantime, a stand-in
//    implementation satisfies the SAME contract, so Payroll can run today. ───
class InMemoryEmployeeRepository implements EmployeeRepository {
  #employees: Employee[] = [
    { id: "E1", name: "Alice", monthlySalary: 5000 },
    { id: "E2", name: "Bob", monthlySalary: 4200 },
  ];
  getEmployees(): Employee[] {
    return [...this.#employees];
  }
}

// Later, Team A ships the REAL repository (here faked as "from a database").
// Note: PayrollService does not change one character to switch to it.
class DatabaseEmployeeRepository implements EmployeeRepository {
  getEmployees(): Employee[] {
    // pretend this queried Postgres
    return [
      { id: "E1", name: "Alice", monthlySalary: 5500 },
      { id: "E2", name: "Bob", monthlySalary: 4600 },
      { id: "E3", name: "Carol", monthlySalary: 7000 },
    ];
  }
}

// ── DEMO: same PayrollService, two different sources — proof of the payoff. ──
console.log("== Week 1: running against the in-memory stand-in ==");
new PayrollService(new InMemoryEmployeeRepository()).runMonthlyPayroll();

console.log("\n== Week 3: Team A's real repository drops in, Payroll unchanged ==");
new PayrollService(new DatabaseEmployeeRepository()).runMonthlyPayroll();

// ============================================================================
// WHY THIS IS ABSTRACTION (and why it matters)
//
//  • The INTERFACE is the "what": getEmployees(). No "how" at all.
//  • PayrollService depends on the contract, never on a concrete class — so it
//    was buildable on day 1, before the employee module existed.
//  • Swapping in-memory → database changes ZERO lines of Payroll. That's the
//    same property that lets you swap Postgres for MySQL later (low coupling).
//
// REVIEWER'S LENS: an interface earns its place when it enables (a) parallel
// work against a contract, or (b) swapping implementations. If neither is true,
// a plain class would do — don't add the interface just because you can.
// ============================================================================

// ── Try it ──
// Write a `CsvEmployeeRepository implements EmployeeRepository` that returns a
// hardcoded list "from a file". Pass it to PayrollService. Everything still
// works — because Payroll only ever knew the contract.
