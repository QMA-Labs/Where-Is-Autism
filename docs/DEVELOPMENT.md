# Build, inspect, understand

[← Project](../README.md)

## Requirements

Node.js 22.18 or newer and npm. This minimum covers the content-check script’s native TypeScript imports. Install locked dependencies with `npm ci`.

## Portable builds

```sh
npm run build:portable
```

Open either generated HTML directly in a modern browser:

- `outputs/where-is-autism-complete/index.html`: Persian exploratory experience.
- `outputs/where-is-autism-research-edition/index.html`: English research dossier.

Both embed JS and CSS without runtime network resources. External research and contact links remain external. The research build also writes a full dossier, short inquiry, launcher and dependency notices.

Build separately with `npm run build:experience` or `npm run build:research`. The research build generates its own notices and does not need pre-existing experience output.

## Checks

```sh
npm run check:types
npm run build:experience
npm run check:content
```

The content check verifies topic/reference integrity, parses scripts and checks experience HTML for external runtime-resource declarations. It writes a report and English brief. Type checking is separate; the static report does not claim to run it.

Historical browser checks in `portable/check.mjs` and `portable/check-research.mjs` use workstation-specific Playwright import paths. Adapt them on another machine; they are not portable CI commands.

## Web development

```sh
npm run dev
```

Use the local address printed by the framework runner. `npm run build` checks the Vinext/Vite web build; `npm run start` serves the generated worker locally. Web hosting is separate from the portable editions. Local execution and hosting metadata is excluded from publication.

## Architecture

| Layer | Main files |
| --- | --- |
| Persian content | `app/journey-data.ts`, `portable/research-plan.ts`, `portable/depth.ts` |
| Experience | `portable/Explorer.tsx`, `app/ExperienceLab.tsx`, `portable/Synthesis.tsx` |
| Local guide | `app/JourneyGuide.tsx` |
| English content | `portable/research-en-data.ts` |
| Dossier and exports | `portable/ResearchEdition.tsx`, `portable/research-documents.ts` |
| Portable builders | `portable/build.mjs`, `portable/build-research.mjs` |

Keep simulated values separate from future empirical adapters, with provenance and measurement definitions at the boundary.

## Visual provenance

The cover uses the built-in imagegen tool; its [prompt and art direction](ART-DIRECTION.md) are preserved. The SVG is an editable conceptual diagram. Screenshots are real captures of the prototype, rather than generated product mockups.

No project-wide license is added by this update. Dependency notices remain with their components.

