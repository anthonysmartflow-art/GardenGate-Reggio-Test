import React, { useEffect, useRef, useState } from 'react'

const donationUrl = 'https://www.gardengatemv.org/donate'

const utilityLinks = [
  ['Current Families', '/families'],
  ['For Educators', '/professional-development'],
  ['Employment', '/employment'],
  ['Support', '/support'],
  ['Contact', '/contact'],
]

const mainLinks = [
  ['Programs', '/programs'],
  ['Our Approach', '/approach'],
  ['About', '/about'],
  ['News & Resources', '/news'],
  ['Enrollment', '/enrollment'],
]

const programs = [
  {
    name: 'Studio One',
    audience: 'Younger children, mostly two- and three-year-olds',
    copy: 'Relationships, materials, play, and outdoor experiences shape the younger studio day.',
    image: '/images/material-table.jpg',
    alt: 'Paint, brushes, flowers, and water jars arranged on a Garden Gate work table.',
  },
  {
    name: 'Studio Two',
    audience: 'Primarily four- and five-year-olds',
    copy: 'A combined preschool and Kindergarten environment for projects, construction, stories, and collaboration.',
    image: '/images/painting-process.jpg',
    alt: 'A child uses a fine brush while painting at a table with flowers and water jars.',
  },
  {
    name: 'Kindergarten',
    audience: 'Part of the combined older-child model',
    copy: 'Inquiry, play, creative work, relationships, and individual development remain connected.',
    image: '/images/studio-relationship.jpg',
    alt: 'Several children work together with open-ended materials around a studio table.',
  },
  {
    name: 'Summer',
    audience: 'A place-connected seasonal experience',
    copy: 'Nature, storytelling, building, creative expression, relationships, and reflection guide the work.',
    image: '/images/featherstone-deck.jpg',
    alt: 'Two children look at books and draw on a colorful mat on an outdoor deck.',
  },
]

const practices = [
  {
    name: 'Observation and documentation',
    copy: 'Teachers listen, notice, document, and reflect so children’s ideas can be revisited and extended.',
    image: '/images/observation-drawing.jpg',
    alt: 'Children draw in sketchbooks while seated near displayed artwork.',
  },
  {
    name: 'Projects over time',
    copy: 'Questions can deepen through repeated encounters, shared theories, testing, and revision.',
    image: '/images/project-group.jpg',
    alt: 'A small group of children works together with clay, natural pieces, and drawing tools.',
  },
  {
    name: 'Materials and art',
    copy: 'Paint, clay, wood, wire, natural objects, and found materials become languages for thinking.',
    image: '/images/clay-construction.jpg',
    alt: 'Children’s hands fit wood wheels and metal pieces to a small clay construction.',
  },
  {
    name: 'Play and relationships',
    copy: 'Children negotiate, solve problems, listen to others, and build shared ideas through play.',
    image: '/images/collaboration-tiles.jpg',
    alt: 'An educator sits with four children as they build with translucent colored tiles outdoors.',
  },
]

function Arrow() {
  return <span aria-hidden="true">→</span>
}

function TextLink({ href, children, className = '', onClick }) {
  return (
    <a className={`text-link ${className}`.trim()} href={href} onClick={onClick}>
      <span>{children}</span>
      <Arrow />
    </a>
  )
}

function ButtonLink({ href, children, className = '', onClick }) {
  return (
    <a className={`button-link ${className}`.trim()} href={href} onClick={onClick}>
      {children}
    </a>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const menuPanelRef = useRef(null)
  const aboutButtonRef = useRef(null)

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false)
    if (restoreFocus) window.requestAnimationFrame(() => menuButtonRef.current?.focus())
  }

  const handleRouteChange = () => {
    setMenuOpen(false)
    setAboutOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const panel = menuPanelRef.current
    window.requestAnimationFrame(() => panel?.querySelector(focusableSelector)?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
        return
      }
      if (event.key !== 'Tab' || !panel) return

      const items = Array.from(panel.querySelectorAll(focusableSelector))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && aboutOpen) {
        setAboutOpen(false)
        aboutButtonRef.current?.focus()
      }
    }
    const handlePopState = () => handleRouteChange()
    const handleResize = () => {
      if (window.innerWidth > 1060) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('resize', handleResize)
    }
  }, [aboutOpen])

  return (
    <header className="site-header">
      <div className="desktop-header">
        <div className="utility-strip">
          <nav className="shell utility-nav" aria-label="Audience and utility">
            <ul>
              {utilityLinks.map(([label, href]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="main-header">
          <nav className="shell main-nav" aria-label="Primary">
            <a className="wordmark" href="/" aria-label="Garden Gate home">
              <strong>Garden Gate</strong>
              <span>Child Development Center</span>
            </a>

            <ul className="main-links">
              {mainLinks.map(([label, href]) => (
                <li className={label === 'About' ? 'about-menu' : ''} key={href}>
                  {label === 'About' ? (
                    <div className="about-control">
                      <a href={href}>About</a>
                      <button
                        ref={aboutButtonRef}
                        type="button"
                        aria-label="Show About submenu"
                        aria-expanded={aboutOpen}
                        aria-controls="desktop-about-submenu"
                        onClick={() => setAboutOpen((value) => !value)}
                      >
                        <span aria-hidden="true">⌄</span>
                      </button>
                      {aboutOpen && (
                        <ul className="submenu" id="desktop-about-submenu">
                          <li><a href="/about/people" onClick={() => setAboutOpen(false)}>People</a></li>
                        </ul>
                      )}
                    </div>
                  ) : (
                    <a href={href}>{label}</a>
                  )}
                </li>
              ))}
            </ul>

            <a className="header-donate" href={donationUrl}>Donate</a>
            <span
              className="language-unavailable"
              role="status"
              aria-label="Em Português, currently unavailable"
              title="Portuguese content is not currently available"
            >
              Em Português
            </span>
          </nav>
        </div>
      </div>

      <div className="mobile-header">
        <div className="mobile-bar shell">
          <a className="mobile-wordmark" href="/" aria-label="Garden Gate home">
            <strong>Garden Gate</strong>
            <span>Child Development Center</span>
          </a>
          <div className="mobile-actions">
            <a className="mobile-donate" href={donationUrl}>Donate</a>
            <button
              ref={menuButtonRef}
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
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
                    <a href={href} onClick={handleRouteChange}>{label}</a>
                    {label === 'About' && (
                      <ul className="mobile-child-list">
                        <li><a href="/about/people" onClick={handleRouteChange}>People</a></li>
                      </ul>
                    )}
                  </li>
                ))}
                <li><a className="menu-donate" href={donationUrl} onClick={handleRouteChange}>Donate</a></li>
                <li>
                  <span className="menu-language" role="status" tabIndex="0">
                    Em Português <small>Unavailable</small>
                  </span>
                </li>
              </ul>

              <p className="menu-label menu-label--utility">For our community</p>
              <ul className="mobile-utility-list">
                {utilityLinks.map(([label, href]) => (
                  <li key={href}><a href={href} onClick={handleRouteChange}>{label}</a></li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />

      <main id="main-content">
        <section className="editorial-hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">A nonprofit early-learning community in Oak Bluffs</p>
            <h1 id="hero-title">Children are capable thinkers.</h1>
            <p className="hero-lede">
              Garden Gate’s Reggio-inspired approach gives children’s questions time, materials,
              relationships, and adults who listen.
            </p>
            <div className="hero-actions">
              <TextLink href="/programs">Explore Programs</TextLink>
              <TextLink href="/approach">See Our Approach</TextLink>
            </div>
          </div>

          <figure className="hero-composition">
            <div className="hero-main-image">
              <img
                src="/images/collaboration-tiles.jpg"
                alt="An educator sits with four children as they build with translucent colored tiles outdoors."
                fetchPriority="high"
              />
            </div>
            <div className="hero-detail hero-detail--table" aria-hidden="true">
              <img src="/images/material-table.jpg" alt="" />
            </div>
            <div className="hero-detail hero-detail--paint" aria-hidden="true">
              <img src="/images/painting-process.jpg" alt="" />
            </div>
            <figcaption>Relationships, light, and open-ended materials give a shared idea room to grow.</figcaption>
          </figure>
        </section>

        <section className="highlight-section" aria-labelledby="highlight-title">
          <div className="shell highlight-grid">
            <div className="highlight-copy">
              <p className="eyebrow">News & Resources · May 29, 2026</p>
              <h2 id="highlight-title">A Beautiful Place to Spend Childhood</h2>
              <p>
                This dated Garden Gate Approach newsletter looks at outdoor curriculum and learning
                spaces. It is one first-party record of practice, not a promise that every day is identical.
              </p>
              <TextLink href="/news">Read in News & Resources</TextLink>
            </div>
            <article className="highlight-card">
              <img
                src="/images/meadow-inquiry.jpg"
                alt="Children move through tall meadow grasses in a wide outdoor area."
                loading="lazy"
              />
              <div>
                <span>Outdoor inquiry</span>
                <p>Movement, observation, and relationship with place.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="collection-section programs-collection shell" aria-labelledby="programs-title">
          <header className="centered-intro">
            <p className="eyebrow">Programs at Garden Gate</p>
            <h2 id="programs-title">Four paths through one connected approach</h2>
            <p>
              Each program is shaped by relationships, play, inquiry, creative materials, and time outdoors.
              Detailed operating information belongs on Programs.
            </p>
          </header>

          <div className="card-grid program-grid">
            {programs.map((program) => (
              <article className="editorial-card program-card" key={program.name}>
                <img src={program.image} alt={program.alt} loading="lazy" />
                <div className="card-copy">
                  <p className="card-meta">{program.audience}</p>
                  <h3>{program.name}</h3>
                  <p>{program.copy}</p>
                  <TextLink href="/programs">Explore program</TextLink>
                </div>
              </article>
            ))}
          </div>

          <div className="collection-action"><TextLink href="/programs">Explore Programs</TextLink></div>
        </section>

        <section className="approach-band" aria-labelledby="approach-title">
          <img
            className="approach-circle"
            src="/images/belonging-hands.jpg"
            alt="Two children hold hands while walking outdoors."
            loading="lazy"
          />
          <div className="approach-copy shell">
            <p className="eyebrow">Our approach</p>
            <h2 id="approach-title">Learning begins with a capable child.</h2>
            <p>
              Teachers listen and observe, prepare possibilities, document what happens, and reflect
              on where a question might go next. Projects can deepen through repeated encounters.
            </p>
            <TextLink href="/approach">See Our Approach</TextLink>
          </div>
        </section>

        <section className="collection-section practice-collection shell" aria-labelledby="practice-title">
          <header className="centered-intro">
            <p className="eyebrow">The approach in action</p>
            <h2 id="practice-title">Learning made visible</h2>
            <p>
              Garden Gate connects observation, projects, materials, art, play, relationships,
              documentation, and outdoor inquiry.
            </p>
          </header>

          <div className="card-grid practice-grid">
            {practices.map((practice) => (
              <article className="editorial-card practice-card" key={practice.name}>
                <img src={practice.image} alt={practice.alt} loading="lazy" />
                <div className="card-copy">
                  <p className="card-meta">Observable practice</p>
                  <h3>{practice.name}</h3>
                  <p>{practice.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="collection-action"><TextLink href="/approach">See Our Approach</TextLink></div>
        </section>

        <section className="institutional-section shell" aria-label="Belonging, place, and trust">
          <article className="institutional-row institutional-row--belonging">
            <figure className="institutional-media circle-media">
              <img src="/images/belonging-hands.jpg" alt="Two children hold hands while walking outdoors." loading="lazy" />
            </figure>
            <div className="institutional-copy">
              <p className="eyebrow">Belonging and family partnership</p>
              <h2>Belonging is practiced in the everyday.</h2>
              <p>
                Garden Gate describes inclusive participation, anti-bias work, family voice, daily
                communication, inclusive materials, and connections to outside resources as parts
                of its community practice.
              </p>
              <p>
                Families are participants in children’s learning. Current Equitable Tuition mechanics,
                scholarship support, and availability still require confirmation before launch.
              </p>
              <TextLink href="/about">About Garden Gate</TextLink>
            </div>
          </article>

          <article className="institutional-row institutional-row--outdoors">
            <div className="institutional-copy">
              <p className="eyebrow">Outdoor inquiry</p>
              <h2>The environment extends the studio.</h2>
              <p>
                Outdoor spaces support movement, close observation, imagination, relationship, and
                questions that change with weather, season, and place.
              </p>
              <TextLink href="/approach">See Our Approach</TextLink>
            </div>
            <figure className="institutional-media tall-media">
              <img src="/images/meadow-inquiry.jpg" alt="Children move through tall meadow grasses outdoors." loading="lazy" />
              <figcaption>A wider environment invites children to notice, move, and wonder together.</figcaption>
            </figure>
          </article>

          <article className="institutional-row institutional-row--place">
            <figure className="institutional-media offset-media">
              <img
                src="/images/featherstone-campus.jpg"
                alt="Garden Gate’s low gray building behind a white fence painted with colorful marks."
                loading="lazy"
              />
            </figure>
            <div className="institutional-copy">
              <p className="eyebrow">Featherstone, history, and trust</p>
              <h2>Rooted in an arts-campus setting.</h2>
              <p>
                Garden Gate opened in 1999 and is located at 30 Featherstone Lane on the Featherstone
                Center for the Arts campus in Oak Bluffs. Garden Gate Child Development Center Inc.
                is a nonprofit early-education organization.
              </p>
              <ul className="trust-list" aria-label="Evidence-backed trust facts">
                <li><strong>1999</strong><span>Garden Gate opened.</span></li>
                <li><strong>Oak Bluffs</strong><span>30 Featherstone Lane.</span></li>
                <li><strong>2025–26</strong><span>Dated first-party newsletters record current examples of practice.</span></li>
              </ul>
              <div className="inline-actions">
                <TextLink href="/about">About Garden Gate</TextLink>
                <TextLink href="/about/people">Meet Our People</TextLink>
              </div>
            </div>
          </article>
        </section>

        <section className="news-section" aria-labelledby="news-title">
          <div className="shell">
            <header className="centered-intro">
              <p className="eyebrow">News & Resources</p>
              <h2 id="news-title">The work, with a date attached</h2>
              <p>Dated first-party records show examples from a specific moment.</p>
            </header>

            <div className="news-grid">
              <article>
                <time dateTime="2026-05-29">May 29, 2026</time>
                <h3>A Beautiful Place to Spend Childhood</h3>
                <p>A Garden Gate Approach newsletter about outdoor curriculum and learning spaces.</p>
                <TextLink href="/news">View record</TextLink>
              </article>
              <article>
                <time dateTime="2026-07-08">July 8, 2026</time>
                <h3>Belonging to This Place</h3>
                <p>A summer newsletter about noticing, relationship, and questions of who lives here.</p>
                <TextLink href="/news">View record</TextLink>
              </article>
            </div>

            <div className="collection-action"><TextLink href="/news">View News & Resources</TextLink></div>
          </div>
        </section>

        <section className="enrollment-section" aria-labelledby="enrollment-title">
          <div className="shell enrollment-grid">
            <div>
              <p className="eyebrow">For prospective families</p>
              <h2 id="enrollment-title">Could Garden Gate be a fit for your child and family?</h2>
            </div>
            <div className="enrollment-copy">
              <p>
                The Enrollment page owns the current process and application context. This prototype
                does not promise openings, timing, acceptance, or form behavior.
              </p>
              <ButtonLink href="/enrollment">Begin Enrollment</ButtonLink>
            </div>
          </div>
        </section>

        <section className="support-section" aria-labelledby="support-title">
          <div className="shell support-grid">
            <div>
              <p className="eyebrow">Support Garden Gate</p>
              <h2 id="support-title">Help sustain the places and practices where ideas grow.</h2>
            </div>
            <div className="support-copy">
              <p>
                Contributed support can strengthen learning environments, arts and materials,
                educator development, access and belonging work, and connection to community.
              </p>
              <div className="support-actions">
                <ButtonLink href={donationUrl} className="button-link--white">Donate</ButtonLink>
                <TextLink href="/support" className="text-link--white">Why Support Matters</TextLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-contact-tier">
          <div className="shell footer-contact-grid">
            <div className="footer-identity">
              <a className="footer-wordmark" href="/">
                <strong>Garden Gate</strong>
                <span>Child Development Center</span>
              </a>
              <p>A nonprofit early-learning community in Oak Bluffs, Massachusetts.</p>
            </div>
            <address>
              <h2>Visit</h2>
              <p>30 Featherstone Lane<br />Oak Bluffs, MA 02557</p>
              <p>Mail: PO Box 2666<br />Vineyard Haven, MA 02568</p>
            </address>
            <address>
              <h2>Contact</h2>
              <p><a href="tel:+17745632435">(774) 563-2435</a></p>
              <p><a href="mailto:gardengatecdc@hotmail.com">gardengatecdc@hotmail.com</a></p>
              <p className="social-links">
                <a href="https://www.facebook.com/GardenGateCDC/">Facebook</a>
                <a href="https://www.instagram.com/gardengatecdc/">Instagram</a>
              </p>
            </address>
          </div>
        </div>

        <div className="footer-link-tier">
          <div className="shell footer-link-grid">
            <nav aria-label="Explore">
              <h2>Explore</h2>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/programs">Programs</a></li>
                <li><a href="/approach">Our Approach</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/about/people">People</a></li>
              </ul>
            </nav>
            <nav aria-label="Families">
              <h2>Families</h2>
              <ul>
                <li><a href="/enrollment">Enrollment</a></li>
                <li><a href="/families">Current Families</a></li>
                <li><a href="/news">News & Resources</a></li>
              </ul>
            </nav>
            <nav aria-label="Connect">
              <h2>Connect</h2>
              <ul>
                <li><a href="/professional-development">Professional Development</a></li>
                <li><a href="/employment">Employment</a></li>
                <li><a href="/support">Support</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href={donationUrl}>Donate</a></li>
              </ul>
            </nav>
            <nav aria-label="Policies">
              <h2>Policies</h2>
              <ul>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/accessibility">Accessibility</a></li>
              </ul>
            </nav>
          </div>
          <div className="shell footer-note">
            <p>Unapproved Stage 7 comparison test. Not a production website.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
