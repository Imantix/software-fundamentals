# Tic-Tac-Toe — Composition & Encapsulation (visual) 🎮

A **visual** companion for Session 2. Where the CLI stages (`../01`…`../04`) show the
*evolution* of constructs, this one zooms in on two ideas and lets you *see* them in a
real, clickable UI — in the spirit of the official React tutorial and the
[Coding Train](https://thecodingtrain.com)'s build-it-up-from-small-pieces style.

## The whole idea in one picture

```
Square  ──composed into──▶  Row  ──composed into──▶  Board  ──▶  Game
(one cell:                  (3 Squares)              (3 Rows +    (owns the
 owns its look & click)                               win check)   game state)
```

- **Encapsulation** — a `Square` owns how it looks and what happens when it's clicked.
  It knows *nothing* about the board, the rules, or the other cells.
- **Composition (HAS-A)** — a `Row` *has* Squares, a `Board` *has* Rows, a `Game` *has* a
  Board. Bigger things are built **out of** smaller things — never by inheritance
  (a `Board` is not a *kind of* `Row`).
- **Win condition lives on the Board** — only something that can see all nine cells (every
  row, column, and diagonal) can decide a winner. A single `Square` can't.
- **Why no `Column` component?** Rows are the composition unit; the same Squares can't be
  owned by *both* a row and a column. Columns live only in the board's win-condition lines.

## Run it

No build step, no install — just open the file:

```bash
open index.html        # macOS
# or double-click index.html in your file explorer
```

> React and Babel load from a CDN, so the first open needs an internet connection. The JSX
> is transpiled in the browser (great for a zero-setup demo; for a production app you'd use
> a real build like Vite).

## Try it (good session exercises)

1. **Make the cell smarter (encapsulation):** give `Square` its own hover tooltip showing its
   index — without touching `Board` or `Game`.
2. **Swap a piece (composition):** add a tiny scoreboard component next to `Board`; notice the
   `Game` just *composes* one more child.
3. **Move the win check:** try (and discuss why it's awkward) to compute the winner inside a
   `Square` instead of the `Board`. The cell can't see enough — that's the lesson.
