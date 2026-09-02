# Garden Gate full-site build plan

## Objective

Expand the selected Reggio-direction homepage prototype into one complete, source-grounded React/Vite website. Preserve the locked blue system, exact navigation and CTA behavior, and the boundary between current facts, dated evidence, historical records, deferred material, and owner decisions.

## Build status

| Responsibility | Route or artifact | Status |
| --- | --- | --- |
| Shared tokens, header, mobile menu, footer, metadata, internal routing | Global | Complete and browser-verified |
| Home | `/` | Preserved, refined, and browser-verified |
| Programs | `/programs` | Complete and browser-verified |
| Our Approach | `/approach` | Complete and browser-verified |
| About Garden Gate | `/about` | Complete and browser-verified |
| People | `/about/people` | Complete and browser-verified; launch-current roster remains a blocker |
| News & Resources | `/news` | Complete and browser-verified |
| News/Resource records | `/news/{slug}` | 17 records complete; repeatable template verified with two representative records; 38 dated PDFs indexed |
| Enrollment | `/enrollment` | Complete without active form; governance remains a blocker |
| Current Families | `/families` | Complete and browser-verified |
| Support Garden Gate | `/support` | Complete and browser-verified |
| Professional Development | `/professional-development` | Complete with current-status boundary and browser verification |
| Employment | `/employment` | Complete without vacancy/application claim and browser-verified |
| Contact | `/contact` | Complete without active form and browser-verified |
| Privacy | `/privacy` | Prototype boundary complete; owner-approved policy remains a blocker |
| Accessibility | `/accessibility` | Prototype boundary complete; approved statement/process remains a blocker |
| Portuguese material | `/em-portugues` | Deferred, unlinked, and not an active route |
| Legacy-route handling | `URL-TRANSITION.tsv` | Complete through `vercel.json` redirects and in-app normalization |
| Content coverage | `verification/CONTENT-COVERAGE.tsv` | Complete; 1,352 source rows and zero unaccounted treatments |
| Image usage | `verification/IMAGE-USAGE.tsv` | Complete for all 11 selected images |
| Route QA | `verification/ROUTE-CHECK.tsv` | Complete |
| Browser QA and screenshots | `verification/QA-RESULTS.md`, `verification/screenshots/` | Complete after refinement and final regression |

## Content rules applied

- Stage 2 current evidence controls conflicts with older PDFs, translated files, archived pages, and stale labels.
- Every newsletter, article, report, press item, route, source file, and PDF receives one explicit treatment.
- Current operating details are omitted or visibly marked for owner confirmation; historical details retain dates.
- No form pretends to submit. Phone and email are honest fallbacks without response-time promises.
- Donate always goes directly to `https://www.gardengatemv.org/donate`; `/support` supplies context.
- Em Português remains visible, unavailable, and without a URL or click behavior.

## Verification sequence

1. Generate route, image, content-coverage, and launch-blocker records.
2. Run every available project command and production build.
3. Start the built site on port 4171.
4. Direct-load and refresh every fixed route plus representative record and redirect routes.
5. Inspect 1440, 1024, 768, 390, and 320px widths; save desktop and phone screenshots of every active fixed route plus representative records.
6. Test exact navigation, menu focus/Escape/restoration/scroll control, CTA destinations, unavailable Portuguese state, image loading, alt treatment, overflow, titles, headings, external links, and console output.
7. Make one focused rendered refinement, rebuild, and repeat affected checks.
8. Recreate the source manifest and require an exact match with the starting manifest.
