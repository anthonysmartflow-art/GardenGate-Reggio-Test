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
  },
  {
    name: 'Studio Two',
    audience: 'Primarily four- and five-year-olds',
    copy: 'A combined preschool and Kindergarten environment for projects, construction, stories, and collaboration.',
  },
  {
    name: 'Kindergarten',
    audience: 'Part of the combined older-child model',
    copy: 'Inquiry, play, creative work, relationships, and individual development remain connected.',
  },
  {
    name: 'Summer',
    audience: 'A place-connected seasonal experience',
    copy: 'Nature, storytelling, building, creative expression, relationships, and reflection guide the work.',
  },
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ActionLink({ href, children, variant = 'text', onClick }) {
  return (
    <a className={`action action--${variant}`} href={href} onClick={onClick}>
      <span>{children}</span>
      <Arrow />
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
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
  }

  const handleRouteChange = () => {
    setMenuOpen(false)
    setAboutOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusable = menuPanelRef.current?.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    window.requestAnimationFrame(() => focusable?.focus())

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenu(true)
      }

      if (event.key !== 'Tab' || !menuPanelRef.current) return
      const items = Array.from(
        menuPanelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
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
    const handleEscape = (event) => {
      if (event.key === 'Escape' && aboutOpen) {
        setAboutOpen(false)
        aboutButtonRef.current?.focus()
      }
    }
    const handlePopState = () => handleRouteChange()
    const handleResize = () => {
      if (window.innerWidth > 1050) setMenuOpen(false)
    }

    document.addEventListener('keydown', handleEscape)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('resize', handleResize)
    }
  }, [aboutOpen])

  return (
    <header className="site-header">
      <div className="desktop-header">
        <nav className="utility-nav shell" aria-label="Audience and utility">
          <ul>
            {utilityLinks.map(([label, href]) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="main-header">
          <nav className="main-nav shell" aria-label="Primary">
            <a className="wordmark" href="/" aria-label="Garden Gate home">
              <span>Garden Gate</span>
              <small>Child Development Center</small>
            </a>
            <ul>
              {mainLinks.map(([label, href]) =>
                label === 'About' ? (
                  <li className="about-menu" key={href}>
                    <div className="about-control">
                      <a href={href}>About</a>
                      <button
                        ref={aboutButtonRef}
                        className="submenu-button"
                        type="button"
                        aria-label="Show About submenu"
                        aria-expanded={aboutOpen}
                        aria-controls="desktop-about-submenu"
                        onClick={() => setAboutOpen((value) => !value)}
                      >
                        <span aria-hidden="true">⌄</span>
                      </button>
                    </div>
                    {aboutOpen && (
                      <ul className="submenu" id="desktop-about-submenu">
                        <li>
                          <a href="/about/people" onClick={() => setAboutOpen(false)}>
                            People
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ),
              )}
            </ul>
            <a className="header-donate" href={donationUrl}>
              Donate
            </a>
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
        <div className="mobile-bar">
          <a className="mobile-wordmark" href="/" aria-label="Garden Gate home">
            Garden Gate
          </a>
          <div className="mobile-actions">
            <a className="mobile-donate" href={donationUrl}>
              Donate
            </a>
            <button
              ref={menuButtonRef}
              className="menu-button"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span className="menu-button__label">{menuOpen ? 'Close' : 'Menu'}</span>
              <span className="menu-icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu" ref={menuPanelRef}>
            <nav aria-label="Mobile primary">
              <p className="menu-group-label">Explore</p>
              <ul className="mobile-main-list">
                {mainLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} onClick={handleRouteChange}>
                      {label}
                    </a>
                    {label === 'About' && (
                      <ul className="mobile-child-list">
                        <li>
                          <a href="/about/people" onClick={handleRouteChange}>
                            People
                          </a>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
                <li>
                  <a className="menu-donate" href={donationUrl} onClick={handleRouteChange}>
                    Donate
                  </a>
                </li>
                <li>
                  <span
                    className="menu-language"
                    role="status"
                    aria-describedby="portuguese-status"
                    tabIndex="0"
                  >
                    Em Português <small>Unavailable</small>
                  </span>
                  <span className="sr-only" id="portuguese-status">
                    Portuguese content is not currently available.
                  </span>
                </li>
              </ul>

              <p className="menu-group-label menu-group-label--utility">For our community</p>
              <ul className="mobile-utility-list">
                {utilityLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} onClick={handleRouteChange}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function ThreadCaption({ phase, children, className = '' }) {
  return (
    <div className={`thread-caption ${className}`}>
      <span className="thread-caption__phase">{phase}</span>
      <p>{children}</p>
    </div>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="identity-line">A nonprofit early-learning community in Oak Bluffs</p>
            <h1 id="hero-title">Children are capable thinkers.</h1>
            <p className="hero-thesis">
              Their questions deserve time, materials, relationships, and adults who listen.
              Garden Gate’s Reggio-inspired approach gives ideas room to grow.
            </p>
            <div className="action-row">
              <ActionLink href="/programs" variant="solid">
                Explore Programs
              </ActionLink>
              <ActionLink href="/approach">See Our Approach</ActionLink>
            </div>
          </div>

          <figure className="hero-figure">
            <img
              src="/images/collaboration-tiles.jpg"
              alt="An educator sits with four young children as they build with translucent colored tiles at an outdoor table."
              fetchPriority="high"
            />
            <figcaption>
              <ThreadCaption phase="Questions">
                Materials make children’s ideas visible—and give a group something to build together.
              </ThreadCaption>
            </figcaption>
          </figure>
        </section>

        <section className="mission-section shell" aria-labelledby="mission-title">
          <div className="mission-index" aria-hidden="true">
            Our view of the child
          </div>
          <div className="mission-copy">
            <h2 id="mission-title">Learning begins with being seen, heard, and taken seriously.</h2>
            <p>
              Garden Gate supports each child’s development and self-worth through creative work,
              play, relationships, fairness, and participation in community. The arts are ways to
              investigate, communicate, and solve problems—not decoration added after learning.
            </p>
          </div>
          <figure className="mission-figure">
            <img
              src="/images/observation-drawing.jpg"
              alt="Children draw in sketchbooks while seated among displayed artwork."
              loading="lazy"
            />
            <figcaption>
              <ThreadCaption phase="Observation">
                Looking closely, drawing, and revisiting give children time to represent what they notice.
              </ThreadCaption>
            </figcaption>
          </figure>
        </section>

        <section className="programs-section" aria-labelledby="programs-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-kicker">Programs at a glance</p>
                <h2 id="programs-title">Four ways into one connected approach</h2>
              </div>
              <p>
                Each program is shaped by relationships, play, inquiry, creative materials, and
                time outdoors. Detailed operating information belongs on Programs.
              </p>
            </div>

            <div className="program-ledger">
              {programs.map((program) => (
                <article className="program-row" key={program.name}>
                  <h3>{program.name}</h3>
                  <p className="program-audience">{program.audience}</p>
                  <p>{program.copy}</p>
                </article>
              ))}
            </div>

            <ActionLink href="/programs">Explore Programs</ActionLink>
          </div>
        </section>

        <section className="approach-section shell" aria-labelledby="approach-title">
          <header className="approach-intro">
            <p className="section-kicker">The approach in action</p>
            <h2 id="approach-title">An idea moves through hands, words, places, and time.</h2>
            <p>
              Teachers listen and observe, prepare possibilities, document what happens, and
              reflect on where a question might go next. Projects can deepen through repeated
              encounters rather than ending with one activity.
            </p>
          </header>

          <div className="inquiry-thread" aria-label="The Inquiry Thread">
            <article className="thread-step thread-step--paint">
              <ThreadCaption phase="Materials">
                Paint, clay, wood, wire, natural objects, and found materials offer different ways
                to test and communicate an idea.
              </ThreadCaption>
              <figure>
                <img
                  src="/images/painting-process.jpg"
                  alt="A child uses a fine brush and bright paint while working at a table with flowers and water jars."
                  loading="lazy"
                />
              </figure>
              <div className="thread-proposition">
                <h3>Art is a language for thinking.</h3>
                <p>
                  Studio work lets children combine observation, imagination, fine-motor practice,
                  and communication in a form they can return to.
                </p>
              </div>
            </article>

            <article className="thread-step thread-step--clay">
              <ThreadCaption phase="Projects over time">
                Open-ended tools support building, testing, changing, and trying again.
              </ThreadCaption>
              <div className="thread-proposition">
                <h3>Ideas become shareable when they take form.</h3>
                <p>
                  Construction and play invite children to negotiate, solve problems, adapt plans,
                  and bring separate points of view into a common project.
                </p>
              </div>
              <figure>
                <img
                  src="/images/clay-construction.jpg"
                  alt="Children’s hands fit wood wheels and metal pieces to a small clay construction."
                  loading="lazy"
                />
              </figure>
            </article>

            <article className="thread-step thread-step--relationship">
              <ThreadCaption phase="Relationships">
                Learning is co-constructed with peers, teachers, families, materials, and place.
              </ThreadCaption>
              <div className="relationship-statement">
                <p className="display-quote">
                  Collaboration asks children to listen, negotiate, persist, and make room for one another.
                </p>
                <p>
                  Play and relationships support communication, empathy, fairness, resilience, and
                  problem-solving. Teachers stay close enough to notice without taking the work away.
                </p>
              </div>
            </article>

            <article className="thread-step thread-step--place">
              <ThreadCaption phase="Outdoor inquiry">
                Familiar places change with weather, season, movement, and each new question.
              </ThreadCaption>
              <figure>
                <img
                  src="/images/featherstone-deck.jpg"
                  alt="Two children look at books and draw on a colorful mat on an outdoor deck overlooking open green space."
                  loading="lazy"
                />
              </figure>
              <div className="thread-proposition">
                <h3>The environment extends the studio.</h3>
                <p>
                  Garden Gate is located on the Featherstone Center for the Arts campus. The
                  playground, open spaces, and nearby trails support movement, observation,
                  imagination, and connection to place.
                </p>
              </div>
            </article>
          </div>

          <ActionLink href="/approach">See Our Approach</ActionLink>
        </section>

        <section className="belonging-section" aria-labelledby="belonging-title">
          <div className="shell belonging-grid">
            <div>
              <p className="section-kicker">Belonging and family partnership</p>
              <h2 id="belonging-title">Belonging is practiced in the everyday.</h2>
            </div>
            <div className="belonging-copy">
              <p>
                Garden Gate describes inclusive participation, anti-bias work, family voice, daily
                communication, inclusive materials, and connections to outside resources as parts
                of its community practice.
              </p>
              <p>
                Families are participants in children’s learning. The center also states an
                Equitable Tuition Model and scholarship or subsidy support; current mechanics and
                availability still require confirmation before launch.
              </p>
            </div>
            <ThreadCaption phase="Collaboration" className="belonging-thread">
              Children’s learning is strengthened when home and school remain in conversation.
            </ThreadCaption>
          </div>
        </section>

        <section className="place-trust-section shell" aria-labelledby="place-title">
          <div className="place-heading">
            <p className="section-kicker">Place and trust</p>
            <h2 id="place-title">Rooted in an arts campus. Accountable to the record.</h2>
          </div>
          <dl className="trust-ledger">
            <div>
              <dt>1999</dt>
              <dd>Garden Gate opened in 1999.</dd>
            </div>
            <div>
              <dt>Oak Bluffs</dt>
              <dd>Located at 30 Featherstone Lane on the Featherstone Center for the Arts campus.</dd>
            </div>
            <div>
              <dt>Current practice</dt>
              <dd>Dated 2025–26 first-party newsletters document projects, materials, family communication, exhibitions, anti-bias work, and outdoor inquiry.</dd>
            </div>
            <div>
              <dt>Nonprofit</dt>
              <dd>Garden Gate Child Development Center Inc. is a nonprofit early-education organization.</dd>
            </div>
          </dl>
          <div className="trust-actions">
            <ActionLink href="/about">About Garden Gate</ActionLink>
            <ActionLink href="/about/people">Meet Our People</ActionLink>
          </div>
        </section>

        <section className="news-section" aria-labelledby="news-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="section-kicker">News & Resources</p>
                <h2 id="news-title">The work, with a date attached</h2>
              </div>
              <p>
                These clearly dated first-party records show examples from a specific moment. They
                are evidence of practice, not a promise that every day or future session is identical.
              </p>
            </div>

            <div className="news-list">
              <article>
                <time dateTime="2026-05-29">May 29, 2026</time>
                <h3>A Beautiful Place to Spend Childhood</h3>
                <p>A Garden Gate Approach newsletter about outdoor curriculum and learning spaces.</p>
                <a href="/news">View in News & Resources <Arrow /></a>
              </article>
              <article>
                <time dateTime="2026-07-08">July 8, 2026</time>
                <h3>Belonging to This Place</h3>
                <p>A summer newsletter about noticing, relationship, and questions of who lives here.</p>
                <a href="/news">View in News & Resources <Arrow /></a>
              </article>
            </div>

            <ActionLink href="/news">View News & Resources</ActionLink>
          </div>
        </section>

        <section className="enrollment-section shell" aria-labelledby="enrollment-title">
          <ThreadCaption phase="Reflection">
            After program, approach, belonging, place, and evidence come the family’s next questions.
          </ThreadCaption>
          <div>
            <p className="section-kicker">Enrollment</p>
            <h2 id="enrollment-title">Could Garden Gate be a fit for your child and family?</h2>
            <p>
              The Enrollment page owns the current process and application context. This prototype
              does not promise openings, timing, acceptance, or form behavior.
            </p>
            <ActionLink href="/enrollment" variant="solid">
              Begin Enrollment
            </ActionLink>
          </div>
        </section>

        <section className="support-section" aria-labelledby="support-title">
          <div className="shell support-grid">
            <div>
              <p className="section-kicker">Support Garden Gate</p>
              <h2 id="support-title">Help sustain the places and practices where ideas grow.</h2>
            </div>
            <div>
              <p>
                Contributed support can strengthen learning environments, arts and materials,
                educator development, access and belonging work, and connection to community.
              </p>
              <div className="action-row">
                <ActionLink href={donationUrl} variant="donate">
                  Donate
                </ActionLink>
                <ActionLink href="/support">Why Support Matters</ActionLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div className="footer-identity">
            <a className="footer-wordmark" href="/">
              Garden Gate
              <span>Child Development Center</span>
            </a>
            <p>A nonprofit early-learning community in Oak Bluffs, Massachusetts.</p>
          </div>

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

          <address className="footer-contact">
            <h2>Contact</h2>
            <p>30 Featherstone Lane<br />Oak Bluffs, MA 02557</p>
            <p>Mail: PO Box 2666<br />Vineyard Haven, MA 02568</p>
            <p><a href="tel:+17745632435">(774) 563-2435</a></p>
            <p><a href="mailto:gardengatecdc@hotmail.com">gardengatecdc@hotmail.com</a></p>
            <p className="social-links">
              <a href="https://www.facebook.com/GardenGateCDC/">Facebook</a>
              <a href="https://www.instagram.com/gardengatecdc/">Instagram</a>
            </p>
          </address>
        </div>
        <div className="shell footer-note">
          <p>Unapproved Stage 7 comparison test. Not a production website.</p>
        </div>
      </footer>
    </>
  )
}

export default App
