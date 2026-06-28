# The Evolution of Coding Constructs — Training Plan

**Thesis:** Programming constructs did not appear randomly. Each one — the loop, the
function, the class, the namespace, and ultimately the SOLID principles — was *engineered*
as a response to a concrete, recurring failure of the generation before it. Learn the
**problems**, and the constructs stop being arbitrary syntax and become inevitable
solutions.

**Audience:** Developers who can read code but want to understand *why* languages are
shaped the way they are.
**Language for examples:** JavaScript / TypeScript (with historical references to the
languages where each idea was actually born).

**Companion code:** every stage has a **runnable** counterpart under `samples/` — the same
evolution told in three domains (🏦 banking, ☕ coffee-shop POS, 🎮 tic-tac-toe). They run on
plain Node 23+ with no build step (`node samples/banking/03-functions.ts`). The snippets in
*this* plan are deliberately short illustrations; the `samples/` are the full, tested code.
See `samples/README.md`.

> **One gotcha worth knowing:** the samples avoid TypeScript *parameter properties*
> (`constructor(private x: T)`) and `enum`s, because Node's built-in TS runner only *strips*
> types — it won't generate the code those features need. Plan snippets follow the same
> erasable-only style so they stay copy-paste runnable.

---

## Why This Course Exists — The AI-Era Mandate

AI can now produce *working* code in any language in seconds. That speed creates a hidden
trap: developers get the **outcome** without ever understanding the **process** that
produced it. The fundamentals quietly go missing — and it shows the moment someone has to
*judge* code rather than just request it.

**The goal of these sessions is to move you along this roadmap:**

> **Prompt engineer** ("AI, build me X") → **Reviewer** who can look at AI-generated code
> and say *"this is right; this part should have been written differently — and here's why."*

That second person is **in the driver's seat** of the AI co-pilot. Getting there is the
entire point.

**The reviewer's habit of mind — the questions AI does *not* ask itself.** AI tends to add a
class or an interface because the pattern *looks* right, not because it reasoned about
need. Your value is asking the *why*:

- *Is this actually reused* — or is it abstraction for its own sake?
- *Why is this interface here?* What would break if it were a plain class?
- *What single responsibility* does this class have? Does every method serve it?
- *What happens when this needs to change* — a new payment type, a new database?

Every construct in this course comes with the question it answers. Learn the question, and
you can interrogate any code — yours or an AI's — instead of just trusting it.

> **A note on practice:** use AI freely to *build*, but **don't** use it to grind LeetCode-style
> problems. Those exist to *exercise your mind* like math drills — the value is in the
> struggle, not the solved output. Think about them; don't auto-complete them.

---

## The Three Forces That Drive All of This

Every step in the evolution is a trade made to improve one or more of these. We return to
this lens in **every module** — for each construct, ask: *which force was failing, and how
did this fix it?*

| Force | The question it answers |
|-------|--------------------------|
| **Developer Experience (DX)** | Can a human read, write, and reason about this without drowning? |
| **Code Quality** | Is it maintainable? Can it change without rotting? Low duplication, clear structure? |
| **Robustness** | Does it stay correct under change, scale, and other people's hands? |

**Memorable framings (use these in the room):**

- **DX / maintainability — write for the next human, because it might be you.**
  Two classic developer jokes make it stick:
  > *"Always code as if the person who ends up maintaining your code is a violent psychopath
  > who knows where you live."*
  >
  > *"When I wrote this, only God and I knew what it did. Now, only God knows."*
  One of those future maintainers is **you, six months from now** — write so you can still
  read it.

- **Robustness — coupling is a future bill.** Real example: you build on **Supabase**, then
  Supabase raises its pricing and you must move to another database. If your code is welded
  to Supabase, the switch takes *months*. In software, **time is money** — not just your
  salary, but the whole business waiting on the change. Good design up front is what keeps
  that bill small. (This is exactly what Module 8's Dependency Inversion buys you.)

The entire history below is the story of **managing complexity** along these three axes —
and of keeping a **human able to verify** what the machine produced.

---

## Course Map — The Evolutionary Timeline

| Module | Era / Construct | The problem it solved | Born in |
|--------|-----------------|------------------------|---------|
| 0 | The complexity problem | Why any of this exists | — |
| 1 | Procedural code & `GOTO` | Sequential instructions, jumps | Assembly, early FORTRAN/BASIC |
| 2 | **Structured programming → loops** | Spaghetti control flow | ALGOL, Dijkstra (1968) |
| 3 | **Functions / procedures** | Duplication, decomposition, scope | ALGOL/Pascal |
| 3½ | *Interlude:* hand-rolled objects | "Bundle data + behavior" as a pattern | C (structs + fn pointers) |
| 4 | **Classes** (data + behavior) | Data and logic drifting apart | Simula 67 |
| 5 | **Namespaces / modules** | Programming "in the large" | Modula-2, Ada, Parnas (1972) |
| 6 | **The rise of OO languages** | Reuse, modeling reality | Smalltalk → C++ → Java/C# |
| 7 | **The concepts driving OO** | Coupling & cohesion | — |
| 8 | **SOLID** | OO done badly still rots | Robert C. Martin (~2000s) |
| 9 | Capstone: walk the whole evolution | Synthesis | — |

The modules are the *syllabus*. They're delivered as **short live sessions** (≈1 hour each)
plus hands-on exercises between them — not a fixed 8–10 day block. Map below.

---

## Delivery — Session Map

| Session | Covers (modules) | Hands-on exercise |
|---------|------------------|-------------------|
| **1 — done** | The AI-era mandate; history (binary→assembly→languages); procedural → loops → functions (walk the runnable banking samples); namespaces; cohesion/coupling; **encapsulation, abstraction, interface-vs-abstract-class** (Modules 0–5, 7-core) | **Banking App** — `deposit`, `withdraw`, `checkBalance` (applies classes + encapsulation; reference solution: `samples/banking/04-classes.ts`) |
| **2 — next** | **Classes & composition**, live — building **tic-tac-toe** from scratch (`Cell` → `Board` → `Game` → `Player`), demonstrating HAS-A composition and delegation | Extend the game: add a second `Player` type, or input validation |
| **3+** | Inheritance & polymorphism in depth; then **SOLID** (Module 8) on the real domains | Refactor a "God class" one principle at a time |
| **Later** | **Capstone** (Module 9); then algorithm practice (LeetCode — *think*, don't AI it); then a complex full-stack app mixing everything | Progressive |

> **On the Banking App exercise:** it's the perfect Module-4 exercise — `deposit`/`withdraw`/
> `checkBalance` forces the learner to put the invariant (no overdraft, no negative deposit)
> *inside* the class so no caller can break it. That's encapsulation felt, not just heard.
> Encourage them to write it *before* looking at `04-classes.ts`.

---

## Module 0 — The Complexity Problem (Why Any of This Exists)

**The core insight to plant first:** A computer will run almost anything. The hard part was
never making the machine work — it's making code that *humans* can keep understanding and
changing as it grows. Every construct in this course is a tool for fighting **complexity**.

- Software cost is dominated by *change*, not initial writing. Most of a system's life is
  maintenance.
- Complexity grows faster than size — twice the code is far more than twice the trouble.
- The history of programming languages is one long arms race against complexity.

**Discussion:** Show a 500-line single-function program (or describe one). Ask: "What
happens when the business rule changes?" Establish the pain that everything else relieves.

---

## Module 1 — Where It Started: Procedural Code & `GOTO`

**First, why languages exist at all** — the ladder every developer should be able to recite:

> **Binary** → **Assembly** → **High-level languages** → (compiler) → back to binary

- **Binary** is what the CPU actually runs. A machine — or an AI — is perfectly happy
  writing it. Humans are not: we can't read or memorize it.
- **Assembly** is one step up (`ADD`, `MOV`, `JMP`…), but it's *brutal* for a specific
  reason worth stating clearly: **instruction sets are processor-specific.** Intel differs
  from AMD; both differ from ARM/Snapdragon (the CISC vs RISC split), and they even change
  *within* a family. There are **thousands** of instructions, and which ones exist depends
  on the chip. Remembering them all is humanly impossible.
- **High-level languages** were invented to escape that: write something close to English,
  and a **compiler** translates it to whatever binary the target CPU needs.

So from the very beginning, the point of a language is **developer experience, code quality,
and robustness** — the three forces — not raw capability. *The machine never needed the
abstraction; the human did.* (In the AI age this is the same lesson: the model can emit any
language, even binary — the constructs exist so a **human stays able to read and verify** it.)

**The era:** 1950s–60s. Assembly, early FORTRAN, COBOL, line-numbered BASIC. Programs were
a linear list of instructions, and control flow was done with **`GOTO`** — "jump to line N."
(BASIC, the line-numbered language in the snippet below, is genuinely old — Microsoft's
early fortune was built on a BASIC interpreter — and shows the `GOTO` style at its purest.)

**A taste of the original style** (BASIC-flavored pseudocode):
```text
10  total = 0
20  i = 1
30  IF i > 5 THEN GOTO 80
40  total = total + i
50  i = i + 1
60  GOTO 30
80  PRINT total
```

**Why this was a problem (all three forces failing):**
- **DX:** Control could jump *anywhere*. To understand line 40 you had to trace every
  `GOTO` that could land there. Reading was archaeology.
- **Code Quality:** This is the literal origin of **"spaghetti code"** — tangled jumps with
  no visible structure.
- **Robustness:** Any edit could silently break a distant jump target. Fragile.

**The turning point:** Edsger Dijkstra's 1968 letter *"Go To Statement Considered Harmful"*
crystallized the industry's frustration and lit the fuse for the next era.

**Exercise:** Hand learners the `GOTO` snippet above and ask them to (a) explain what it
does, (b) add a condition. They'll feel the pain — *that pain is the whole point.*

---

## Module 2 — Structured Programming: The Loop Is Born

**The breakthrough:** The **Böhm–Jacopini theorem (1966)** proved that *any* program can be
built from just three control structures — **sequence, selection (`if`), and iteration
(loop)** — with **no `GOTO` needed**. Languages adopted block structure; the loop replaced
the jump.

**Same task, structured:**
```js
let total = 0;
for (let i = 1; i <= 5; i++) {   // intent is visible in one place
  total += i;
}
console.log(total);
```

**What the loop bought us (the forces recover):**
- **DX:** Control flow is now *local and visible*. The loop's start, condition, and step sit
  together — no hunting for jump targets.
- **Code Quality:** Structure replaces tangle. Code has a shape you can see.
- **Robustness:** Bounded, predictable repetition. The number of iterations can be unknown
  until runtime (loop over however many records exist) — without copy-paste.

**Teach:** `for`, `while`, `for...of`; how each maps to "sequence / selection / iteration."
Frame loops explicitly as *the structured replacement for `GOTO`-based repetition*.

**Exercise:** Convert a small `GOTO`/jump-style routine into a clean loop. Discuss what
became *impossible to express* (arbitrary jumps) — and why losing that was a feature.

---

## Module 3 — Functions / Procedures: Decomposition & Scope

**The next pain:** Even structured code grows. The same block gets copy-pasted; one giant
`main` becomes unreadable; variables from one section corrupt another because everything is
global.

**Duplication smell:**
```js
const totalA = 100 + 100 * 0.1;
const totalB = 250 + 250 * 0.1;   // change the tax rule → hunt every copy
```

**The construct — the function/procedure (subroutine):**
```js
function withTax(amount) {
  const taxRate = 0.1;          // local scope — invisible outside
  return amount + amount * taxRate;
}
const totalA = withTax(100);
const totalB = withTax(250);
```

**What functions bought us:**
- **DX:** A name *is* documentation. `withTax(100)` reads like intent. Big problems split
  into small named pieces (**decomposition** — the heart of structured programming).
- **Code Quality:** **Single source of truth** — change the rule in one place. Duplication
  collapses.
- **Robustness:** **Local scope** isolates state; the call stack gives predictable
  enter/return semantics. A function's internals can't accidentally clobber the caller.

**Teach:** parameters/return, scope, composition (functions calling functions), pure
functions and why they're testable. Note: subroutines are old (EDSAC, 1950s), but
*structured decomposition with local scope* (ALGOL, Pascal) is what made them a design tool.

**Exercise:** Take a 40-line procedural script and decompose it into named functions until
the top level reads like a table of contents.

**Bridge — why functions alone aren't enough (the PHP cautionary tale):** functions are a
breakthrough, but they don't *organize themselves*. Point learners at PHP's standard
library: roughly **1,200 built-in functions** in one flat global namespace, with famously
inconsistent naming — `str_replace` (prefix) vs `strrev` (no underscore) vs `htmlspecialchars`.
The running joke is *"before you write anything in PHP, go check whether a function for it
already exists."* That's the smell: when a codebase has thousands of loose functions, you
can't **find** them, **remember** them, or stop two of them **colliding**. This pain pushes
us two directions at once — **group related functions + their data together** (classes,
Module 4) and **carve the global space into named regions** (namespaces, Module 5).

---

## Interlude 3½ — Hand-Rolled Objects: When Procedural Programmers Faked Classes

> **Read this as *conceptual*, not chronological.** Classes (Simula 67) actually *predate*
> C (1972), so this isn't a step *before* the class — it's the opposite: people reaching for
> the not-yet-available `class` keyword in a language that didn't have it. The point here is
> to prove that **"bundle data with behavior" is a pattern developers invent on their own** —
> the class is just the language *formalizing* it. (We'll close the loop in Module 6, where
> this exact idiom became *"C with Classes" → C++*.)

**The observation:** Give programmers only structs and functions (Module 3), and on a big
enough system they will *reinvent objects by hand*. C — still doing this today in the Linux
kernel, GTK/GObject, and CPython — is the canonical case.

**How objects are faked in C (the mechanism, precisely):**
```c
/* 1. struct groups the data — a record */
struct Account { double balance; };

/* 2. functions that take an explicit `self` pointer = methods with a manual `this` */
void account_deposit(struct Account *self, double amt) {
    if (amt > 0) self->balance += amt;          /* encapsulation by *convention*, not enforced */
}

/* 3. function POINTERS stored in a struct = virtual methods / dynamic dispatch.
      A shared struct-of-function-pointers is literally a vtable —
      exactly what a C++ compiler generates for you. */
struct Shape {
    double (*area)(struct Shape *self);          /* "method" resolved at runtime */
};

/* 4. an enum type-tag + switch = tagged-union dispatch — "poor man's polymorphism" */
enum ShapeKind { CIRCLE, RECTANGLE };
```

**What this reveals — map each hack to what `class` automates for you:**

| Hand-rolled in C | What the `class` keyword gives you for free |
|------------------|---------------------------------------------|
| Pass `self` to every function manually | Implicit `this` |
| Function pointers in a struct (vtable) | Virtual methods / polymorphism |
| "Don't touch `.balance` directly" (convention) | Compiler-enforced encapsulation (`#private`) |
| `enum` tag + `switch` to pick behavior | Dynamic dispatch with no `switch` at all |

**Why it matters to the thesis:** the pain of doing all of this *by hand and by discipline*
— no enforcement, easy to corrupt state, dispatch logic smeared across `switch` statements
— is exactly the pain the **class** construct (next module) removes by building it into the
language. The class didn't appear from nowhere; it's a hand-rolled pattern promoted to a
first-class feature.

**Optional exercise (for those who can read C):** show the `struct Account` above and ask
"what stops anyone from writing `acct.balance = -999;` directly?" Answer: *nothing but
convention.* That missing guarantee is precisely what Module 4 fixes.

---

## Module 4 — Classes: When Data and Behavior Stopped Drifting Apart

**The pain that functions alone couldn't fix:** In procedural code, **data** (records,
structs) and the **functions** that operate on it are separate. As the system grows:
- Many functions take the same data and can each leave it in an invalid state.
- Nothing guarantees the rules that protect the data are actually applied.

```js
// Data here, the rules that should protect it scattered elsewhere
let balance = 100;
function withdraw(b, amt) { return b - amt; }  // forgot to check funds? nothing stops you
balance = withdraw(balance, 999);              // now -899. Corrupt.
```

**The construct — the class (data + the behavior that guards it, together):**
```js
class BankAccount {
  #balance;                              // the data is owned & hidden
  constructor(balance = 0) { this.#balance = balance; }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;             // the only legal way to change balance
  }
  get balance() { return this.#balance; }
}
```

**Historical anchor:** **Simula 67** (Ole-Johan Dahl & Kristen Nygaard, Norway) introduced
**classes, objects, and inheritance** — to *model real-world simulations*. This is the
literal birth of object orientation.

**What classes bought us:**
- **DX:** Code now speaks the **domain's vocabulary** — `account.withdraw(50)`.
- **Code Quality:** **Cohesion** — data lives with the operations that belong to it.
- **Robustness:** **Encapsulation** — invalid states become *impossible to construct* from
  outside. One blueprint, many independent instances.

**Exercise:** Refactor the procedural `balance`/`withdraw` code into a class where no
external code can ever produce a negative balance.

---

## Module 5 — Namespaces / Modules: Programming "In the Large"

**The pain at scale:** Thousands of functions and classes in one space. Two teammates both
define `format()` → **name collision**. Nobody can find anything. Internal helpers leak
everywhere.

**The construct — modules/namespaces (each file is its own namespace):**
```js
// money.js
export function format(amount) { return `$${amount.toFixed(2)}`; }
```
```js
// date.js
export function format(d) { return d.toISOString(); }   // same name, no conflict
```
```js
// app.js
import { format as money } from "./money.js";
import { format as date }  from "./date.js";
```

**Historical anchor:** David Parnas's 1972 paper *"On the Criteria To Be Used in Decomposing
Systems into Modules"* introduced **information hiding** — modularize around *secrets that
might change*, not around steps. **Modula-2** and **Ada packages** built it into languages;
later, C++ `namespace`, Java/Python packages, JS modules.

**What modules bought us:**
- **DX:** Findability — code grouped by responsibility stays navigable at 100k+ lines.
- **Code Quality:** **Information hiding** — a module exposes only what it `export`s; the
  rest stays private and free to change.
- **Robustness:** No collisions; clear boundaries between subsystems; reusable, shippable
  units (this is what packages/npm are).

**Exercise:** Split a single-file program into `models/`, `services/`, `utils/` modules.
Observe how the entry point becomes a high-level summary.

---

## Module 6 — The Rise of Object-Oriented Languages

**Now zoom out:** Modules 4–5 gave us classes and boundaries. This module tells the story of
*how OO languages evolved*, each generation adding what the last one lacked — and **why**.

| Language (≈year) | What it added | The problem it was attacking |
|------------------|---------------|------------------------------|
| **Simula 67** | Classes, objects, inheritance | Modeling real-world simulations |
| **Smalltalk** (1970s, Alan Kay) | "Everything is an object," message passing; coined *object-oriented* | Pure, uniform OO; dynamic, interactive DX |
| **C++** (early 1980s, Stroustrup) | OO **on top of C**, with performance — literally *"C with Classes"*, formalizing the hand-rolled idiom from Interlude 3½ | Make OO practical for systems/industry |
| **Java** (1995) | Managed memory, "write once run anywhere," big standard library | Safety + portability for the internet era |
| **C#** (2000) / modern TS | Properties, interfaces, generics, async | Productivity + type safety at scale |

**The throughline:** each generation traded raw control for **safety, productivity, and
abstraction** — i.e., DX, quality, and robustness again. OO won the mainstream because it
let teams **model the problem domain** and **reuse** behavior.

**Discussion:** Why did "everything is an object" (Smalltalk) and "OO over C" (C++) lead to
*different* cultures? Connect to how JavaScript (prototypes) and TypeScript (classes +
interfaces) sit in this lineage.

---

## Module 7 — The Concepts That Actually Drive Object Orientation

OO isn't the four pillars for their own sake — the pillars exist to serve two deeper goals:
**low coupling** and **high cohesion**. Teach the pillars *as means to those ends*.

**The two master goals:**
- **High cohesion** — things that change together live together. (A class does *one* job well.)
- **Low coupling** — modules know as little about each other as possible. (Change one, the
  rest don't break.)

**An analogy that lands — database normalization.** Anyone who's designed tables knows the
rule of **2nd normal form**: *every column must relate directly to the table's primary key;*
if it doesn't, it belongs in a different table. **Cohesion is the same rule for classes:**
every method should relate directly to the class's one job. A method that doesn't belong is
a column in the wrong table — split it out. (Low coupling is the flip side: just as you can
swap **Postgres for MySQL** without rewriting your app *if* you didn't weld to one, you can
swap one class for another *if* they only talk through a thin contract.)

**A reviewer's warning — don't abstract for its own sake.** Classes and interfaces exist for
a *reason*: **code reuse** and **the ability to swap implementations**. People (and AIs) add
them reflexively — "there's logic here, so it must need an interface." Before you accept one,
ask: *Is this actually reused in multiple places? Will we really swap it out?* If not, the
abstraction is just cost. This judgment is exactly where a human reviewer beats a pattern-
matching co-pilot.

> **Teach these on *real* code, never on `Shape`/`Animal`.** The shapes-and-animals examples
> you find online are abstract toys that hide *why* the pillar matters. Use a domain the
> learner can reason about — here, an **interest calculator** and **bank accounts**. (Runnable
> versions: `samples/banking/07a-encapsulation.ts`, `07b-abstraction.ts`,
> `07c-interface-vs-abstract-class.ts`.)

**The four pillars, each tied to a force:**

1. **Encapsulation** — hide internals, expose only what the *user of the class* needs. →
   *Robustness:* invalid states impossible from outside. Worked example: an
   `InterestCalculator`. It can do simple *or* compound interest, with private state
   (`#principal`, `#rate`) and a private helper (`#round`) that no caller should see — plus
   validation in the constructor so an invalid calculator can't even be built. You expose
   `simpleInterest(...)` / `compoundInterest(...)`; you hide *how*. **You're a designer
   deciding the public API** — keep it relevant to the people who'll use it, everything else
   `#private`. (Full runnable version: `samples/banking/07a-encapsulation.ts`.)
   ```ts
   class InterestCalculator {
     #principal: number; #rate: number;
     // ...constructor...
     calculate(): number { return this.#round(this.#principal * this.#rate); }
     #round(n: number): number { return Math.round(n * 100) / 100; }  // hidden detail
   }
   ```
2. **Abstraction** — define *what* as a contract (an `interface`), defer *how* entirely. →
   *DX + parallel teamwork.* The killer motivation isn't "hiding" — it's **letting two people
   build at once**. Team A needs employee data to build payroll; Team B hasn't finished the
   employee module. Team B publishes an *interface* (the contract); Team A codes against it
   *today* while the real implementation is written in parallel.
   ```ts
   interface EmployeeRepository {                 // a contract, zero implementation
     getEmployees(): Employee[];
   }
   // Payroll can be written against this NOW, before any real repository exists.
   ```
3. **Inheritance** — factor the common part out of many classes (think *"take the common
   factor out"* in algebra). → *Code Quality:* share code instead of copy-pasting it.
   Real example: a `BaseEntity` carrying the fields *every* table row needs.
   ```ts
   abstract class BaseEntity {                    // id, createdBy, createdOn, isDeleted...
     id!: string; createdOn!: Date; isDeleted = false;
   }
   class UserEntity extends BaseEntity { name!: string; }   // adds only what's user-specific
   ```
   (Teach with caution — overuse couples children to parents; see Module 8's LSP.)
4. **Polymorphism** — same call, behavior depends on the object. → *Robustness + DX:* add
   new types *without rewriting* callers. Real example: `SavingsAccount` and `CheckingAccount`
   both answer `monthlyInterest()` differently; one loop handles all account types.
   ```ts
   const accounts: Account[] = [new SavingsAccount(...), new CheckingAccount(...)];
   for (const a of accounts) a.applyMonthEnd();   // no if/else over account "type" strings
   ```

**Key bridge to SOLID:** Polymorphism + abstraction are what let code be *extended without
modification*. Hold that thought — it's literally the next module.

### Composition vs. Inheritance — "HAS-A" beats "IS-A"

The four pillars include inheritance (an "**IS-A**" relationship: a `SavingsAccount` *is an*
`Account`). But inheritance is overused. The everyday workhorse of OO design is
**composition** — building an object *out of* other objects it **HAS**:

- **Inheritance (IS-A):** `class SavingsAccount extends Account` — reuse by *becoming* a kind
  of the parent. Powerful, but it **tightly couples** the child to the parent's internals,
  and you only get one parent.
- **Composition (HAS-A):** an object holds other objects as fields and delegates to them.
  Looser, more flexible, and you can recombine pieces freely.

**Worked example — tic-tac-toe (the next working session):**

```ts
class Cell { /* knows only its own mark: "X" | "O" | "" */ }
class Board {
  #cells: Cell[];        // a Board HAS-A grid of Cells   (composition)
}
class Game {
  #board: Board;         // a Game HAS-A Board            (composition)
  #players: Player[];    // a Game HAS some Players        (composition)
}
```

A `Game` is **not** a `Board` and **not** a `Player` — so inheritance would be wrong. A `Game`
*has* a `Board` and *has* `Players`, and **delegates** to them (`game` asks `board` to place a
mark; `board` asks the `cell`). That's composition: each class stays small, cohesive, and
independently testable, and you can swap a piece (e.g. a different `Player`) without touching
the rest.

**The guideline — "favor composition over inheritance":** reach for inheritance only when
there's a genuine *is-a* relationship *and* you want the subtype usable wherever the base is
(that's Module 8's Liskov rule). For everything else — which is most things — **compose**.

### Interface vs. Abstract Class (the standard interview question)

These get confused constantly, so make the distinction crisp — it's asked in almost every
OO interview:

| | **Interface** | **Abstract class** |
|--|---------------|--------------------|
| Answers | *"What can this thing do?"* (a **capability/contract**) | *"What do these things share?"* (**common code**) |
| Contains | Only signatures — **no implementation** | Real fields + methods, shared by all children |
| A class can have | **Many** (`implements A, B, C`) | **One** parent (`extends`) |
| Should be | **Small and focused** — one capability | A factored-out **common base** |
| Real example | `class Report implements IPdfExport, ICsvExport` — you instantly see its *capabilities* | `class UserEntity extends BaseEntity` — inherits id/timestamps for free |

One-line memory hook: **interface = a promise about *capability*; abstract class = the
*common factor* pulled out so children don't repeat it.**

**Exercise:** Build an `InterestCalculator` (simple vs compound) and apply encapsulation —
make every implementation detail `#private`, exposing only what a caller needs. Then write an
`EmployeeRepository` *interface* and a payroll function that consumes it, *before* writing any
real repository — proving abstraction lets work proceed against a contract. (Real syntax, real
domain — **not** shapes.)

---

## Module 8 — SOLID: Principles to Keep OO From Rotting

**The motivating problem:** OO *alone* doesn't guarantee good design — you can write rigid,
tangled, fragile OO just as easily as good OO. By the late 1990s, **Robert C. Martin
("Uncle Bob")** codified five principles (the **SOLID** acronym arranged by Michael Feathers)
that name the specific failure modes and their cures.

Teach each as: **the smell → the principle → the fix**, and tie back to coupling/cohesion.
The one-liners below are quick mnemonics; the **runnable** versions apply all five to the
real domains — `samples/banking/08-solid.ts` and `samples/pos/08-solid.ts`.

### S — Single Responsibility Principle
*A class should have one reason to change.* (→ high **cohesion**)
**Smell:** A `User` that validates, saves to a DB, *and* sends email — three reasons to change.
**Fix:** Split into `User`, `UserRepository`, `EmailService`.

### O — Open/Closed Principle
*Open for extension, closed for modification.*
**Smell:** A growing `if/else` over payment types — every new type edits old code.
**Fix:** Program to an interface; add a new class instead of editing existing logic.
```ts
interface PaymentMethod { pay(a: number): void; }
class Card implements PaymentMethod   { pay(a: number) {/*...*/} }
class PayPal implements PaymentMethod { pay(a: number) {/*...*/} }
// New method = new class. checkout() never changes.  ← polymorphism from Module 7
```

### L — Liskov Substitution Principle
*A subtype must be usable anywhere its base is, with no surprises.*
**Smell (toy mnemonic):** `Penguin extends Bird` but `fly()` throws — substitution breaks callers.
**Smell (real):** `FixedDepositAccount extends Account`, but `withdraw()` throws before the
maturity date. Any code that holds an `Account` and calls `withdraw()` now breaks when handed
a fixed deposit — the subtype isn't truly substitutable.
**Fix:** Don't force a subclass into a contract it can't honor (here: don't make a
non-withdrawable account a subtype of a withdrawable one — *compose* or model it differently).
Inheritance is a *promise*, not just code reuse. (→ keeps **coupling** honest.)

### I — Interface Segregation Principle
*Don't force a class to implement methods it doesn't use.*
**Smell:** One fat `Machine` interface (`print`, `scan`, `fax`) — a basic printer must
implement `fax()`.
**Fix:** Many small, focused interfaces (`Printer`, `Scanner`).

### D — Dependency Inversion Principle
*Depend on abstractions, not concretes.* (→ low **coupling**)
**Smell:** `OrderService` does `new MySQLDatabase()` — can't test, can't swap.
**Fix:** Depend on a `Database` interface; inject the concrete one from outside.
```ts
interface Database { save(x: unknown): void; }
class OrderService {
  #db: Database;
  constructor(db: Database) { this.#db = db; }  // real DB or fake injected — same code
}
```

**The synthesis:** SOLID is not five random rules — it's five named tactics for achieving
the *same two goals* from Module 7: **high cohesion, low coupling**, so code keeps changing
cheaply. That is the destination the entire evolution was walking toward.

**Module exercise:** Hand learners a deliberate "God class" and refactor it one principle at
a time, narrating which force each fix restores.

---

## Module 9 — Capstone: Walk the Whole Evolution in One Session

Give learners a single **messy procedural script** (one long file: globals, copy-pasted
blocks, a jump-heavy structure) and have them evolve it, live, through every stage:

1. **Structure it** — replace tangled control flow with clean loops/conditionals.
2. **Decompose it** — extract named functions; kill duplication; introduce scope.
3. **Objectify it** — bundle data with its guarding behavior into classes (encapsulation).
4. **Modularize it** — split into namespaced modules with clear boundaries.
5. **Apply OO concepts** — introduce polymorphism for a family of types.
6. **Apply SOLID** — invert a dependency (DIP), make it open/closed for new types.

**Deliverable:** the refactored project **plus a written reflection**: *"At each stage, which
of the three forces (DX, quality, robustness) was failing, and how did the construct fix it?"*
This reflection is the real assessment — it proves they understand constructs as *solutions
to problems*, which is the entire thesis of the course.

---

## Assessment & Facilitation

- **Per module:** a "feel the pain → apply the fix" exercise + a one-line *why* question.
- **Throughline check:** at every step, learners must name which of the three forces drove
  the construct. If they can do that for all of Modules 1–8, they've got it.
- **Facilitator rule:** always show the *painful* / *historical* version first. The
  construct only makes sense once the problem has been felt.
- **Real code, not toys:** demonstrate every concept on a domain the learner can reason about
  (the `samples/` use banking, a coffee-shop POS, and tic-tac-toe). **Avoid the generic
  `Shape`/`Animal` examples** — they hide the *why*. Use **real syntax in a real language**,
  not pseudocode.
- **The AI-reviewer drill:** for each concept, have learners *critique* a snippet — "is this
  interface earning its place? what's this class's one responsibility?" The aim is the
  driver's seat (see the AI-Era Mandate), not just writing the construct.
- **"Explain it to someone else":** the strongest check is asking a learner to write their own
  worked sample that *teaches* a pillar (e.g., encapsulation via an interest calculator).
  If they can teach it on real code, they own it.

## Suggested References (for the facilitator)
- Dijkstra, *"Go To Statement Considered Harmful"* (1968)
- Böhm & Jacopini, structured program theorem (1966)
- Parnas, *"On the Criteria To Be Used in Decomposing Systems into Modules"* (1972)
- Dahl & Nygaard, Simula (1967); Alan Kay on Smalltalk
- Robert C. Martin, *Agile Software Development: Principles, Patterns, and Practices* (SOLID)
