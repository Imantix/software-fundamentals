# Software Fundamentals — The Evolution of Coding Constructs

A training program on **why** software is structured the way it is — not just the syntax.
It walks the evolution of programming constructs as a series of engineered answers to real
problems: **procedural code → loops → functions → classes → namespaces → OOP → SOLID**.

The guiding idea for the AI era: move from *prompt engineer* ("AI, build me X") to
**reviewer** who can look at AI-generated code and judge *"this is right; this should have
been written differently — and here's why."*

## What's here

- **[`training-plan.md`](training-plan.md)** — the full curriculum: the thesis, the three
  forces (developer experience, code quality, robustness), a module-by-module evolution, and
  a session-by-session delivery map.
- **[`samples/`](samples/)** — **runnable** TypeScript companions. The same evolution is told
  in parallel domains so you can follow whichever clicks:
  - 🏦 `samples/banking/` — accounts, interest, withdrawals *(complete)*
  - ☕ `samples/pos/` — a coffee-shop point-of-sale *(complete)*
  - 🎮 `samples/tictactoe/` — built live to demonstrate classes & composition *(in progress)*

Each stage file is numbered (`01-procedural` → `08-solid`), runs and prints output, opens by
naming the pain the previous stage left, and ends with a `// ── Try it ──` experiment.

## Running the samples

No build step. Requires **Node 23+** (tested on Node 26), which runs TypeScript directly.

```bash
node samples/banking/01-procedural.ts     # any stage
node samples/banking/05-modules/main.ts   # the modules stage
node samples/pos/08-solid.ts              # SOLID on a real domain
```

The `03b-handrolled-objects.c` interlude is illustrative; compile it only if you want to:

```bash
cc samples/banking/03b-handrolled-objects.c -o /tmp/demo && /tmp/demo
```

## How to read it

Read the stages **in order** within a domain — the learning is in the *diff* between one
stage and the next. Pair each with the matching module in `training-plan.md`.

---

*An [Imantix](https://github.com/Imantix) software-fundamentals training resource.*
