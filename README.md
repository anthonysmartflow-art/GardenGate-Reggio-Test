# Garden Gate full-site prototype — Reggio direction

This is an unapproved complete-site prototype built from the selected Reggio-direction Stage 7 homepage. It is not approved copy, a final design system, a production website, or a launch.

## Run locally

```bash
npm install
npm run dev
```

Production-build check:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4171
```

Content coverage can be regenerated with `npm run qa:coverage`. The browser QA script requires a compatible local Playwright/Chromium installation or the environment paths documented inside `scripts/browser-qa.mjs`.

## Scope

- Complete responsive public-site prototype for Home, Programs, Our Approach, About, People, News & Resources, Enrollment, Current Families, Support, For Educators, Employment, Contact, Privacy, and Accessibility
- Repeatable dated News/Resource records and 38 linked first-party newsletter PDFs
- Canonical legacy redirects, metadata, sitemap, prototype-safe robots policy, and an honest deferred Portuguese state
- No CMS, database, analytics, authentication, active forms, enrollment processing, donation processing, deployment, or domain connection
- Donate hands off directly to `https://www.gardengatemv.org/donate`

## Project record

- Destination: `/Users/anthonyrosenberger/Desktop/GardenGate-Reggio-Test/`
- Read-only source: `/Users/anthonyrosenberger/Desktop/GardenGate/`
- Assigned reference: `/Users/anthonyrosenberger/Desktop/GardenGate/06-design-research/screenshots/02-reggio-children-desktop.png`
- Design record: `DESIGN-NOTES.md` and `DESIGN-SYSTEM.md`
- Content record: `verification/CONTENT-COVERAGE.tsv`
- Route, image, QA, and launch records: `verification/ROUTE-CHECK.tsv`, `verification/IMAGE-USAGE.tsv`, `verification/QA-RESULTS.md`, and `LAUNCH-BLOCKERS.md`

The selected photographs were approved by the user for this Garden Gate repository/Preview project. Final Garden Gate launch review still must confirm consent, photographer rights, crop, context, representation, displayed creative work, and alt text. Fonts are bundled open-source packages with documented system fallbacks.
