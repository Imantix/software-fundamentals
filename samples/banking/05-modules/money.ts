// money.ts — MODULE: formatting concerns, kept apart from banking rules.
// ----------------------------------------------------------------------------
// Why a whole file for one function? Because "how we display money" is a
// SEPARATE reason to change than "how interest works". Different concerns,
// different modules. Another module could also export `format` with no clash —
// each lives in its own namespace (money.format vs date.format).

export function format(amount: number): string {
  return "$" + amount.toFixed(2);
}
