# Code Samples — The Evolution of Coding Constructs

These are the **runnable companions** to `../training-plan.md`. The idea: instead of
disconnected snippets, you watch **one program get better, stage by stage**, in **three
different domains**. Pick whichever clicks for you — the *construct* being taught is
identical across all three.

| Domain | Folder | What it models | Status |
|--------|--------|----------------|--------|
| 🏦 Banking | `banking/` | Accounts, interest, fees, withdrawals | ✅ complete |
| ☕ Coffee POS | `pos/` | Orders, items, discounts, payments | ✅ complete |
| 🎮 Tic-Tac-Toe | `tictactoe/` | Board, moves, win detection, players | 🚧 Session 2: stages `01`–`04` + a **visual** [`react-composition/`](tictactoe/react-composition/) demo done; `05`/`07`/`08` to come |

## The stages (same in every domain)

| File | Stage | The construct & the pain it removes |
|------|-------|--------------------------------------|
| `01-procedural.js` | Procedural | Sequential code, magic numbers, copy-paste |
| `02-loops.js` | Loops | Stop repeating yourself by hand |
| `03-functions.js` | Functions | Name a task, reuse it, kill duplication |
| `03b-handrolled-objects.c` | *Interlude* | Faking objects in C (structs + function pointers) |
| `04-classes.js` | Classes | Bundle data with the behavior that guards it |
| `05-modules/` | Modules | Split into files; boundaries & no name clashes |
| `07-oop.ts` | OOP pillars | Encapsulation, inheritance, polymorphism |
| `08-solid.ts` | SOLID | Keep the design from rotting as it grows |

> The numbering matches the plan's modules (there's no `06` file — Module 6 is the
> *history* of OO languages, a discussion, not code).

## How to run

Everything runs on **Node 18+** with no build step. Node 23+ runs TypeScript directly;
this repo was tested on Node 26.

```bash
node banking/01-procedural.js      # any .js stage
node banking/07-oop.ts             # .ts stages run directly on modern Node
node banking/05-modules/main.js    # the modules stage has a main entry point
```

The C interlude is illustrative — compile it only if you have a C compiler and want to:
```bash
cc banking/03b-handrolled-objects.c -o /tmp/demo && /tmp/demo
```

## How to read each file

Every file:
1. **Runs and prints output** — so you see it work, not just read it.
2. Opens with a comment block: *what stage this is, and what pain the previous stage left.*
3. Ends with a `// ── Try it ──` section you can edit to feel the difference yourself.

Read them **in order** within a domain. The whole point is the *diff* between stages.
