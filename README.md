# WHERE IS AUTISM?
The Geometry of a Distributed Mind — first interactive prototype by Masiha.

## Run
Requires Node.js 22.13 or newer and npm. In the project root:

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Production check: `npm run build`. Type check: `npx tsc --noEmit`.

## Architecture
React + TypeScript on the supplied Vinext/Vite app-router starter. `app/page.tsx` owns the introduction, atlas navigation and mode state. `app/Field.tsx` draws the abstract parametric field using Canvas 2D. `app/Demo.tsx` renders accessible SVG toy diagrams with native range inputs. `app/Guide.tsx` is a native modal dialog with a deterministic searchable question bank and five answer layers. `app/research.ts` separates chapter content and source metadata from presentation. `app/globals.css` implements the locked tokens, responsive layouts, focus states and reduced-motion behavior.

All interactions are local. No LLM, account, database, analytics, patient upload or diagnostic inference. Native dialog provides focus containment and Escape dismissal. The ambient field can be paused. No image or WebGL dependency is required. Fonts use Google Fonts with local system fallbacks.

## Scope and integrity
Eight complete chapter views, six-stage introduction, Simple/Scientific mode, curated contextual research guide, limitations, primary-source links and downloadable text summaries. All plots use synthetic values. The broad framework is unvalidated; the two cited studies are background, not a systematic review or endorsement. The displayed creator narrative is draft presentation copy derived from the supplied brief.

## Real research integration
Replace toy visualization adapters only after supplying provenance, units, instruments, uncertainty and governance metadata. Keep raw measures separate from derived coordinates. Add schema validation at the adapter boundary and distinguish synthetic from empirical data at record and display level. Future family synergy requires a selected PID definition, estimator, sample-size analysis and validation. Future embeddings require held-out cohorts, leakage controls and stability tests. Current projection controls rotate invented points; they do not train AI.

Design and information architecture were locked before product code in `DESIGN.md`. No credentials belong in source files. Site identity is in `.openai/hosting.json`.

