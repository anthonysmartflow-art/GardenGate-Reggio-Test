# QA results

## Result

The final production-browser regression passed after one rendered refinement and one narrow-width correction.

- Production build: passed
- Browser route/viewport combinations: 80 passed
- Fixed routes: 14 direct-loaded at 1440, 1024, 768, 390, and 320px
- Representative News/Resource records: 2 direct-loaded at all five widths
- Legacy redirects: 43 passed in the browser; 42 non-self redirects emitted to `vercel.json`
- Full-page route screenshots: 32
- Broken images: 0
- Images missing `alt`: 0
- Horizontal overflow: 0
- Browser console errors: 0
- Main headings: exactly one on every checked route
- Em Português links: 0
- Mobile menu: opens, traps focus, closes with Escape, restores focus, and closes on route change
- Donate: every checked Donate link resolves directly to `https://www.gardengatemv.org/donate`
- Source integrity: the 611-file before/after SHA-256 manifests match exactly

## Viewports inspected

- 1440 × 900 desktop
- 1024 × 768 laptop/tablet landscape
- 768 × 1024 tablet
- 390 × 844 phone
- 320 × 740 narrow phone

## Focused refinement

The first rendered pass exposed unloaded lazy images in full-page capture and a generic program-card destination. The verification pass was corrected to force actual image loading before capture, the home program links were returned to Programs, and production-bundled fonts were tested through `vite preview`. A final 320px check found one long professional-development heading establishing a 19px scroll width; its narrow-width display scale was reduced and the complete regression was rerun successfully.

## Automated command availability

This project provides `build`, `qa:coverage`, and `qa:browser`. No separate lint, type-check, unit-test, or formatter command is defined. Those checks were unavailable and are not claimed.

## Limits

These results verify the unapproved prototype and its rendered behavior. They do not establish legal approval, content currentness, image launch rights, PDF accessibility, WCAG conformance, production readiness, or organization acceptance.
