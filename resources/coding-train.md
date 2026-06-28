# The Coding Train — Curated Watchlist 🚂

[The Coding Train](https://thecodingtrain.com/) (Daniel Shiffman) is the gold standard for
learning to **think in code constructs visually** — especially his knack for taking a
gnarly mathematical idea and turning it into a small, legible program you can *watch* run.

This list is curated for *our* goals: first the videos that teach **OOP, classes &
composition** (the backbone of this course), then Daniel's best **"math → code"** pieces.

> Links verified against thecodingtrain.com (June 2026). Each challenge page has the video,
> the live sketch, and the source code.

## Start here — classes, objects & composition

These map directly onto Session 2 (and our `samples/p5-particle-system/` demo):

- **The Nature of Code** — [book (free online)](https://natureofcode.com/) ·
  [video track](https://thecodingtrain.com/tracks/the-nature-of-code-2/) — the single best
  resource for OOP-through-simulation: vectors → forces → **particle systems** (composition:
  an emitter *has-a* list of particles) → **autonomous agents**. Watch the particle-system
  chapter alongside our p5 demo.
- **Steering Agents** — [Nature of Code 5.1](https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/1-steering-agents/) —
  a `Vehicle` class that owns its own behavior; systems *compose* many of them. Craig
  Reynolds' classic, made concrete.
- **Evolutionary Steering Behaviors** — [Challenge #69](https://thecodingtrain.com/challenges/69-evolutionary-steering-behaviors/) —
  objects with their own "DNA"; encapsulation + composition at play.

## Math made visual — Daniel's specialty

- **Clock** — [Challenge #74](https://thecodingtrain.com/challenges/74-clock/) — *(your pick!)*
  trigonometry + polar coordinates turned into a working analog clock. A perfect "a formula
  becomes a construct" lesson.
- **Fourier Series** — [Challenge #125](https://thecodingtrain.com/challenges/125-fourier-series/) —
  summing sine waves to build a square wave; abstract series → moving picture.
- **Drawing with Fourier Transform & Epicycles** — [Challenge #130](https://thecodingtrain.com/challenges/130-drawing-with-fourier-transform-and-epicycles/) —
  the jaw-dropping follow-up: the DFT drawing any shape with rotating circles.
- **Mandelbrot Set (p5.js)** — [Challenge #21](https://thecodingtrain.com/challenges/21-mandelbrot-set-with-p5js/) —
  complex numbers + escape-time iteration → the famous fractal in ~30 lines.
- **The Mandelbulb** — [Challenge #168](https://thecodingtrain.com/challenges/168-the-mandelbulb/) —
  the Mandelbrot idea pushed into 3D.
- **Recursive Fractal Trees** — [Nature of Code](https://thecodingtrain.com/tracks/the-nature-of-code-2/14-fractal-trees-recursive/) —
  recursion made tangible; then **[L-System trees](https://thecodingtrain.com/tracks/the-nature-of-code-2/16-l-system-fractal-trees/)**
  (formal grammars → botany).
- **The Lorenz Attractor** — [Challenge #12](https://thecodingtrain.com/challenges/12-lorenz-attractor/) —
  three differential equations → the iconic "butterfly" of chaos theory.
- **Double Pendulum** — [Challenge #93](https://thecodingtrain.com/challenges/93-double-pendulum/) ·
  **Simple Pendulum** — [#159](https://thecodingtrain.com/challenges/159-simple-pendulum/) —
  physics equations → motion you can feel; great for "encapsulate the state of a system."
- **Phyllotaxis** — [Challenge #30](https://thecodingtrain.com/challenges/30-phyllotaxis/) —
  the golden angle → sunflower spirals. One formula, stunning output.
- **Perlin Noise Flow Field** — [Challenge #24](https://thecodingtrain.com/challenges/24-perlin-noise-flow-field/) ·
  **3D Terrain** — [#11](https://thecodingtrain.com/challenges/11-3d-terrain-generation-with-perlin-noise/) ·
  **Polar Noise Loops** — [#136](https://thecodingtrain.com/challenges/136-polar-noise-loops/) —
  noise as a controllable randomness primitive.

## Browse for more

- **All Coding Challenges** — https://thecodingtrain.com/challenges/
- **Tracks (structured courses)** — https://thecodingtrain.com/tracks/

## How to use these in this program

- **For composition/encapsulation (Session 2):** watch the **particle systems** chapter of
  *Nature of Code*, then read our `samples/p5-particle-system/index.html` — same lesson, your
  own annotated copy.
- **For "constructs as tools for thought":** pick any *math → visual* video above and ask the
  reviewer's question from the plan — *why this class? what does it encapsulate? what's
  composed of what?* Re-implementing one yourself (without AI) is the ideal between-session
  exercise.

---

Sources: [The Coding Train](https://thecodingtrain.com/) ·
[Challenges](https://thecodingtrain.com/challenges/) ·
[Nature of Code](https://natureofcode.com/)
