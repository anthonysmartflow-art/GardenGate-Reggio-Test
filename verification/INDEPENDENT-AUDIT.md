# Garden Gate Full Site — Independent Audit

## Overall result

**FAIL**

The rendered site has a coherent Garden Gate/Reggio visual foundation and its global navigation is dependable, but it cannot pass the supplied audit rules. Two content-loss/currentness blockers remain, all 11 editorial photographs are reused, one archive title breaks the page at three required widths, and several required blueprint and CTA responsibilities are absent.

Issue counts:

- Blocker: 2
- High: 6
- Medium: 6
- Low: 0
- Total: 14

The complete issue ledger is in `verification/INDEPENDENT-AUDIT-ISSUES.tsv`.

## Audit scope and counts

- Build audited: `/Users/anthonyrosenberger/Desktop/GardenGate-Reggio-Test/`
- Branch at audit start: `garden-gate-full-site-reggio-preview`
- Commit at audit start: `3ed2635fb7346ce63c5e63b0b8735301a8901b28`
- Source evidence: `/Users/anthonyrosenberger/Desktop/GardenGate/`, read only
- Content-ledger rows inspected: 1,352
- Blank ledger treatments: 0
- Rows automatically labeled `implemented=yes` and `verified=yes`: 1,352
- Active routes rendered: 31 (14 fixed routes and all 17 News/Resource records)
- Required viewport checks: 155 (31 routes at 1440, 1024, 768, 390, and 320 pixels)
- Legacy redirects checked: 43
- Record routes rendered: 17
- Detailed source-to-render record comparisons: 2 (Building Community and Baby Cow)
- Editorial image placements checked: 40
- Unique underlying photographs used: 11
- Repeated photographs: 11
- Duplicate placements beyond the first use: 29
- Unique approved-photo hashes in the source inventory: 248
- Unused unique approved photographs available after the 11 selections: 237
- Browser console errors: 0
- Failed browser requests: 0
- Broken images: 0
- Images missing an `alt` attribute: 0
- Routes with exactly one H1: 31 of 31

## Content-completeness result

Content coverage did **not** reach zero unaccounted rows.

The generated ledger has no blank treatment cells, but that mechanical result is not supported by the rendered pages. `scripts/generate-coverage.mjs` assigns `implemented=yes` and `verified=yes` to every row when finalized; it does not verify that required source facts or record bodies appear on the destination route.

The material failures are:

- `/professional-development` incorrectly says the evidence does not establish a current program. The captured official page supports a Professional Development offering with a 90-minute tour and Q&A, half-day and full-day formats, groups up to five, facilitator context, and seven topic areas. The build omits those facts instead of presenting them with launch-current qualifiers.
- The 17 `/news/{slug}` routes do not migrate their supported source content. Every route uses the same generic body and exposes only a summary, author, and topic. The 16 article extracts plus Baby Cow contain 22,691 extracted words before cleanup; the sampled source bodies contain substantive first-party copy that is absent from the corresponding records.
- `/enrollment` omits the blueprint's dated published process, 16-field form evidence, visibly dated 2025 application status, Equitable Tuition and scholarship context, Portuguese boundary, and privacy/data boundary.
- `/families` omits the latest dated resource presentation, Programs and Our Approach references, family communication/participation context, administration-versus-enrollment routing, and the explicit Portuguese state.
- `/about` omits the source-faithful full mission, nonprofit cause/purpose, supported cultural-participation evidence, and dated FY2024 accountability/public-filing path.
- `/about/people`, `/professional-development`, `/employment`, and `/contact` omit source-backed Stage 5 contextual actions. Footer links do not replace actions required in the page context.

The public-source information is therefore not fully accounted for in the rendered site. Obsolete, unsafe, rights-limited, translated, form, and policy material may remain deferred, but those exclusions must be accurately classified instead of being marked verified as implemented.

## Navigation, routes, and actions

The permanent global navigation and core actions passed:

- Desktop utility order: Current Families, For Educators, Employment, Support, Contact.
- Desktop main order: Garden Gate wordmark, Programs, Our Approach, About, News & Resources, Enrollment, Donate, Em Português.
- About exposes People at `/about/people`; Escape closes the desktop submenu and restores focus.
- Mobile keeps Logo, Donate, and Menu immediately reachable and preserves every required label and destination.
- Mobile menu focus transfer, forward/backward trapping, Escape close, focus restoration, body-scroll control, and route-change close passed after settled-state verification.
- Em Português is visible as an unavailable, unlinked status in desktop and mobile navigation.
- All checked Donate actions point directly to `https://www.gardengatemv.org/donate`.
- Home includes Explore Programs → `/programs`, See Our Approach → `/approach`, Begin Enrollment → `/enrollment`, Donate → the direct donation URL, and Why Support Matters → `/support`.
- All 31 active routes returned HTTP 200 at each required width.
- All 43 legacy transitions resolved to their expected internal destinations.

The page-level CTA omissions are High issue `GG-AUD-008`.

## Responsive and functional result

Thirty of 31 active routes stayed within the viewport at every tested width. One record route fails:

`/news/new-combined-kindergartenpreschool-program-at-garden-gate`

- 768px viewport: document width 951px, 183px overflow
- 390px viewport: document width 664px, 274px overflow
- 320px viewport: document width 517px, 197px overflow

The unbroken `Kindergarten/Preschool` segment expands the H1 and the entire document. The exact viewport and document-width measurements above are the retained rendered evidence.

No form, donation, external social action, or transaction was submitted.

## Typography audit

The selected type system is conceptually strong:

- Display/reflection: Literata 400, 500, and 600
- Body/navigation/controls: Atkinson Hyperlegible 400 and 700
- Fallbacks: Georgia for display; Arial and sans-serif for functional text
- `font-synthesis: none` is present.
- Both packages identify their licenses as OFL-1.1.
- No third family or obvious synthetic weight was found.

The pairing feels warm, observant, readable, and appropriate to the Reggio direction. It does not read as a luxury, technology, novelty-child, handwritten, or generic corporate system.

Representative rendered sizes:

| Role | 1440px | 390px | Finding |
| --- | ---: | ---: | --- |
| Body | 17px / 26.35px | 16.5px / 25.58px | Good |
| Home H1 | 82.08px / 88.65px | 58.5px / 63.18px | Expressive; generally controlled |
| Home H2 | 61.92px / 66.87px | 40px / 43.2px | Clear hierarchy |
| Eyebrow | 12.96px | 12.96px | Small but usable |
| Card metadata | 11.52px | 11.52px | Too small |
| Caption | 12.16px | 11.2px | Too small on phone |
| Utility navigation | 11.68px | not displayed | Too small |
| Main navigation | 12.8px | not displayed | Too small |
| Mobile menu navigation | not displayed | 17.16px by rule | Good |
| Text link | 14.4px | 14.4px | Small for a primary functional label |
| Button | 14.72px | 14.72px | Small but legible |
| Mobile wordmark subtitle | not displayed | 9.075px | Too small |

The hierarchy is coherent, but the utility, metadata, caption, action, and subtitle floors need to rise. The record-title overflow also proves that the heading system lacks a robust long-title rule.

## Layout, density, and whitespace

Most mobile pages remove desktop-scale gaps and keep text connected to imagery. Home, Programs, Approach, and About use their longer page length to carry meaningful content and visual pauses.

Excessive-space locations:

| Route and section | Viewport | Section height | Occupied span | Unused vertical space | Likely cause |
| --- | ---: | ---: | ---: | ---: | --- |
| Employment, contact-for-current-information row | 1440px | 1,096px | 520px | 288px above and 288px below | `.editorial-pair--wide` minimum height plus large section padding |
| Employment, same row | 390px | 1,143px | 787px | 178px above and 178px below | mobile minimum/padding remains too generous for short copy |
| Professional Development, source-grounded context | 1440px | 958px | 670px | 144px above and 144px below | shared `.interior-section` padding applied to sparse content |

Other large fields were not flagged when their image and text composition visibly occupied the field and created a deliberate transition.

## Gridline and divider restraint

Approximately 14 recurring border systems appear across the CSS and rendered pages:

- four boxed card systems: program, practice, archive, and highlight;
- three black-gap split grids: family links, contact facts, and support uses;
- six ruled structures: trust facts, newsletter resources, press, enrollment process, timeline, and people groups; and
- the repeated two-rule owner notice.

Rules are justified for dated newsletter/press rows, enrollment steps, and a real timeline. They are less useful around family/contact/support blocks and every historical archive card. At 1440px, `/news` alone contains 84 bordered descendants. The result does not dominate every page, so this is Medium rather than High, but it should be reduced before approval.

## Photography and image uniqueness

Image loading, crops, and alt treatment were generally sound: all 40 rendered placements loaded, no image lacked an `alt` attribute, decorative details used empty alt text, and meaningful images had role-based descriptions. No stretching was observed.

Uniqueness fails completely:

- Editorial placements: 40
- Unique underlying photographs: 11
- Repeated underlying photographs: 11
- Duplicate placements beyond first use: 29
- Unused unique approved source photographs: 237

Rendered desktop occurrence counts:

| Photograph | Placements |
| --- | ---: |
| collaboration-tiles.jpg | 4 |
| material-table.jpg | 4 |
| painting-process.jpg | 4 |
| observation-drawing.jpg | 4 |
| featherstone-deck.jpg | 4 |
| project-group.jpg | 4 |
| belonging-hands.jpg | 4 |
| studio-relationship.jpg | 3 |
| meadow-inquiry.jpg | 3 |
| featherstone-campus.jpg | 3 |
| clay-construction.jpg | 3 |

Suitable unused replacement starting points visually reviewed during the audit include ASSET-003 for outdoor movement, ASSET-098 for collaborative outdoor inquiry, ASSET-141 for the prepared studio environment, ASSET-145 or ASSET-130 for group construction, ASSET-149/183/184 for close material work, ASSET-196 for translucent construction, ASSET-233 for the wider Featherstone setting, and ASSET-059/061/087 for observation and making. ASSET-143 and ASSET-048 are relevant but visibly include external creative works and require specific publication review. Every secondary placement still needs a different underlying photograph.

All locally saved Garden Gate photographs were treated as approved for this project, as instructed. Third-party logos, displayed artworks, and other creative works remain separate launch-rights questions.

## Accessibility findings

Confirmed strengths:

- semantic header, navigation, main, footer, headings, lists, links, and buttons;
- visible skip link and strong focus treatment;
- one H1 per checked route;
- keyboard-operable desktop submenu and mobile menu;
- reduced-motion handling;
- useful image alt treatment;
- no color-only navigation state found; and
- primary buttons meet the practical 44px height floor.

Required corrections:

- Action-blue text on `#EAEAEE` measures 4.41:1 and on the pale-blue field measures 4.29:1 at 14.4px/700. These normal-size links need at least 4.5:1.
- The separate desktop About disclosure is 36×44px and should be widened to approximately 44px.
- The long archive record heading causes severe horizontal overflow at 768, 390, and 320px.
- The small utility, metadata, caption, and subtitle sizes should be raised and retested at 200% zoom.

This audit targets WCAG 2.2 AA criteria but does not claim conformance.

## Performance and implementation

- The production build passed.
- The site ships 11 original JPEGs totaling 8.1MB with no `srcset` or `sizes`.
- `meadow-inquiry.jpg` is 2.4MB at 2500×3333 and renders at approximately 313×209 on the 390px Home page.
- The five Fontsource imports emit 47 font files totaling approximately 664KB because whole package CSS is imported instead of narrowly selected subsets/formats.
- Built JavaScript and CSS total approximately 320KB uncompressed.
- No runtime console errors, failed requests, or broken images were observed.

## Design-system result

The Garden Gate/Reggio system remains coherent across the rendered routes:

- white editorial canvas;
- Garden Gate blue `#539EDF`;
- action blue `#1470AF` with the darker derived `#0B4D78`;
- black text, `#EAEAEE` structure, and pale-blue supporting fields;
- Literata plus Atkinson Hyperlegible;
- asymmetrical editorial compositions, collection modules, open rows, and image-shape variation; and
- no cream, dark green, teal, coral, pink, red, orange, gradient, glass, or bento-system drift.

The interior pages generally belong to the same design family. The weaknesses are content reduction, repeated photography, excessive rule systems, and sparse-page spacing—not loss of the selected blue/Reggio identity.

## Automated and manual checks

Passed:

- `npm run build`
- `FINALIZE=1 npm run qa:coverage` in a temporary project copy: 1,352 rows and zero blank treatments; this confirms generator execution only, not semantic coverage
- `npm run qa:browser` in a temporary project copy: 80 route/viewport combinations, 43 redirects, and its mobile-menu checks
- independent browser audit: 155 route/viewport combinations, all 31 active routes, all 43 legacy redirects, settled-state menu/focus behavior, link inspection, image loading, metadata, H1, overflow, typography, contrast, spacing, and console collection

Unavailable because the project defines no command:

- lint
- static type-check
- unit or integration tests outside browser QA
- formatter check

## Exact corrections required before approval

1. Restore the source-supported Professional Development offering with accurate currentness qualifiers.
2. Replace the generic News/Resource record body with source-specific migrated content or a correctly classified governed source handoff for all 17 records.
3. Remove all 29 duplicate editorial placements so every photograph is used once.
4. Fix the long record-title overflow and retest every record title at all required widths.
5. Complete the Enrollment, Current Families, and About blueprint responsibilities.
6. Restore the missing People, Professional Development, Employment, and Contact contextual actions.
7. Raise small functional type, correct tinted-field contrast, and widen the About disclosure target.
8. Reduce the Employment and Professional Development empty bands.
9. Remove nonessential box/grid rules from service and archive modules.
10. Add responsive image derivatives and narrow font loading.

## Approval and launch limits

The prototype remains unapproved and is not production-ready. Before public launch, Garden Gate still needs to confirm content currentness, people/role accuracy, policy owners and text, form governance, response routing, document accessibility, donation continuity, third-party artwork/mark rights, and final photograph/crop/alt approvals.

The GardenGate source folder was not edited during this audit.
