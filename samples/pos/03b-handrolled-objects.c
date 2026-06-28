/* ===========================================================================
 * INTERLUDE 3½ — HAND-ROLLED OBJECTS IN C   ☕
 * ---------------------------------------------------------------------------
 * Read this as CONCEPTUAL, not chronological. Classes (Simula, 1967) predate
 * C (1972). This isn't a step *before* the class — it shows that "bundle data
 * with behavior" is a pattern programmers reach for ON THEIR OWN, even without
 * a `class` keyword. The class just formalizes it.
 *
 * Here we hand-build an "Order object" in C: a struct for the data, functions
 * that take an explicit `self`, and a function pointer for a pluggable
 * discount rule (poor-man's polymorphism).
 *
 *   Compile & run:  cc 03b-handrolled-objects.c -o /tmp/demo && /tmp/demo
 * =========================================================================== */

#include <stdio.h>

#define MAX_ITEMS 16

struct Order;  /* forward declaration so the ops table can point back */

/* A struct of function pointers = a vtable. Behavior chosen at runtime —
 * exactly what a C++ compiler emits for `virtual`. */
struct OrderOps {
    double (*discount)(struct Order *self, double subtotal); /* "virtual method" */
};

/* 1. The DATA — a plain record. */
struct Order {
    double prices[MAX_ITEMS];
    int qtys[MAX_ITEMS];
    int count;
    struct OrderOps *ops; /* every instance points at its behavior table */
};

/* 2. A "method": a function taking an explicit `self` (the manual `this`). */
void order_add(struct Order *self, double price, int qty) {
    if (qty > 0 && self->count < MAX_ITEMS) { /* "validation" — by CONVENTION only */
        self->prices[self->count] = price;
        self->qtys[self->count] = qty;
        self->count++;
    }
}

double order_subtotal(struct Order *self) {
    double sum = 0.0;
    for (int i = 0; i < self->count; i++) {
        sum += self->prices[i] * self->qtys[i];
    }
    return sum;
}

/* Two interchangeable discount behaviors — polymorphism via function pointers. */
static double no_discount(struct Order *self, double subtotal)    { return 0.0; }
static double happy_hour(struct Order *self, double subtotal)      { return subtotal * 0.20; }

static struct OrderOps REGULAR_OPS    = { no_discount };
static struct OrderOps HAPPY_HOUR_OPS = { happy_hour };

int main(void) {
    struct Order morning = { .count = 0, .ops = &REGULAR_OPS };
    order_add(&morning, 4.50, 2);  /* lattes */
    order_add(&morning, 3.00, 1);  /* muffin */

    struct Order evening = { .count = 0, .ops = &HAPPY_HOUR_OPS };
    order_add(&evening, 4.50, 2);

    struct Order *orders[] = { &morning, &evening };
    const char *labels[] = { "Morning (regular)", "Evening (happy hour)" };

    for (int i = 0; i < 2; i++) {
        struct Order *o = orders[i];
        double sub = order_subtotal(o);
        /* DYNAMIC DISPATCH by hand: `o->ops->discount(o, sub)` is what
         * `o.discount(sub)` compiles to in a language with classes. */
        double disc = o->ops->discount(o, sub);
        printf("%-22s subtotal $%.2f  -discount $%.2f  = $%.2f\n",
               labels[i], sub, disc, sub - disc);
    }
    return 0;
}

/* ===========================================================================
 * map each hand-rolled hack to what `class` automates for you:
 *
 *   pass `self` to every function   ->  implicit `this`
 *   struct of function pointers     ->  virtual methods / polymorphism
 *   "please pass qty > 0"           ->  compiler-enforced encapsulation
 *   ops table per "kind" of order   ->  the class itself
 *
 * The pain of wiring this by hand is exactly what `class` (stage 4) removes.
 * Module 6 closes the loop: this idiom, formalized, became "C with Classes" → C++.
 * =========================================================================== */
