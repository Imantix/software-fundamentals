// ============================================================================
// OOP DEEP-DIVE (a) — ENCAPSULATION, on real code  🏦
// ----------------------------------------------------------------------------
// NOT the generic "shape" example. Encapsulation is a DESIGN decision: you are
// the designer of a class, and you decide what the OUTSIDE WORLD gets to see.
// Expose only what a caller needs; hide every implementation detail.
//
// Domain: an interest calculator. A caller wants ONE thing — "what's my
// interest?" They do NOT need to see how we round, validate, or format.
// ============================================================================

class InterestCalculator {
  // ── PRIVATE STATE: the inputs. Nobody can reach in and corrupt them. ──────
  #principal: number;
  #annualRate: number; // e.g. 0.10 = 10%

  constructor(principal: number, annualRate: number) {
    // Validation lives INSIDE — an invalid calculator can't even be built.
    if (principal < 0) throw new Error("Principal cannot be negative");
    if (annualRate < 0) throw new Error("Rate cannot be negative");
    this.#principal = principal;
    this.#annualRate = annualRate;
  }

  // ── PUBLIC API: the only two things a caller actually wants. ──────────────
  // simple interest = P · r · t
  simpleInterest(years: number): number {
    return this.#round(this.#principal * this.#annualRate * years);
  }

  // compound interest = P · (1 + r/n)^(n·t) − P
  compoundInterest(years: number, timesPerYear: number): number {
    const n = timesPerYear;
    const amount = this.#principal * Math.pow(1 + this.#annualRate / n, n * years);
    return this.#round(amount - this.#principal);
  }

  // ── PRIVATE HELPERS: implementation detail. A caller has no business
  //    seeing these — so they're `#private` and absent from the public API. ──
  #round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}

// As a CALLER, look how small the surface is — two methods, both meaningful.
// You never see #round, #principal, or the validation. That's encapsulation:
// the complexity is sealed away behind a clean, relevant public API.
const calc = new InterestCalculator(10_000, 0.1); // $10,000 at 10%/yr

console.log("Simple,   3 yrs:           $" + calc.simpleInterest(3));
console.log("Compound, 3 yrs, monthly:  $" + calc.compoundInterest(3, 12));

// The guarantees hold because the rules live inside the class:
try {
  new InterestCalculator(-500, 0.1);
} catch (err) {
  console.log("Blocked at construction:", (err as Error).message);
}

// ============================================================================
// WHY THIS IS ENCAPSULATION (not just "using a class")
//
//  • PUBLIC = what the user needs: simpleInterest(), compoundInterest().
//  • PRIVATE = how it's done: #principal, #annualRate, #round(). Hidden.
//  • You designed the API. Tomorrow you could cache results, change rounding,
//    or add logging inside #round — and NO caller breaks, because none of them
//    ever depended on the internals.
//
// REVIEWER'S LENS: if a "helper" method is public, ask *why*. Does any caller
// actually need it? If not, it's leaking implementation — make it #private.
// ============================================================================

// ── Try it ──
// Make #round public and call calc.#round(3.14159) from outside.
// It won't compile — and that's the language enforcing your design intent.
