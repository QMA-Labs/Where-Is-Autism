# WHERE IS AUTISM? — complete portable prototype

Run `node portable/build.mjs` after installing the project dependencies. Open `outputs/where-is-autism-complete/index.html` directly in a browser. The delivered file embeds React, styles, content and visual controls; no server or network is needed. External sources and contact links require connectivity.

## Architecture

- `shell.html`: opening sequence, creator editor, canvas scene and standalone-file export.
- `Explorer.tsx`: hash-routed topic map, four-step chapters, evidence room and English reviewer page.
- `research-plan.ts`: proposed study, competing explanations and claim register.
- `../app/journey-data.ts`: 14 topic records and 11 references with provenance and limits.
- `../app/ExperienceLab.tsx`: deterministic, synthetic visual metaphors.
- `../app/JourneyGuide.tsx`: curated question routing and five answer layers; no LLM requests.
- `explorer.css`: scoped responsive styling. `DESIGN.md` fixes the visual system and information architecture.

Part 4 includes a six-step presentation and a complete research notebook export. No real participant dataset, validated measurement, trained model, diagnosis, clinical advice or empirical research finding is included. The reading register is non-exhaustive. Personal details were supplied by the creator; age is explicitly dated September 2026.

## Checks

`node portable/static-check.mjs` validates topic/reference integrity, parses inline scripts, checks offline resource requirements and emits a standalone English brief. `npx tsc --noEmit` checks types. `node portable/check.mjs` is the local Edge/Playwright end-to-end harness; its import path is host-specific and must be adapted elsewhere.

Static checks and type checking passed. Offline Edge tests cover all 56 chapter steps, source search, guide layers, creator details, exports and 320px/390px layouts, with no page errors or external runtime requests. See VALIDATION.txt. This is functional prototype validation, not scientific validation or a user study.

For future data integration, add an explicit schema and provenance for real measurements. Keep synthetic views separate, specify consent/access rules, validate measurements and models, and preserve negative findings. Never silently substitute generated points for participant data.
