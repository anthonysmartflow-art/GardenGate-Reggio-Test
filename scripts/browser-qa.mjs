import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { archiveRecords, fixedRoutes, legacyRedirects } from '../src/siteData.js'

const playwrightSpecifier = process.env.GARDEN_GATE_PLAYWRIGHT_PATH
  ? pathToFileURL(process.env.GARDEN_GATE_PLAYWRIGHT_PATH).href
  : 'playwright'
const { chromium } = await import(playwrightSpecifier)

const baseUrl = process.env.GARDEN_GATE_QA_URL || 'http://127.0.0.1:4171'
const outputRoot = resolve('verification')
const screenshotRoot = resolve(outputRoot, 'screenshots')
const representativeRecords = [
  `/news/${archiveRecords[0].slug}`,
  '/news/baby-cow-scholarship-fund',
]
const routes = [...fixedRoutes, ...representativeRecords]
const viewports = [
  ['desktop', 1440, 900],
  ['laptop', 1024, 768],
  ['tablet', 768, 1024],
  ['phone', 390, 844],
  ['narrow', 320, 740],
]

const slugFor = (route) => route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')

await mkdir(screenshotRoot, { recursive: true })
await mkdir(resolve(screenshotRoot, 'desktop'), { recursive: true })
await mkdir(resolve(screenshotRoot, 'mobile'), { recursive: true })

const browser = await chromium.launch({
  headless: true,
  ...(process.env.GARDEN_GATE_BROWSER_PATH ? { executablePath: process.env.GARDEN_GATE_BROWSER_PATH } : {}),
})
const results = []
const consoleErrors = []

for (const [viewportName, width, height] of viewports) {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(`${viewportName}\t${page.url()}\t${message.text()}`)
  })
  page.on('pageerror', (error) => consoleErrors.push(`${viewportName}\t${page.url()}\t${error.message}`))

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(async () => {
      const images = [...document.images]
      images.forEach((image) => { image.loading = 'eager' })
      await Promise.race([
        Promise.all(images.map((image) => image.complete
          ? Promise.resolve()
          : new Promise((resolveImage) => {
            image.addEventListener('load', resolveImage, { once: true })
            image.addEventListener('error', resolveImage, { once: true })
          }))),
        new Promise((resolveTimeout) => window.setTimeout(resolveTimeout, 5000)),
      ])
    })
    const metrics = await page.evaluate(() => ({
      title: document.title,
      h1Count: document.querySelectorAll('main h1').length,
      h1: document.querySelector('main h1')?.textContent?.trim() || '',
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      brokenImages: [...document.images].filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src),
      missingAlt: [...document.images].filter((image) => !image.hasAttribute('alt')).map((image) => image.src),
      portugueseLinks: [...document.querySelectorAll('a')].filter((link) => link.textContent.includes('Em Português')).map((link) => link.href),
      donateHrefs: [...document.querySelectorAll('a')].filter((link) => link.textContent.trim() === 'Donate').map((link) => link.href),
    }))
    results.push({
      viewport: viewportName,
      width,
      route,
      status: response?.status() ?? 0,
      finalUrl: new URL(page.url()).pathname,
      ...metrics,
      overflow: metrics.scrollWidth > metrics.clientWidth,
    })

    if (viewportName === 'desktop' || viewportName === 'phone') {
      const folder = viewportName === 'desktop' ? 'desktop' : 'mobile'
      await page.screenshot({ path: resolve(screenshotRoot, folder, `${slugFor(route)}.png`), fullPage: true })
    }
  }

  await context.close()
}

const interactionContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
const interactionPage = await interactionContext.newPage()
await interactionPage.goto(baseUrl, { waitUntil: 'networkidle' })
const menuButton = interactionPage.locator('.menu-button')
await menuButton.click()
const menuOpen = await menuButton.getAttribute('aria-expanded')
const mobileLabels = await interactionPage.locator('#mobile-menu a, #mobile-menu .menu-language').allTextContents()
await interactionPage.keyboard.press('Escape')
await interactionPage.locator('#mobile-menu').waitFor({ state: 'detached' })
await interactionPage.evaluate(() => new Promise((resolveFrame) => window.requestAnimationFrame(resolveFrame)))
const menuClosed = await menuButton.getAttribute('aria-expanded')
const focusRestored = await interactionPage.evaluate(() => document.activeElement?.classList.contains('menu-button'))

await interactionPage.setViewportSize({ width: 1440, height: 900 })
await interactionPage.goto(baseUrl, { waitUntil: 'networkidle' })
const desktopUtility = await interactionPage.locator('.utility-nav a').allTextContents()
const desktopMain = await interactionPage.locator('.main-links > li > a, .main-links .about-control > a').allTextContents()
const portugueseTag = await interactionPage.locator('.language-unavailable').evaluate((element) => element.tagName)

const redirectResults = []
for (const [from, to] of Object.entries(legacyRedirects)) {
  await interactionPage.goto(`${baseUrl}${from}`, { waitUntil: 'networkidle' })
  redirectResults.push({ from, expected: to, actual: new URL(interactionPage.url()).pathname })
}

await interactionContext.close()
await browser.close()

const summary = {
  baseUrl,
  generatedAt: new Date().toISOString(),
  routeChecks: results,
  consoleErrors,
  mobileMenu: { menuOpen, menuClosed, focusRestored, labels: mobileLabels.map((label) => label.trim().replace(/\s+/g, ' ')) },
  desktopNavigation: {
    utility: desktopUtility.map((label) => label.trim()),
    main: desktopMain.map((label) => label.trim()),
    portugueseTag,
  },
  redirects: redirectResults,
}

await writeFile(resolve(outputRoot, 'browser-results.json'), `${JSON.stringify(summary, null, 2)}\n`)
await copyFile(resolve(screenshotRoot, 'desktop', 'home.png'), resolve(outputRoot, 'home-desktop.png'))
await copyFile(resolve(screenshotRoot, 'mobile', 'home.png'), resolve(outputRoot, 'home-mobile.png'))

const failures = [
  ...results.filter((item) => item.status !== 200 || item.h1Count !== 1 || item.overflow || item.brokenImages.length || item.missingAlt.length || item.portugueseLinks.length),
  ...redirectResults.filter((item) => item.actual !== item.expected),
]

if (consoleErrors.length || failures.length || menuOpen !== 'true' || menuClosed !== 'false' || !focusRestored) {
  console.error(JSON.stringify({ failures, consoleErrors, menuOpen, menuClosed, focusRestored }, null, 2))
  process.exitCode = 1
} else {
  console.log(`Checked ${results.length} route/viewport combinations, ${redirectResults.length} redirects, and mobile menu behavior.`)
}
