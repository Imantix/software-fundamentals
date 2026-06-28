// ============================================================================
// STAGE 3 — FUNCTIONS  🎮
// ----------------------------------------------------------------------------
// Pain from stage 2: the logic worked, but it was a loose pile of statements.
// "Make a move", "find the winner", "print the board" weren't *things* — you
// couldn't reuse them or play a second game without copying the whole script.
//
// Functions give each task a NAME, one home, and a typed contract.
// ============================================================================

type Mark = "X" | "O";
type Cell = Mark | "";       // a cell is X, O, or empty
type Board = Cell[];         // the board is just 9 cells

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function emptyBoard(): Board {
  return ["", "", "", "", "", "", "", "", ""];
}

/** Place a mark — returns true if the move was legal (cell was empty). */
function makeMove(board: Board, index: number, mark: Mark): boolean {
  if (board[index] !== "") return false; // can't play an occupied cell
  board[index] = mark;
  return true;
}

/** The winner ("X"/"O"), or "" if none yet. One loop over the lines. */
function findWinner(board: Board): Cell {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return "";
}

function render(board: Board): string {
  const cell = (i: number) => (board[i] === "" ? String(i) : board[i]);
  return [
    ` ${cell(0)} | ${cell(1)} | ${cell(2)}`,
    ` ${cell(3)} | ${cell(4)} | ${cell(5)}`,
    ` ${cell(6)} | ${cell(7)} | ${cell(8)}`,
  ].join("\n");
}

// Top level now reads like the rules of the game, not a pile of array pokes.
const board = emptyBoard();
const moves: Array<[number, Mark]> = [
  [4, "X"], [0, "O"], [8, "X"], [1, "O"], [2, "X"], [6, "O"], [5, "X"],
];

for (const [index, mark] of moves) {
  makeMove(board, index, mark);
}
console.log(render(board));
const w = findWinner(board);
console.log(w ? `Winner: ${w}` : "No winner");

// ============================================================================
// WHAT FUNCTIONS BOUGHT US
//
//  • NAMING = DOCUMENTATION: makeMove / findWinner / render say what they do.
//  • REUSE: call them for game 2, game 3, a test — no copy-paste.
//  • COMPOSITION: a play-loop is built from small, focused functions.
//
// REMAINING PAIN: `board` is still a naked array. makeMove() POLITELY checks
// for an occupied cell — but nothing FORCES callers to go through it. Anyone
// can write board[4] = "X" directly and skip the rule. The data has no guardian.
// And the related pieces (board + rules + players) are scattered, not bundled.
// Stage 4 (classes & composition) fixes both.
// ============================================================================

// ── Try it ──
// Bypass the rule: `board[4] = "O"` directly, overwriting X. Nothing stops you.
// That hole is exactly what encapsulation (next stage) closes.
