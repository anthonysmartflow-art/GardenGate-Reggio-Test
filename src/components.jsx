import React, { useEffect, useRef, useState } from 'react'
import { contactFacts, donationUrl, mainLinks, utilityLinks } from './siteData.js'

export function Arrow() {
  return <span aria-hidden="true">→</span>
}

export function TextLink({ href, children, className = '', external = false }) {
  return (
    <a
      className={`text-link ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

export function ButtonLink({ href, children, className = '', external = false }) {
  return (
    <a
      className={`button-link ${className}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Header({ path }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuPanelRef = useRef(null)
  const aboutButtonRef = useRef(null)

  useEffect(() => {
    setMenuOpen(false)
    setAboutOpen(false)
  }, [path])

  useEffect(() => {
    if (!menuOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const panel = menuPanelRef.current
    const selector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => panel?.querySelector(selector)?.focus())

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        window.requestAnimationFrame(() => menuButtonRef.current?.focus())
        return
      }
      if (event.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll(selector)]
      if (!items.length) return
      const [first] = items
      const last = items.at(-1)
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && aboutOpen) {
        setAboutOpen(false)
        aboutButtonRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth > 1060) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [aboutOpen])

  const current = (href) => path === href || (href !== '/' && path.startsWith(`${href}/`))

  return (
    <header className="site-header">
      <div className="desktop-header">
        <div className="utility-strip">
          <nav className="shell utility-nav" aria-label="Audience and utility">
            <ul>
              {utilityLinks.map(([label, href]) => (
                <li key={href}><a href={href} aria-current={current(href) ? 'page' : undefined}>{label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="main-header">
          <nav className="shell main-nav" aria-label="Primary">
            <a className="wordmark" href="/" aria-label="Garden Gate home" aria-current={path === '/' ? 'page' : undefined}>
              <strong>Garden Gate</strong><span>Child Development Center</span>
            </a>
            <ul className="main-links">
              {mainLinks.map(([label, href]) => (
                <li className={label === 'About' ? 'about-menu' : ''} key={href}>
                  {label === 'About' ? (
                    <div className="about-control">
                      <a href={href} aria-current={current(href) ? 'page' : undefined}>About</a>
                      <button
                        ref={aboutButtonRef}
                        type="button"
                        aria-label="Show About submenu"
                        aria-expanded={aboutOpen}
                        aria-controls="desktop-about-submenu"
                        onClick={() => setAboutOpen((value) => !value)}
                      ><span aria-hidden="true">⌄</span></button>
                      {aboutOpen && (
                        <ul className="submenu" id="desktop-about-submenu">
                          <li><a href="/about/people" aria-current={path === '/about/people' ? 'page' : undefined}>People</a></li>
                        </ul>
                      )}
                    </div>
                  ) : <a href={href} aria-current={current(href) ? 'page' : undefined}>{label}</a>}
                </li>
              ))}
            </ul>
            <a className="header-donate" href={donationUrl}>Donate</a>
            <span className="language-unavailable" role="status" aria-label="Em Português, currently unavailable" title="Portuguese content is not currently available">Em Português</span>
          </nav>
        </div>
      </div>

      <div className="mobile-header">
        <div className="mobile-bar shell">
          <a className="mobile-wordmark" href="/" aria-label="Garden Gate home"><strong>Garden Gate</strong><span>Child Development Center</span></a>
          <div className="mobile-actions">
            <a className="mobile-donate" href={donationUrl}>Donate</a>
            <button ref={menuButtonRef} className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
              <span>{menuOpen ? 'Close' : 'Menu'}</span><span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu" ref={menuPanelRef}>
            <nav className="shell" aria-label="Mobile primary">
              <p className="menu-label">Explore</p>
              <ul className="mobile-main-list">
                {mainLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} aria-current={current(href) ? 'page' : undefined}>{label}</a>
                    {label === 'About' && <ul className="mobile-child-list"><li><a href="/about/people" aria-current={path === '/about/people' ? 'page' : undefined}>People</a></li></ul>}
                  </li>
                ))}
                <li><a className="menu-donate" href={donationUrl}>Donate</a></li>
                <li><span className="menu-language" role="status" tabIndex="0">Em Português <small>Unavailable</small></span></li>
              </ul>
              <p className="menu-label menu-label--utility">For our community</p>
              <ul className="mobile-utility-list">
                {utilityLinks.map(([label, href]) => <li key={href}><a href={href} aria-current={current(href) ? 'page' : undefined}>{label}</a></li>)}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-contact-tier">
        <div className="shell footer-contact-grid">
          <div className="footer-identity">
            <a className="footer-wordmark" href="/"><strong>Garden Gate</strong><span>Child Development Center</span></a>
            <p>A nonprofit early-learning community in Oak Bluffs, Massachusetts.</p>
          </div>
          <address><h2>Visit</h2><p>30 Featherstone Lane<br />Oak Bluffs, MA 02557</p><p>Mail: PO Box 2666<br />Vineyard Haven, MA 02568</p></address>
          <address>
            <h2>Contact</h2><p><a href={contactFacts.phone}>{contactFacts.phoneLabel}</a></p><p><a href={contactFacts.email}>{contactFacts.emailLabel}</a></p>
            <p className="social-links"><a href={contactFacts.facebook} target="_blank" rel="noreferrer">Facebook</a><a href={contactFacts.instagram} target="_blank" rel="noreferrer">Instagram</a></p>
          </address>
        </div>
      </div>
      <div className="footer-link-tier">
        <div className="shell footer-link-grid">
          <nav aria-label="Explore"><h2>Explore</h2><ul><li><a href="/">Home</a></li><li><a href="/programs">Programs</a></li><li><a href="/approach">Our Approach</a></li><li><a href="/about">About</a></li><li><a href="/about/people">People</a></li></ul></nav>
          <nav aria-label="Families"><h2>Families</h2><ul><li><a href="/enrollment">Enrollment</a></li><li><a href="/families">Current Families</a></li><li><a href="/news">News & Resources</a></li></ul></nav>
          <nav aria-label="Connect"><h2>Connect</h2><ul><li><a href="/professional-development">Professional Development</a></li><li><a href="/employment">Employment</a></li><li><a href="/support">Support</a></li><li><a href="/contact">Contact</a></li><li><a href={donationUrl}>Donate</a></li></ul></nav>
          <nav aria-label="Policies"><h2>Policies</h2><ul><li><a href="/privacy">Privacy</a></li><li><a href="/accessibility">Accessibility</a></li></ul></nav>
        </div>
        <div className="shell footer-note"><p>Unapproved full-site prototype. Not a production website.</p></div>
      </div>
    </footer>
  )
}

export function PageHero({ eyebrow, title, intro, image, alt, children, compact = false, className = '' }) {
  return (
    <section className={`page-hero shell ${compact ? 'page-hero--compact' : ''} ${className}`.trim()}>
      <div className="page-hero__copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-hero__intro">{intro}</p>{children}</div>
      {image && <figure className="page-hero__media"><img src={image} alt={alt} fetchPriority="high" /></figure>}
    </section>
  )
}

export function OwnerNotice({ children }) {
  return <aside className="owner-notice shell" aria-label="What Garden Gate is confirming"><strong>What we’re confirming</strong><p>{children}</p></aside>
}

export function SectionIntro({ eyebrow, title, children, align = 'left' }) {
  return <header className={`section-intro section-intro--${align}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</header>
}

export function EnrollmentBridge() {
  return (
    <section className="enrollment-section" aria-labelledby="shared-enrollment-title">
      <div className="shell enrollment-grid"><div><p className="eyebrow">For prospective families</p><h2 id="shared-enrollment-title">Could Garden Gate be a fit for your child and family?</h2></div><div className="enrollment-copy"><p>The Enrollment page explains the captured process and identifies what must still be confirmed. It does not promise openings, timing, or acceptance.</p><ButtonLink href="/enrollment">Begin Enrollment</ButtonLink></div></div>
    </section>
  )
}

export function SupportBridge() {
  return (
    <section className="support-section" aria-labelledby="shared-support-title">
      <div className="shell support-grid"><div><p className="eyebrow">Support Garden Gate</p><h2 id="shared-support-title">Help sustain places and practices where ideas grow.</h2></div><div className="support-copy"><p>Contributed support can strengthen learning environments, materials, educator development, access and belonging work, and community connection.</p><div className="support-actions"><ButtonLink href={donationUrl} className="button-link--white">Donate</ButtonLink><TextLink href="/support" className="text-link--white">Why Support Matters</TextLink></div></div></div>
    </section>
  )
}
