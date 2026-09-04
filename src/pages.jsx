import React from 'react'
import {
  archiveRecords,
  contactFacts,
  donationUrl,
  peopleGroups,
  practices,
  pressRecords,
  programs,
  schoolYearNewsletters,
  summerNewsletters,
} from './siteData.js'
import {
  ButtonLink,
  EnrollmentBridge,
  OwnerNotice,
  PageHero,
  SectionIntro,
  SupportBridge,
  TextLink,
} from './components.jsx'

export const pageMeta = {
  '/': ['Garden Gate Child Development Center', 'A Reggio-inspired nonprofit early-learning community in Oak Bluffs, Massachusetts.'],
  '/programs': ['Programs | Garden Gate', 'Source-grounded information about Studio One, Studio Two, Kindergarten, and Summer at Garden Gate.'],
  '/approach': ['Our Approach | Garden Gate', 'How observation, projects, materials, play, relationships, documentation, and outdoor inquiry connect at Garden Gate.'],
  '/about': ['About | Garden Gate', 'Garden Gate’s mission, history, Featherstone setting, and nonprofit context.'],
  '/about/people': ['People | Garden Gate', 'The captured Garden Gate staff and board roster, with a prominent launch-current verification notice.'],
  '/news': ['News & Resources | Garden Gate', 'Dated Garden Gate newsletters, archive records, and press links.'],
  '/enrollment': ['Enrollment | Garden Gate', 'A source-grounded overview of Garden Gate’s captured enrollment process and outstanding confirmation needs.'],
  '/families': ['Current Families | Garden Gate', 'A concise current-family hub for dated records and direct contact.'],
  '/support': ['Support | Garden Gate', 'Why contributed support matters to Garden Gate’s nonprofit early-learning work.'],
  '/professional-development': ['For Educators | Garden Gate', 'Historical context and current-status boundaries for Garden Gate professional development.'],
  '/employment': ['Employment | Garden Gate', 'Employment context and a direct contact path without unsupported vacancy claims.'],
  '/contact': ['Contact | Garden Gate', 'Verified direct contact, mailing, location, and social information for Garden Gate.'],
  '/privacy': ['Privacy | Garden Gate', 'Prototype privacy placeholder identifying the policy work required before launch.'],
  '/accessibility': ['Accessibility | Garden Gate', 'Prototype accessibility placeholder identifying ownership and review required before launch.'],
}

const dateTime = (label) => {
  const parsed = new Date(label)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString().slice(0, 10)
}

function HomeProgramIndex() {
  return (
    <div className="home-program-layout">
      <div className="home-program-list">
      {programs.map((program) => (
        <article key={program.name}>
          <div><h3>{program.name}</h3><p className="program-audience">{program.audience}</p></div>
          <p>{program.copy}</p>
        </article>
      ))}
        <TextLink href="/programs">Explore Programs</TextLink>
      </div>
      <figure className="home-program-photo">
        <img src="/images/studio-relationship.jpg" alt="Children gather around a shared table with open-ended materials." loading="lazy" />
        <figcaption>Distinct program paths share an image of children as capable, social learners.</figcaption>
      </figure>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <section className="editorial-hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">A nonprofit early-learning community in Oak Bluffs</p>
          <h1 id="hero-title">Children are capable thinkers.</h1>
          <p className="hero-lede">Garden Gate’s Reggio-inspired approach gives children’s questions time, materials, relationships, and adults who listen.</p>
          <div className="hero-actions"><TextLink href="/programs">Explore Programs</TextLink><TextLink href="/approach">See Our Approach</TextLink></div>
        </div>
        <figure className="hero-composition">
          <div className="hero-main-image"><img src="/images/collaboration-tiles.jpg" alt="An educator sits with four children as they build with translucent colored tiles outdoors." fetchPriority="high" /></div>
          <div className="hero-detail hero-detail--table" aria-hidden="true"><img src="/images/material-table.jpg" alt="" /></div>
          <div className="hero-detail hero-detail--paint" aria-hidden="true"><img src="/images/painting-process.jpg" alt="" /></div>
          <figcaption>Relationships, light, and open-ended materials give a shared idea room to grow.</figcaption>
        </figure>
      </section>

      <section className="highlight-section" aria-labelledby="highlight-title"><div className="shell highlight-grid"><div className="highlight-copy"><p className="eyebrow">News & Resources · May 29, 2026</p><h2 id="highlight-title">A Beautiful Place to Spend Childhood</h2><p>This dated Garden Gate Approach newsletter looks at outdoor curriculum and learning spaces. It is one first-party record of practice, not a promise that every day is identical.</p><TextLink href={schoolYearNewsletters[2][2]} external>Open the dated PDF</TextLink></div><figure className="highlight-photo"><img src="/images/meadow-inquiry.jpg" alt="Children move through tall meadow grasses in a wide outdoor area." loading="lazy" /><figcaption>Outdoor inquiry · Movement, observation, and relationship with place.</figcaption></figure></div></section>

      <section className="home-programs shell" aria-labelledby="home-programs-title"><header className="side-intro"><p className="eyebrow">Programs at Garden Gate</p><h2 id="home-programs-title">Four paths through one connected approach</h2><p>Each program is shaped by relationships, play, inquiry, creative materials, and time outdoors.</p></header><HomeProgramIndex /></section>

      <section className="home-approach" aria-labelledby="home-approach-title"><div className="shell home-approach-grid"><div className="home-approach-statement"><p className="eyebrow">Our approach</p><h2 id="home-approach-title">Learning begins with a capable child.</h2><p>Teachers listen and observe, prepare possibilities, document what happens, and reflect on where a question might go next.</p><TextLink href="/approach">See Our Approach</TextLink></div><figure className="home-approach-photo"><img src="/images/observation-drawing.jpg" alt="Children draw in sketchbooks while seated near displayed artwork." loading="lazy" /><figcaption>Observation and documentation make it possible to revisit an idea.</figcaption></figure><div className="practice-ledger" aria-label="The approach in action">{practices.map((practice) => <article key={practice.name}><h3>{practice.name}</h3><p>{practice.copy}</p></article>)}</div></div></section>

      <section className="home-community shell" aria-label="Belonging, place, and trust">
        <article className="community-story community-story--belonging"><figure><img src="/images/belonging-hands.jpg" alt="Two children hold hands while walking outdoors." loading="lazy" /></figure><div><p className="eyebrow">Belonging and family partnership</p><h2>Belonging is practiced in the everyday.</h2><p>Garden Gate describes inclusive participation, anti-bias work, family voice, daily communication, inclusive materials, and connections to outside resources as parts of community practice.</p><p>Families are participants in children’s learning. Current Equitable Tuition mechanics, scholarship support, and availability require confirmation before launch.</p><TextLink href="/about">About Garden Gate</TextLink></div></article>
        <article className="community-story community-story--place"><div><p className="eyebrow">Featherstone, history, and trust</p><h2>Rooted in an arts-campus setting.</h2><p>Garden Gate opened in 1999 and is located on the Featherstone campus at 30 Featherstone Lane in Oak Bluffs. Garden Gate Child Development Center Inc. is a nonprofit early-education organization.</p><ul className="trust-list" aria-label="Evidence-backed trust facts"><li><strong>1999</strong><span>Garden Gate opened.</span></li><li><strong>Oak Bluffs</strong><span>30 Featherstone Lane.</span></li><li><strong>2025–26</strong><span>Dated first-party newsletters record examples of practice.</span></li></ul><div className="inline-actions"><TextLink href="/about">About Garden Gate</TextLink><TextLink href="/about/people">Meet Our People</TextLink></div></div><figure><img src="/images/featherstone-campus.jpg" alt="Garden Gate’s low gray building behind a white fence painted with colorful marks." loading="lazy" /></figure></article>
      </section>

      <section className="home-news" aria-labelledby="home-news-title"><div className="shell home-news-grid"><header><p className="eyebrow">News & Resources</p><h2 id="home-news-title">The work, with a date attached</h2><p>Dated first-party records show examples from a specific moment.</p><TextLink href="/news">View News & Resources</TextLink></header><div className="home-news-list"><article><time dateTime="2026-05-29">May 29, 2026</time><h3>A Beautiful Place to Spend Childhood</h3><p>A Garden Gate Approach newsletter about outdoor curriculum and learning spaces.</p><TextLink href={schoolYearNewsletters[2][2]} external>Open PDF</TextLink></article><article><time dateTime="2024-09-24">September 24, 2024</time><h3>Building Community through Play</h3><p>A dated record about establishing belonging in a classroom community.</p><TextLink href="/news/building-community-through-play-establishing-belonging">View record</TextLink></article></div></div></section>
      <EnrollmentBridge />
      <SupportBridge />
    </>
  )
}

export function ProgramsPage() {
  return (
    <>
      <PageHero compact className="programs-opening" eyebrow="Programs" title="Four paths. One connected view of children." intro="Garden Gate’s program paths share a Reggio-inspired commitment to relationships, play, inquiry, creative materials, and time outdoors." />
      <OwnerNotice>Current dates, hours, tuition, capacity, openings, ratios, age eligibility, and application timing must be confirmed by Garden Gate before launch. Details below are labeled as source-era context.</OwnerNotice>
      <section className="program-index shell" aria-labelledby="program-index-title">
        <header className="program-index__intro"><p className="eyebrow">Program index</p><h2 id="program-index-title">Distinct paths within a shared learning community</h2><p>The distinctions established in the source remain visible without turning historical operating details into current promises.</p></header>
        <div className="program-index__list">
          {programs.map((program) => (
            <article className="program-entry" key={program.name}>
              <figure><img src={program.image} alt={program.alt} loading="lazy" /></figure>
              <div className="program-entry__copy"><p className="program-audience">{program.audience}</p><h2>{program.name}</h2><p>{program.copy}</p><p className="program-evidence">{program.evidence}</p><TextLink href="/enrollment">Enrollment context</TextLink></div>
            </article>
          ))}
        </div>
      </section>
      <section className="blue-field"><div className="shell split-statement"><div><p className="eyebrow">Across programs</p><h2>Different ages. A connected image of the child.</h2></div><div><p>Children learn through relationships, open-ended play, long-form projects, materials, art, stories, construction, outdoor experiences, and reflection.</p><div className="inline-actions"><TextLink href="/approach">See Our Approach</TextLink><ButtonLink href="/enrollment">Begin Enrollment</ButtonLink></div></div></div></section>
    </>
  )
}

export function ApproachPage() {
  const sequenceLabels = ['Listening', 'Revisiting', 'Expressing', 'Relating']
  return (
    <>
      <PageHero compact className="approach-opening" eyebrow="Our Approach" title="Children’s ideas become the work." intro="Garden Gate is Reggio-inspired. Teachers observe, prepare possibilities, document learning, and reflect with children and colleagues—without implying certification or formal affiliation." />
      <section className="approach-belief"><div className="shell"><p className="eyebrow">View of the child</p><h2>Capable, curious, social, and full of theories.</h2><p>Children communicate through words, movement, drawing, construction, paint, clay, play, and many other ways of making meaning.</p></div></section>
      <section className="approach-sequence shell" aria-labelledby="approach-sequence-title">
        <header><p className="eyebrow">Practice</p><h2 id="approach-sequence-title">Ideas develop through attention, time, and relationship.</h2><p>No single activity defines the approach. These connected practices show how learning can be noticed, revisited, expressed, and shared.</p></header>
        <div className="approach-sequence__rows">
          {practices.map((practice, index) => (
            <article className="approach-step" key={practice.name}>
              <figure><img src={practice.image} alt={practice.alt} loading="lazy" /><figcaption>{sequenceLabels[index]}</figcaption></figure>
              <div><p className="sequence-label">{sequenceLabels[index]}</p><h2>{practice.name}</h2><p>{practice.copy}</p>{index === 0 && <p>Documentation helps teachers and children return to an idea, share it, and consider what might happen next.</p>}{index === 1 && <p>Projects can emerge from children’s questions and deepen through repeated encounters rather than follow a fixed outcome.</p>}</div>
            </article>
          ))}
        </div>
      </section>
      <section className="relationship-field"><div className="shell relationship-grid"><figure><img src="/images/belonging-hands.jpg" alt="Two children hold hands while walking outdoors." loading="lazy" /></figure><div><p className="eyebrow">Belonging and partnership</p><h2>Learning is relational.</h2><p>Garden Gate’s source record connects participation, family voice, anti-bias work, inclusive materials, community resources, and daily communication to the work of belonging.</p><TextLink href="/about">About the community</TextLink></div></div></section>
      <EnrollmentBridge />
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <section className="about-opening shell" aria-labelledby="about-title"><div><p className="eyebrow">About Garden Gate</p><h1 id="about-title">A learning community rooted on Martha’s Vineyard.</h1><p>Garden Gate Child Development Center Inc. is a nonprofit early-education organization in Oak Bluffs, with a source record reaching back to 1999.</p></div><figure><img src="/images/featherstone-campus.jpg" alt="Garden Gate’s building behind a painted white fence at Featherstone." fetchPriority="high" /><figcaption>Garden Gate is located on the Featherstone campus at 30 Featherstone Lane.</figcaption></figure></section>
      <section className="about-mission"><div className="shell"><p className="eyebrow">Mission and identity</p><h2>Children, families, educators, materials, and place shape learning together.</h2><p>Garden Gate’s public record describes a Reggio-inspired program committed to children’s capabilities, strong relationships, creative expression, inquiry, inclusion, and partnership with families.</p></div></section>
      <section className="history-section"><div className="shell timeline-layout"><SectionIntro eyebrow="History and place" title="A dated record, held with care" /><ol className="real-timeline"><li><time>1999</time><div><h3>Garden Gate opened</h3><p>The source establishes the organization’s beginning in 1999.</p></div></li><li><time>2020</time><div><h3>Featherstone relationship deepened</h3><p>Historical records describe temporary Featherstone classroom use during Covid reopening.</p></div></li><li><time>2022</time><div><h3>Move to Featherstone</h3><p>The captured record describes the move to the Featherstone Center for the Arts campus.</p></div></li><li><time>Today</time><div><h3>Current details need review</h3><p>Legal, governance, program, staffing, and operating details require organization confirmation before publication.</p></div></li></ol></div></section>
      <section className="about-place shell"><figure><img src="/images/meadow-inquiry.jpg" alt="Children walk through meadow grasses at the Featherstone setting." loading="lazy" /></figure><div><p className="eyebrow">Featherstone setting</p><h2>Place is part of the learning environment.</h2><p>Located on the Featherstone campus at 30 Featherstone Lane, Garden Gate’s captured record connects studios, outdoor spaces, seasonal change, walks, art, movement, and observation.</p><address><strong>Garden Gate Child Development Center</strong><br />30 Featherstone Lane<br />Oak Bluffs, MA 02557</address><TextLink href="/contact">Contact Garden Gate</TextLink></div></section>
      <section className="about-people"><div className="shell compact-callout"><div><p className="eyebrow">People and governance</p><h2>Meet the captured team and board.</h2><p>The roster remains clearly bounded because names and roles can change.</p></div><TextLink href="/about/people">Meet Our People</TextLink></div></section>
      <SupportBridge />
    </>
  )
}

export function PeoplePage() {
  const yearRoundGroups = peopleGroups.slice(0, 3)
  const additionalGroups = peopleGroups.slice(3)

  return (
    <div className="people-page">
      <PageHero compact eyebrow="About · People" title="Educators and stewards of the community." intro="Meet the people named in Garden Gate’s captured public roster, grouped so families can understand the team at a glance." />
      <OwnerNotice>Names, roles, and portraits reflect the captured source and must be reconfirmed before publication. The source provides matched portraits for the year-round team only.</OwnerNotice>

      <section className="people-directory" aria-labelledby="year-round-team-title">
        <div className="shell">
          <header className="people-directory__intro">
            <div><p className="eyebrow">Year-round team</p><h2 id="year-round-team-title">The people alongside children each day.</h2></div>
            <p>Leadership, administration, and classroom educators share responsibility for relationships, environments, observation, and the daily life of the school.</p>
          </header>
          <div className="people-cohorts">
            {yearRoundGroups.map((group) => (
              <section className="people-cohort" key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.people.map(([name, role, portrait]) => <li className="person-profile" key={name}><figure><img src={portrait} alt={`Portrait of ${name}.`} loading="lazy" /><figcaption><h4>{name}</h4><p>{role}</p></figcaption></figure></li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="people-additional" aria-labelledby="additional-roster-title">
        <div className="shell people-additional__layout">
          <header><p className="eyebrow">Additional captured roles</p><h2 id="additional-roster-title">Summer and governance</h2><p>These names remain visible as part of the source-grounded roster. Individual source-matched portraits were not available for these entries.</p></header>
          <div className="people-additional__groups">
            {additionalGroups.map((group) => (
              <section className="people-text-group" key={group.title}>
                <h3>{group.title}</h3>
                <ul>{group.people.map(([name, role]) => <li key={`${group.title}-${name}`}><strong>{name}</strong><span>{role}</span></li>)}</ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="people-employment"><div className="shell compact-callout"><div><p className="eyebrow">Interested in the work?</p><h2>Employment information is kept separate from the roster.</h2></div><TextLink href="/employment">View Employment</TextLink></div></section>
    </div>
  )
}

function PdfList({ title, records }) {
  return <section className="resource-group"><h2>{title}</h2><ul className="resource-list">{records.map(([date, name, url]) => <li key={`${date}-${url}`}><time dateTime={dateTime(date)}>{date}</time><a href={url} target="_blank" rel="noreferrer"><span>{name}</span><span aria-hidden="true">↗</span></a><small>PDF on gardengatemv.org</small></li>)}</ul></section>
}

export function NewsPage() {
  const [featureDate, featureTitle, featureUrl] = schoolYearNewsletters[0]
  return (
    <>
      <section className="news-opening shell" aria-labelledby="news-title"><header><p className="eyebrow">News & Resources</p><h1 id="news-title">The work, with a date attached.</h1><p>First-party newsletters and historical records show examples from specific moments. Dates distinguish evidence from ongoing promises.</p></header><article className="news-feature"><figure><img src="/images/material-table.jpg" alt="Paint, brushes, flowers, and water jars on a Garden Gate work table." fetchPriority="high" /></figure><div><p className="eyebrow">Newest first-party record · {featureDate}</p><h2>{featureTitle}</h2><p>This PDF remains on Garden Gate’s existing domain and is linked without altering the original record.</p><TextLink href={featureUrl} external>Open the dated PDF</TextLink></div></article></section>
      <section className="newsletters-section"><div className="shell news-content"><SectionIntro eyebrow="First-party records" title="Dated newsletters"><p>The PDFs remain on Garden Gate’s existing domain. They are linked, not copied or altered, because PDF rights and accessibility require separate review.</p></SectionIntro><div className="newsletter-groups"><PdfList title="2025–2026 school year" records={schoolYearNewsletters} /><PdfList title="Summer 2026" records={summerNewsletters} /></div></div></section>
      <section className="archive-section"><div className="shell"><SectionIntro eyebrow="Archive" title="Historical articles, reports, stories, and announcements"><p>Archive summaries preserve dated context and remove obsolete calls to action.</p></SectionIntro><ol className="archive-list">{archiveRecords.map((record) => <li key={record.slug}><article><p className="archive-date">{record.date}</p><div><p className="card-meta">{record.type}</p><h3>{record.title}</h3><p>{record.summary}</p></div><TextLink href={`/news/${record.slug}`}>View record</TextLink></article></li>)}</ol></div></section>
      <section className="press-section shell"><SectionIntro eyebrow="In the press" title="External historical coverage"><p>These links lead to third-party publications and are not Garden Gate endorsements of current facts.</p></SectionIntro><ul className="press-list">{pressRecords.map(([date, title, url]) => <li key={url}><time dateTime={dateTime(date)}>{date}</time><a href={url} target="_blank" rel="noreferrer">{title}<span aria-hidden="true">↗</span></a></li>)}</ul></section>
    </>
  )
}

export function NewsRecordPage({ record }) {
  return (
    <article className="record-page shell">
      <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/news">News & Resources</a><span aria-hidden="true">/</span><span aria-current="page">Archive record</span></nav>
      <header><p className="eyebrow">{record.type} · {record.date}</p><h1>{record.title}</h1><p className="record-summary">{record.summary}</p></header>
      <div className="record-layout"><div className="record-body"><h2>About this record</h2><p>This page consolidates the dated meaning preserved in the Garden Gate source record. It does not republish a full legacy article where ownership, attachments, current calls to action, or later accuracy require review.</p><dl><div><dt>Captured author</dt><dd>{record.author}</dd></div><div><dt>Topic</dt><dd>{record.topic}</dd></div></dl></div><aside><h2>Continue exploring</h2><TextLink href={record.related}>Related Garden Gate page</TextLink><TextLink href="/news">All News & Resources</TextLink></aside></div>
    </article>
  )
}

export function EnrollmentPage() {
  return (
    <>
      <section className="enrollment-opening shell" aria-labelledby="enrollment-title"><div><p className="eyebrow">Enrollment</p><h1 id="enrollment-title">Begin with a conversation about fit.</h1><p>The source describes enrollment as a relationship-building process. This prototype keeps the next step direct while avoiding claims about openings, timing, or acceptance.</p></div><figure><img src="/images/belonging-hands.jpg" alt="Two children hold hands while walking outdoors." fetchPriority="high" /><figcaption>Families begin by learning about the program and contacting Garden Gate directly.</figcaption></figure></section>
      <OwnerNotice>Garden Gate must confirm the current application process, age eligibility, schedule, tuition, Equitable Tuition mechanics, deposit or fee terms, waitlist handling, available openings, and response timing before launch.</OwnerNotice>
      <section className="enrollment-process shell"><SectionIntro eyebrow="Captured process" title="A simple sequence"><p>This is the source-grounded shape of the process, not a guarantee of current availability.</p></SectionIntro><ol className="process-list"><li><div><h2>Learn about Garden Gate</h2><p>Review the programs, Reggio-inspired approach, setting, and community commitments.</p></div><TextLink href="/programs">Explore Programs</TextLink></li><li><div><h2>Contact the school</h2><p>Ask about fit and request the current enrollment process directly from Garden Gate.</p></div><TextLink href="/contact">Contact Garden Gate</TextLink></li><li><div><h2>Begin enrollment</h2><p>The captured source points to an application step, but the active form, terms, and workflow require owner approval before publication.</p></div><a className="button-link button-link--disabled" aria-disabled="true">Application pending confirmation</a></li></ol></section>
      <section className="enrollment-contact"><div className="shell compact-callout"><div><p className="eyebrow">Ready to ask?</p><h2>Use the verified direct contact information.</h2><p><a href={contactFacts.phone}>{contactFacts.phoneLabel}</a> · <a href={contactFacts.email}>{contactFacts.emailLabel}</a></p></div><TextLink href="/contact">Contact details</TextLink></div></section>
    </>
  )
}

export function FamiliesPage() {
  return (
    <>
      <section className="utility-opening shell" aria-labelledby="families-title"><div><p className="eyebrow">Current Families</p><h1 id="families-title">Dated updates and direct contact.</h1><p>This concise hub points families to verified contact information and the full dated newsletter collection without inventing a private portal or undocumented services.</p></div><figure><img src="/images/featherstone-deck.jpg" alt="Children read and draw together on an outdoor deck." fetchPriority="high" /></figure></section>
      <section className="family-hub shell"><article><p className="eyebrow">News & Resources</p><h2>Read the dated record</h2><p>School-year and summer newsletters remain organized by date and link to the original PDFs.</p><TextLink href="/news">View News & Resources</TextLink></article><article><p className="eyebrow">Questions for Garden Gate</p><h2>Contact the school directly</h2><p>Use the verified phone, email, mailing address, or location.</p><TextLink href="/contact">Contact Garden Gate</TextLink></article></section>
      <OwnerNotice>Any future handbook, calendar, classroom updates, emergency information, family login, payment service, or private-document access needs owner-supplied content and a separate privacy and security plan.</OwnerNotice>
    </>
  )
}

export function SupportPage() {
  const supportUses = [
    ['Learning environments', 'Studios, outdoor spaces, and materials that invite children to investigate and make ideas visible.'],
    ['Educator development', 'Time and resources for teachers to observe, document, reflect, and learn together.'],
    ['Access and belonging', 'Support for an inclusive community and for mechanisms Garden Gate confirms as current.'],
    ['Community connection', 'Relationships among children, families, educators, place, and the wider island community.'],
  ]
  return (
    <>
      <section className="support-opening shell" aria-labelledby="support-title"><div><p className="eyebrow">Support</p><h1 id="support-title">Support a nonprofit learning community.</h1><p>Contributed support can help sustain environments, materials, educator learning, access, belonging, and community connection around Garden Gate’s mission.</p><div className="inline-actions"><ButtonLink href={donationUrl}>Donate</ButtonLink><TextLink href="/contact">Contact Garden Gate</TextLink></div></div><figure><img src="/images/clay-construction.jpg" alt="Children’s hands fit wheels and metal pieces to a clay construction." fetchPriority="high" /><figcaption>Materials become tools for testing, revising, and sharing an idea.</figcaption></figure></section>
      <section className="support-story"><div className="shell support-story__grid"><header><p className="eyebrow">Why support matters</p><h2>Resources can strengthen the conditions for learning.</h2><p>The prototype does not promise a particular restricted use, tax treatment, result, or scholarship mechanism without organization confirmation.</p></header><div className="support-reasons">{supportUses.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="support-history shell"><figure><img src="/images/painting-process.jpg" alt="A child paints at a table with flowers and water jars." loading="lazy" /></figure><div><p className="eyebrow">Historical story</p><h2>The Baby Cow story and scholarship-fund record</h2><p>The archive preserves a dated story about children observing a calf, collaborating on a painting, and later scholarship-fund history. Former merchandise and permanent-location wording are not presented as current offers.</p><TextLink href="/news/baby-cow-scholarship-fund">Read the historical record</TextLink></div></section>
    </>
  )
}

export function ProfessionalDevelopmentPage() {
  return (
    <>
      <section className="educator-opening shell" aria-labelledby="educator-title"><div><p className="eyebrow">For Educators</p><h1 id="educator-title">Learning with and from educational practice.</h1><p>Garden Gate’s historical record includes educator learning and a 2018 professional-development event. It does not establish a current program, calendar, fee, presenter roster, or affiliation.</p></div><figure><img src="/images/observation-drawing.jpg" alt="Children draw in sketchbooks near displayed artwork." fetchPriority="high" /><figcaption>Observation and documentation support reflection with children and colleagues.</figcaption></figure></section>
      <OwnerNotice>Current professional-development availability, audience, format, presenters, partners, dates, capacity, pricing, registration, cancellation terms, and accessibility must be supplied and approved before any offer is published.</OwnerNotice>
      <section className="educator-context shell"><div><p className="eyebrow">Educational context</p><h2>Observation, documentation, reflection, and collaboration are part of the record.</h2><p>The source shows professional learning as related to teachers’ ongoing study of children and curriculum. This page keeps that purpose visible without turning a historical record into a live service.</p></div><aside><p className="archive-date">November 13, 2018</p><h3>Historical professional-development record</h3><p>A dated event connected to The Wonder of Learning exhibition. It is evidence of past activity, not a current offering.</p><TextLink href="/news/professional-development-2018">View the 2018 record</TextLink><TextLink href="/contact">Ask Garden Gate</TextLink></aside></section>
    </>
  )
}

export function EmploymentPage() {
  return (
    <>
      <section className="employment-opening shell" aria-labelledby="employment-title"><div><p className="eyebrow">Employment</p><h1 id="employment-title">Work in a reflective learning community.</h1><p>Garden Gate’s source record centers collaborative educators who observe, document, prepare environments, and build relationships with children, families, and colleagues.</p></div><figure><img src="/images/collaboration-tiles.jpg" alt="An educator and children build together with translucent tiles outdoors." fetchPriority="high" /></figure></section>
      <OwnerNotice>No current vacancy, salary, schedule, benefit, qualification, deadline, hiring timeline, equal-opportunity statement, or application channel was established in the approved source. Garden Gate must supply those details before launch.</OwnerNotice>
      <section className="employment-contact"><div className="shell compact-callout"><div><p className="eyebrow">Employment inquiries</p><h2>Contact Garden Gate for current information.</h2><p>This prototype does not accept applications or collect candidate data.</p><p><a href={contactFacts.email}>{contactFacts.emailLabel}</a> · <a href={contactFacts.phone}>{contactFacts.phoneLabel}</a></p></div><ButtonLink href="/contact">Contact Garden Gate</ButtonLink></div></section>
    </>
  )
}

export function ContactPage() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactFacts.physical)}`
  return (
    <>
      <section className="contact-opening shell" aria-labelledby="contact-title"><header><p className="eyebrow">Contact</p><h1 id="contact-title">Connect directly with Garden Gate.</h1><p>Use the verified phone, email, mailing address, physical location, or social links below. This prototype does not collect form submissions.</p></header><figure><img src="/images/featherstone-campus.jpg" alt="Garden Gate’s building behind a painted white fence at Featherstone." fetchPriority="high" /></figure></section>
      <section className="contact-directory shell"><article><p className="eyebrow">Call or email</p><h2>Direct contact</h2><p><a href={contactFacts.phone}>{contactFacts.phoneLabel}</a><br /><a href={contactFacts.email}>{contactFacts.emailLabel}</a></p></article><article><p className="eyebrow">Visit</p><h2>Garden Gate Child Development Center</h2><address>{contactFacts.physical}</address><TextLink href={mapUrl} external>Open in maps</TextLink></article><article><p className="eyebrow">Mail</p><h2>Mailing address</h2><address>{contactFacts.mailing}</address></article><article><p className="eyebrow">Social</p><h2>Public channels</h2><p><a href={contactFacts.facebook} target="_blank" rel="noreferrer">Facebook ↗</a><br /><a href={contactFacts.instagram} target="_blank" rel="noreferrer">Instagram ↗</a></p></article></section>
      <OwnerNotice>Hours, response times, emergency instructions, staff recipients, contact-form ownership, records retention, and consent language are not established. Families should use Garden Gate’s confirmed direct channels.</OwnerNotice>
    </>
  )
}

export function PolicyPage({ type }) {
  const privacy = type === 'privacy'
  return (
    <div className="policy-page">
      <PageHero compact eyebrow="Policies" title={privacy ? 'Privacy' : 'Accessibility'} intro={privacy ? 'This prototype does not collect information through forms, accounts, analytics, payments, or enrollment workflows.' : 'The prototype was built with semantic structure, keyboard access, visible focus, reduced-motion support, readable type, and responsive layouts as design requirements.'} />
      <OwnerNotice>{privacy ? 'Garden Gate must designate a policy owner and approve a complete privacy policy covering hosting, logs, cookies, analytics, email, forms, enrollment, donation processing, social links, children’s information, retention, sharing, security, and rights before launch.' : 'Garden Gate must designate an accessibility contact, approve an accessibility statement and accommodation process, review PDFs and third-party services, and complete an expert and assistive-technology audit before launch.'}</OwnerNotice>
      <section className="policy-copy shell"><h2>{privacy ? 'Prototype boundary' : 'Work still required'}</h2>{privacy ? <><p>The site links to external services, including the existing donation destination, newsletter PDFs, social networks, press coverage, maps, email, and telephone. Those services have their own practices and require launch review.</p><p>No claim is made that this page is legal advice or an approved policy.</p></> : <><p>Accessibility depends on content governance, code, documents, services, devices, browsers, and ongoing maintenance. The linked PDF archive needs separate document-level review.</p><p>No conformance claim is made for this unapproved prototype.</p></>}<TextLink href="/contact">Contact Garden Gate</TextLink></section>
    </div>
  )
}

export function NotFoundPage({ deferred = false }) {
  return <section className="not-found shell"><p className="eyebrow">{deferred ? 'Not yet available' : 'Page not found'}</p><h1>{deferred ? 'Portuguese content is still deferred.' : 'This page is not part of the active site.'}</h1><p>{deferred ? 'Em Português remains visible as an intentional unavailable state. No route, translation, or service promise has been activated.' : 'The requested address does not match an active Garden Gate route.'}</p><TextLink href="/">Return home</TextLink></section>
}
