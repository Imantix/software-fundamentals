/* ===========================================================================
 * INTERLUDE 3½ — HAND-ROLLED OBJECTS IN C   🏦
 * ---------------------------------------------------------------------------
 * Read this as CONCEPTUAL, not chronological. Classes (Simula, 1967) actually
 * predate C (1972). This file isn't a step *before* the class — it shows that
 * "bundle data with behavior" is a pattern programmers reach for ON THEIR OWN,
 * even in a language with no `class` keyword. The class just formalizes it.
 *
 * Give a C programmer only structs and functions and, on a big enough system,
 * they reinvent objects by hand. This is still how OO is done in C today:
 * the Linux kernel (struct file_operations), GTK/GObject, and CPython's own
 * object model all use exactly this trick.
 *
 *   Compile & run:  cc 03b-handrolled-objects.c -o /tmp/demo && /tmp/demo
 * =========================================================================== */

#include <stdio.h>

/* 1. A struct groups the DATA — just a record, no behavior yet. */
struct Account;  /* forward-declared so the vtable below can point back to it */

/* 3. A struct of FUNCTION POINTERS is a vtable: behavior chosen at runtime.
 *    This is, almost exactly, what a C++ compiler generates for `virtual`. */
struct AccountOps {
    double (*interest)(struct Account *self);  /* "virtual method" */
};

struct Account {
    const char *name;
    double balance;
    struct AccountOps *ops;   /* every instance points at its behavior table  */
};

/* 2. Functions that take an explicit `self` pointer = methods with a MANUAL
 *    `this`. In a class, the language passes `this` for you; here, by hand. */
void account_deposit(struct Account *self, double amount) {
    if (amount > 0) {          /* "encapsulation" — but only by CONVENTION.   */
        self->balance += amount; /* nothing stops `acct.balance = -999;`.     */
    }
}

/* Two different "interest" behaviors — polymorphism via function pointers. */
static double savings_interest(struct Account *self)  { return self->balance * 0.02; }
static double checking_interest(struct Account *self) { return self->balance * 0.00; }

/* The behavior tables (shared by all instances of each "type"). */
static struct AccountOps SAVINGS_OPS  = { savings_interest };
static struct AccountOps CHECKING_OPS = { checking_interest };

int main(void) {
    struct Account alice = { "Alice (savings)",  1000.0, &SAVINGS_OPS };
    struct Account bob   = { "Bob (checking)",    250.0, &CHECKING_OPS };

    struct Account *accounts[] = { &alice, &bob };

    for (int i = 0; i < 2; i++) {
        struct Account *a = accounts[i];
        /* DYNAMIC DISPATCH, by hand: look up the function in the vtable.
         * `a->ops->interest(a)` is what `a.interest()` compiles down to in C++. */
        double earned = a->ops->interest(a);
        account_deposit(a, earned);
        printf("%-18s balance: $%.2f\n", a->name, a->balance);
    }
    return 0;
}

/* ===========================================================================
 * WHAT THIS REVEALS  —  map each hand-rolled hack to what `class` automates:
 *
 *   pass `self` to every function     ->  implicit `this`
 *   struct of function pointers        ->  virtual methods / polymorphism
 *   "please don't touch .balance"      ->  compiler-enforced encapsulation
 *   ops table per "type"               ->  the class itself
 *
 * The PAIN of doing this by hand — no enforcement, easy to corrupt state,
 * dispatch wired up manually — is precisely what the `class` construct
 * (stage 4) removes by baking it into the language.
 *
 * Module 6 closes the loop: this exact idiom, formalized, became Bjarne
 * Stroustrup's "C with Classes" → C++.
 * =========================================================================== */
