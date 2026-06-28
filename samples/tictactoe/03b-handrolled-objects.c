/* ===========================================================================
 * INTERLUDE 3½ — HAND-ROLLED OBJECTS IN C   🎮
 * ---------------------------------------------------------------------------
 * Read this as CONCEPTUAL, not chronological. Classes (Simula, 1967) predate
 * C (1972). This shows that "bundle data with behavior" — and even pick
 * behavior at runtime — is a pattern programmers build BY HAND when the
 * language has no `class`. The class just formalizes it.
 *
 * Here we hand-build a Game "object": a struct for the board, functions that
 * take an explicit `self`, and a function pointer for a pluggable PLAYER
 * STRATEGY (poor-man's polymorphism — exactly what stage 7 does with classes).
 *
 *   Compile & run:  cc 03b-handrolled-objects.c -o /tmp/demo && /tmp/demo
 * =========================================================================== */

#include <stdio.h>

struct Game;  /* forward declaration so the strategy can point back */

/* A struct of function pointers = a vtable: behavior chosen at runtime.
 * This is what a C++ compiler emits for a `virtual` method. */
struct PlayerStrategy {
    int (*choose_move)(struct Game *self, char mark); /* "which empty cell?" */
};

/* 1. The DATA — a plain record holding the 9 cells. */
struct Game {
    char board[9];               /* 'X', 'O', or ' ' */
    struct PlayerStrategy *strategy;
};

/* 2. "Methods": functions taking an explicit `self` (the manual `this`). */
static int game_place(struct Game *self, int index, char mark) {
    if (self->board[index] != ' ') return 0;  /* rule enforced by CONVENTION */
    self->board[index] = mark;
    return 1;
}

static void game_print(struct Game *self) {
    for (int r = 0; r < 3; r++) {
        printf(" %c | %c | %c\n", self->board[r*3], self->board[r*3+1], self->board[r*3+2]);
    }
}

/* Two interchangeable strategies — polymorphism via a function pointer. */
static int first_empty(struct Game *self, char mark) {
    (void)mark;
    for (int i = 0; i < 9; i++) if (self->board[i] == ' ') return i;
    return -1;
}
static int center_then_first(struct Game *self, char mark) {
    (void)mark;
    if (self->board[4] == ' ') return 4;        /* prefer the center */
    for (int i = 0; i < 9; i++) if (self->board[i] == ' ') return i;
    return -1;
}

static struct PlayerStrategy SIMPLE_AI = { first_empty };
static struct PlayerStrategy CENTER_AI = { center_then_first };

int main(void) {
    struct Game game = {
        .board = { ' ',' ',' ', ' ',' ',' ', ' ',' ',' ' },
        .strategy = &CENTER_AI
    };

    /* Let the chosen strategy pick three X moves. Swap CENTER_AI for SIMPLE_AI
     * above and the behavior changes with ZERO change to the loop below — that
     * is dynamic dispatch, wired by hand. */
    for (int turn = 0; turn < 3; turn++) {
        int move = game.strategy->choose_move(&game, 'X');  /* self->vtable->method(self) */
        game_place(&game, move, 'X');
    }
    game_print(&game);
    return 0;
}

/* ===========================================================================
 * map each hand-rolled hack to what `class` automates for you:
 *
 *   pass `self` to every function       ->  implicit `this`
 *   struct of function pointers          ->  virtual methods / polymorphism
 *   "please don't overwrite a cell"      ->  compiler-enforced encapsulation
 *   strategy pointer per game             ->  a Player object the Game HAS-A
 *
 * The pain of wiring this by hand is what stage 4 removes — and the strategy
 * pointer is literally COMPOSITION (a Game HAS-A strategy), the idea stage 4
 * and stage 7 build on. Module 6 closes the loop: this idiom became C++.
 * =========================================================================== */
