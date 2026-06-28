// ============================================================================
// STAGE 1 — PROCEDURAL  🎮
// ----------------------------------------------------------------------------
// Tic-tac-toe, the way it first comes out of your head: a hardcoded board and
// a wall of copy-pasted checks. It WORKS — and that's the trap.
//
// Board layout (indices):     positions filled in below:
//    0 | 1 | 2                   X | O | X
//    3 | 4 | 5                   O | X | O
//    6 | 7 | 8                   X |   |
//
//   Run:  node 01-procedural.ts
// ============================================================================

// Nine separate values — the board has no structure, it's just loose cells.
const c0 = "X", c1 = "O", c2 = "X";
const c3 = "O", c4 = "X", c5 = "O";
const c6 = "X", c7 = "",  c8 = "";

console.log(` ${c0} | ${c1} | ${c2}`);
console.log(` ${c3} | ${c4} | ${c5}`);
console.log(` ${c6} | ${c7} | ${c8}`);

// Who won? We must check all EIGHT winning lines, by hand, one if-statement
// each. Look how much identical code this is — and how easy to mistype an index.
let winner = "";
if (c0 !== "" && c0 === c1 && c1 === c2) winner = c0; // row 0
if (c3 !== "" && c3 === c4 && c4 === c5) winner = c3; // row 1
if (c6 !== "" && c6 === c7 && c7 === c8) winner = c6; // row 2
if (c0 !== "" && c0 === c3 && c3 === c6) winner = c0; // col 0
if (c1 !== "" && c1 === c4 && c4 === c7) winner = c1; // col 1
if (c2 !== "" && c2 === c5 && c5 === c8) winner = c2; // col 2
if (c0 !== "" && c0 === c4 && c4 === c8) winner = c0; // diag ↘
if (c2 !== "" && c2 === c4 && c4 === c6) winner = c2; // diag ↙

console.log(winner ? `Winner: ${winner}` : "No winner yet");

// ============================================================================
// FEEL THE PAIN
//
//  1. COPY-PASTE: eight near-identical checks. Miss one, or fumble one index
//     (c5 vs c8), and the bug is silent.
//  2. NO STRUCTURE: nine loose variables. "The board" isn't a thing you can
//     pass around, reset, or reason about — it's scattered.
//  3. DOESN'T SCALE: imagine a 4×4 or 5×5 board. The hand-written checks
//     explode.
//
// Every later stage removes one of these pains — ending in small classes that
// COMPOSE into a clean game.
// ============================================================================

// ── Try it ──
// Change c7 to "X". Now column 1 (c1,c4,c7) and... wait, is that a win? You have
// to trace indices by eye. That difficulty is exactly what structure fixes.
