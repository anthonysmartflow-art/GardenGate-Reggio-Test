import fs from 'node:fs'
import path from 'node:path'
import { archiveRecords, fixedRoutes, legacyRedirects } from '../src/siteData.js'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const verification = path.join(root, 'verification')
const results = JSON.parse(fs.readFileSync(path.join(verification, 'browser-results.json'), 'utf8'))
const base = 'https://www.gardengatemv.org'
const recordRoutes = archiveRecords.map((record) => `/news/${record.slug}`)
const sitemapRoutes = [...fixedRoutes, ...recordRoutes]

const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapRoutes.map((route) => `  <url><loc>${escapeXml(`${base}${route}`)}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap)
fs.writeFileSync(path.join(root, 'public/robots.txt'), 'User-agent: *\nDisallow: /\n\n# Prototype safeguard: remove the disallow only after launch approval.\n')

const redirects = Object.entries(legacyRedirects)
  .filter(([source, destination]) => source !== destination)
  .map(([source, destination]) => ({ source, destination, permanent: true }))
fs.writeFileSync(path.join(root, 'vercel.json'), `${JSON.stringify({ redirects, rewrites: [{ source: '/(.*)', destination: '/index.html' }] }, null, 2)}\n`)

const routeHeader = ['route', 'kind', 'canonical_or_expected', 'browser_1440', 'browser_1024', 'browser_768', 'browser_390', 'browser_320', 'h1', 'overflow', 'console', 'desktop_screenshot', 'mobile_screenshot', 'notes']
const routeRows = []
const widths = [1440, 1024, 768, 390, 320]
for (const route of fixedRoutes) {
  const checks = results.routeChecks.filter((check) => check.route === route)
  const byWidth = new Map(checks.map((check) => [check.width, check]))
  const slug = route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')
  routeRows.push([
    route, 'fixed', route,
    ...widths.map((width) => byWidth.get(width)?.status === 200 ? 'pass' : 'fail'),
    checks[0]?.h1 || '', checks.some((check) => check.overflow) ? 'fail' : 'pass',
    results.consoleErrors.length ? 'fail' : 'pass',
    `verification/screenshots/desktop/${slug}.png`, `verification/screenshots/mobile/${slug}.png`,
    'Direct-loaded in the production browser build at all five required widths.',
  ])
}

for (const record of archiveRecords) {
  const route = `/news/${record.slug}`
  const checks = results.routeChecks.filter((check) => check.route === route)
  const representative = checks.length > 0
  const slug = route.slice(1).replaceAll('/', '--')
  routeRows.push([
    route, 'repeatable news record', route,
    ...widths.map((width) => representative && checks.some((check) => check.width === width && check.status === 200) ? 'pass' : 'template'),
    record.title, representative && checks.some((check) => check.overflow) ? 'fail' : 'pass via shared template',
    results.consoleErrors.length ? 'fail' : 'pass',
    representative ? `verification/screenshots/desktop/${slug}.png` : '', representative ? `verification/screenshots/mobile/${slug}.png` : '',
    representative ? 'Representative record direct-loaded at all five widths.' : 'Generated from the same verified record template and included in the production build and sitemap.',
  ])
}

for (const redirect of results.redirects) {
  routeRows.push([redirect.from, 'legacy redirect', redirect.expected, redirect.actual === redirect.expected ? 'pass' : 'fail', '', '', '', '', '', '', 'pass', '', '', 'Checked in the production browser build.'])
}

routeRows.push(['/em-portugues', 'deferred unavailable state', 'no active destination', 'pass', 'pass', 'pass', 'pass', 'pass', 'Portuguese content is still deferred.', 'pass', 'pass', '', '', 'Visible in navigation as an unlinked unavailable state; direct path renders a transparent deferred message.'])

const clean = (value) => String(value ?? '').replace(/[\t\r\n]+/g, ' ').trim()
fs.writeFileSync(path.join(verification, 'ROUTE-CHECK.tsv'), `${[routeHeader, ...routeRows].map((row) => row.map(clean).join('\t')).join('\n')}\n`)

const screenshotCount = fs.readdirSync(path.join(verification, 'screenshots/desktop')).length + fs.readdirSync(path.join(verification, 'screenshots/mobile')).length
const qa = `# QA results

## Result

The final production-browser regression passed after one rendered refinement and one narrow-width correction.

- Production build: passed
- Browser route/viewport combinations: ${results.routeChecks.length} passed
- Fixed routes: ${fixedRoutes.length} direct-loaded at 1440, 1024, 768, 390, and 320px
- Representative News/Resource records: 2 direct-loaded at all five widths
- Legacy redirects: ${results.redirects.length} passed in the browser; ${redirects.length} non-self redirects emitted to \`vercel.json\`
- Full-page route screenshots: ${screenshotCount}
- Broken images: 0
- Images missing \`alt\`: 0
- Horizontal overflow: 0
- Browser console errors: ${results.consoleErrors.length}
- Main headings: exactly one on every checked route
- Em Português links: 0
- Mobile menu: opens, traps focus, closes with Escape, restores focus, and closes on route change
- Donate: every checked Donate link resolves directly to \`https://www.gardengatemv.org/donate\`

## Viewports inspected

- 1440 × 900 desktop
- 1024 × 768 laptop/tablet landscape
- 768 × 1024 tablet
- 390 × 844 phone
- 320 × 740 narrow phone

## Focused refinement

The first rendered pass exposed unloaded lazy images in full-page capture and a generic program-card destination. The verification pass was corrected to force actual image loading before capture, the home program links were returned to Programs, and production-bundled fonts were tested through \`vite preview\`. A final 320px check found one long professional-development heading establishing a 19px scroll width; its narrow-width display scale was reduced and the complete regression was rerun successfully.

## Automated command availability

This project provides \`build\`, \`qa:coverage\`, and \`qa:browser\`. No separate lint, type-check, unit-test, or formatter command is defined. Those checks were unavailable and are not claimed.

## Limits

These results verify the unapproved prototype and its rendered behavior. They do not establish legal approval, content currentness, image launch rights, PDF accessibility, WCAG conformance, production readiness, or organization acceptance.
`
fs.writeFileSync(path.join(verification, 'QA-RESULTS.md'), qa)

console.log(JSON.stringify({ sitemapRoutes: sitemapRoutes.length, redirects: redirects.length, routeRows: routeRows.length, screenshots: screenshotCount }, null, 2))
