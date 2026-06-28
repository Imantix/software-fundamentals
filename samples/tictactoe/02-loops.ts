// ============================================================================
// STAGE 2 — LOOPS  🎮
// ----------------------------------------------------------------------------
// Pain from stage 1: EIGHT copy-pasted win-checks, and nine loose variables.
//
// Two insights turn that into a loop:
//   • the board is really a LIST of 9 cells (an array), not 9 named variables;
//   • the 8 winning lines are DATA — just triples of indices we can loop over.
// ============================================================================

// The board is one array now. Index = position 0..8.
const board = ["X", "O", "X", "O", "X", "O", "X", "", ""];

// The 8 winning lines, expressed as DATA instead of 8 hand-written ifs.
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Print the board with a loop instead of three hardcoded lines.
for (let row = 0; row < 3; row++) {
  const start = row * 3;
  console.log(` ${board[start]} | ${board[start + 1]} | ${board[start + 2]}`);
}

// Detect a winner by LOOPING the lines — one check, not eight.
let winner = "";
for (const [a, b, c] of WINNING_LINES) {
  if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
    winner = board[a];
    break;
  }
}

console.log(winner ? `Winner: ${winner}` : "No winner yet");

// ============================================================================
// WHAT THE LOOP BOUGHT US
//
//  • The 8 checks collapsed into ONE loop over a data table. Add a line to
//    WINNING_LINES and the detector just handles it — no new code.
//  • The board is a single value you can pass, copy, or reset.
//  • A 4×4 board? Generate the lines into the table; the loop is unchanged.
//
// REMAINING PAIN: this logic is all loose at the top level. "Make a move",
// "check the winner", "print the board" aren't named things you can reuse —
// they're just statements sitting in a script. Stage 3 (functions) names them.
// ============================================================================

// ── Try it ──
// Set board[7] = "X" and board[8] = "X". Column/diagonal? Let the loop tell you
// instead of tracing indices by eye.
