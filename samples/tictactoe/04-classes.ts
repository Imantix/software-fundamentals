// ============================================================================
// STAGE 4 — CLASSES & COMPOSITION  🎮   ← the heart of this session
// ----------------------------------------------------------------------------
// Pain from stage 3: `board` was a naked array. makeMove() only POLITELY
// checked the rules; `board[4] = "X"` skipped them entirely. And the pieces
// (cells, board, turn-taking) were scattered.
//
// We fix it by building SMALL classes that COMPOSE:
//
//        Game  ──has-a──▶  Board  ──has-a──▶  Cell × 9
//          │
//          └── tracks whose turn it is
//
// Each class guards its own state, and the bigger ones DELEGATE down to the
// smaller ones. A Game is NOT a Board and NOT a Cell — it HAS them. That
// "has-a" relationship is COMPOSITION, the everyday workhorse of OO design.
// ============================================================================

type Mark = "X" | "O";

// ── CELL: the smallest unit. Owns one piece of state and the rule that
//    protects it — you can't overwrite an occupied cell. ─────────────────────
class Cell {
  #mark: Mark | "" = "";

  get mark(): Mark | "" {
    return this.#mark;
  }
  isEmpty(): boolean {
    return this.#mark === "";
  }
  place(mark: Mark): void {
    if (!this.isEmpty()) throw new Error("Cell already taken");
    this.#mark = mark;
  }
}

// ── BOARD: HAS-A grid of 9 Cells (composition). It doesn't re-implement cell
//    rules — it DELEGATES to each Cell, and adds board-level knowledge
//    (winning lines, fullness). ───────────────────────────────────────────────
class Board {
  static readonly LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  // composition: the Board is built OUT OF Cells it owns.
  #cells: Cell[] = Array.from({ length: 9 }, () => new Cell());

  place(index: number, mark: Mark): void {
    this.#cells[index].place(mark); // delegate the rule down to the Cell
  }

  winner(): Mark | "" {
    for (const [a, b, c] of Board.LINES) {
      const m = this.#cells[a].mark;
      if (m !== "" && m === this.#cells[b].mark && m === this.#cells[c].mark) {
        return m;
      }
    }
    return "";
  }

  isFull(): boolean {
    return this.#cells.every((cell) => !cell.isEmpty());
  }

  render(): string {
    const show = (i: number) => (this.#cells[i].isEmpty() ? String(i) : this.#cells[i].mark);
    return [
      ` ${show(0)} | ${show(1)} | ${show(2)}`,
      ` ${show(3)} | ${show(4)} | ${show(5)}`,
      ` ${show(6)} | ${show(7)} | ${show(8)}`,
    ].join("\n");
  }
}

// ── GAME: HAS-A Board (composition) and owns the turn order. It DELEGATES the
//    move down to the Board (which delegates to the Cell), and adds the only
//    thing it's responsible for: whose turn it is and whether the game is over. ─
class Game {
  #board: Board = new Board();
  #current: Mark = "X";
  #over = false;

  get board(): Board {
    return this.#board;
  }
  get currentPlayer(): Mark {
    return this.#current;
  }

  move(index: number): void {
    if (this.#over) throw new Error("Game is already over");
    this.#board.place(index, this.#current); // delegate: Game → Board → Cell

    if (this.#board.winner() || this.#board.isFull()) {
      this.#over = true;
    } else {
      this.#current = this.#current === "X" ? "O" : "X"; // switch turns
    }
  }

  status(): string {
    const w = this.#board.winner();
    if (w) return `Winner: ${w}`;
    if (this.#board.isFull()) return "Draw";
    return `Turn: ${this.#current}`;
  }
}

// ── DEMO: drive the game through its public surface only. ────────────────────
const game = new Game();
for (const index of [4, 0, 8, 1, 2, 6, 5]) {
  game.move(index); // the Game alternates X/O for us — we never touch a Cell
}
console.log(game.board.render());
console.log(game.status());

// The rule is now UNBREAKABLE — try to play a taken cell:
try {
  const g2 = new Game();
  g2.move(4); // X
  g2.move(4); // O tries the same cell
} catch (err) {
  console.log("Blocked:", (err as Error).message); // "Cell already taken"
}

// ============================================================================
// WHAT CLASSES + COMPOSITION BOUGHT US
//
//  • ENCAPSULATION (enforced): a Cell can't be overwritten; you can't poke the
//    board array directly — there isn't one to poke. Invalid states gone.
//  • COMPOSITION (has-a): Game HAS-A Board HAS Cells. Each class is tiny,
//    cohesive, and testable on its own. We REUSE Cell's rule everywhere by
//    delegation instead of re-checking it.
//  • Why not inheritance? A Game is not a kind of Board, and a Board is not a
//    kind of Cell — there's no "is-a" here. Composition is the right tool.
//
// NEXT: the Game still hardcodes the moves. Real games have PLAYERS that decide
// moves — a human, a random AI, a smart AI. Stage 7 composes Players into the
// Game and swaps them polymorphically.
// ============================================================================

// ── Try it ──
// Add a `reset()` to Game that does `this.#board = new Board()`. Notice you
// rebuild from the small pieces — composition makes the whole thing easy to
// reason about and reassemble.
