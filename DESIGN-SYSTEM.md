# Garden Gate full-site design system

## Direction

The complete site extends the selected Reggio-direction Garden Gate prototype. It stays open, editorial, child-centered, and rooted in visible learning: children’s questions, materials, documentation, relationships, and the Featherstone setting. Interior pages share a recognizable shell and visual grammar without forcing every responsibility into the homepage’s exact sequence.

## Tokens

### Color

- `--blue: #539EDF` — Garden Gate identity, contextual fields, rules, and image bridges
- `--action-blue: #1470AF` — primary controls and Donate
- `--deep-blue: #0B4D78` — accessible footer and dark institutional fields
- `--pale-blue: #EAF4FC` — editorial pauses and supporting information
- `--pale-blue-strong: #D6EAF9` — notices and alternating fields
- `--gray: #EAEAEE` — dated records, document fields, and quiet structure
- `--white: #FFFFFF` — primary editorial canvas
- `--black: #000000` — primary text
- `--muted: #4D555C` — secondary text that still meets contrast targets on white
- `--line: #AEB8C0` — restrained borders and dividers

No major interface area uses cream, green, teal, pink, red, orange, coral, gradients, glass, or program-specific rainbow colors.

### Typography

- Display: Literata 400/500/600 with Georgia fallback
- Body, navigation, utility, caption: Atkinson Hyperlegible 400/700 with Arial fallback
- Display type carries educational propositions and page introductions; the sans carries all practical information, dates, labels, actions, and notices.
- Sustained prose is held near 45–75 characters per line.

### Widths and spacing

- Wide shell: `min(1300px, calc(100vw - 64px))`
- Reading measure: 720px
- Narrow measure: 600px
- Desktop section rhythm: 88–144px, proportional to content
- Mobile section rhythm: 56–88px
- Touch targets: approximately 44px minimum where practical

### Shape, border, and image rules

- Cards are sharp or lightly softened; thin rules do most structural work.
- Circular crops are reserved for relationships or conceptual bridges.
- Offset rectangles introduce place, process, or institutional evidence.
- Card images use stable aspect ratios; primary images load eagerly, below-fold images lazily.
- Images never contain essential interface text and never name children.

### Focus and motion

- Focus uses a 3px deep-blue outline with 3px offset.
- Motion is limited to menu/state transitions and restrained hover feedback.
- `prefers-reduced-motion` removes nonessential transitions and smooth scrolling.

## Shared components

- Two-row desktop header and accessible mobile menu
- About/People relationship in desktop and mobile navigation
- Footer groups: Explore, Families, Connect, Policies, Contact and Social
- Page introduction with editorial proposition, context, and optional image
- Editorial image/text rows with square, tall, offset, or circular media
- Program comparison collection
- Dated record cards and record metadata
- Status notices for dated, historical, deferred, or owner-required information
- CTA bands that preserve family, supporter, educator, and contact boundaries
- Contact facts and document/external-link treatments

## Page-composition families

- Home: preserved Reggio prototype rhythm
- Family decision pages: direct introduction, comparison/steps, evidence, contextual CTA
- Approach/About pages: open editorial rows, varied image scale, dated evidence
- People: maintainable grouped roster with visible verification notice
- News: date-led ledger and repeatable record template
- Service/policy pages: concise, transparent status notices and governed fallbacks

## Responsive behavior

- Above 1060px: exact two-row desktop header; four-column collections where appropriate.
- 821–1060px: mobile header; two-column collections; open editorial rows retained.
- 621–820px: single- or two-column content based on reading order.
- 320–620px: deliberate single column; media remains meaningful; actions stack; no body overflow.

## Accessibility floor

Semantic landmarks and headings, visible skip link, keyboard-complete menus, Escape/focus restoration, route-change menu closing, body-scroll control, descriptive links, useful alt text, status text not conveyed by color alone, and direct-load/refresh support for every route. This implementation targets WCAG 2.2 AA design criteria without claiming conformance.
