import React, { useEffect, useMemo, useState } from 'react'
import { Footer, Header } from './components.jsx'
import { archiveRecords, legacyRedirects } from './siteData.js'
import {
  AboutPage,
  ApproachPage,
  ContactPage,
  EmploymentPage,
  EnrollmentPage,
  FamiliesPage,
  HomePage,
  NewsPage,
  NewsRecordPage,
  NotFoundPage,
  pageMeta,
  PeoplePage,
  PolicyPage,
  ProfessionalDevelopmentPage,
  ProgramsPage,
  SupportPage,
} from './pages.jsx'

const normalizePath = (value) => {
  const clean = value.split('?')[0].split('#')[0].replace(/\/+$/, '')
  return clean || '/'
}

const fixedPages = {
  '/': <HomePage />,
  '/programs': <ProgramsPage />,
  '/approach': <ApproachPage />,
  '/about': <AboutPage />,
  '/about/people': <PeoplePage />,
  '/news': <NewsPage />,
  '/enrollment': <EnrollmentPage />,
  '/families': <FamiliesPage />,
  '/support': <SupportPage />,
  '/professional-development': <ProfessionalDevelopmentPage />,
  '/employment': <EmploymentPage />,
  '/contact': <ContactPage />,
  '/privacy': <PolicyPage type="privacy" />,
  '/accessibility': <PolicyPage type="accessibility" />,
}

function resolveInitialPath() {
  const requested = normalizePath(window.location.pathname)
  const canonical = legacyRedirects[requested]
  if (canonical && canonical !== requested) {
    window.history.replaceState({}, '', canonical)
    return canonical
  }
  return requested
}

function App() {
  const [path, setPath] = useState(resolveInitialPath)

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname))
    const onDocumentClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target.closest('a[href]')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      event.preventDefault()
      const next = legacyRedirects[normalizePath(url.pathname)] || normalizePath(url.pathname)
      window.history.pushState({}, '', `${next}${url.search}${url.hash}`)
      setPath(next)
    }
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onDocumentClick)
    return () => {
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onDocumentClick)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    window.requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
  }, [path])

  const record = useMemo(() => {
    if (!path.startsWith('/news/')) return null
    return archiveRecords.find((entry) => entry.slug === path.slice('/news/'.length)) || null
  }, [path])

  useEffect(() => {
    const [title, description] = record
      ? [`${record.title} | Garden Gate`, record.summary]
      : pageMeta[path] || ['Page not found | Garden Gate', 'This address is not an active Garden Gate page.']
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `https://www.gardengatemv.org${path}`
  }, [path, record])

  const content = fixedPages[path]
    || (record ? <NewsRecordPage record={record} /> : <NotFoundPage deferred={path === '/em-portugues'} />)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header path={path} />
      <main id="main-content" tabIndex="-1">{content}</main>
      <Footer />
    </>
  )
}

export default App
