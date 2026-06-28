// main.ts — ENTRY POINT. Composes the modules; reads like a summary of the shop.
// ----------------------------------------------------------------------------
// main.ts imports exactly what it needs and wires the pieces together. It has
// no idea how tax is computed (order.ts) or how a receipt is laid out
// (receipt.ts). That ignorance is the point — each module can change alone.
//
//   Run:  node main.ts   (package.json here sets "type": "module")

import { MENU } from "./menu.ts";
import { Order } from "./order.ts";
import { renderReceipt } from "./receipt.ts";

const order = new Order();
order.add(MENU.LATTE, 2);
order.add(MENU.MUFFIN, 1);
order.add(MENU.COOKIE, 3);

console.log(renderReceipt(order));

// ============================================================================
// WHAT MODULES BOUGHT US
//
//  • FINDABILITY: prices? menu.ts. Totals? order.ts. Layout? receipt.ts.
//  • INFORMATION HIDING: TAX_RATE is private to order.ts; nothing can depend
//    on it from outside, so it's safe to change.
//  • NO NAME COLLISIONS: each file is its own namespace.
//  • REUSE: renderReceipt could feed a printer, a PDF, or a test — unchanged.
//
// NEXT: every order pays the same way and gets the same discount logic. Real
// shops take cash, cards, and wallets, and run loyalty/happy-hour discounts.
// Stage 7 (OOP) models those families of behavior cleanly.
// ============================================================================
