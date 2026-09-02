import fs from 'node:fs'
import path from 'node:path'

const sourceRoot = '/Users/anthonyrosenberger/Desktop/GardenGate'
const projectRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const finalizing = process.env.FINALIZE === '1'

const fields = [
  'source_id',
  'original_url_or_path',
  'source_type',
  'title_or_subject',
  'date',
  'evidence_status',
  'currentness',
  'new_route',
  'new_section_or_record',
  'treatment',
  'reason',
  'implemented',
  'verified',
]

function readTsv(relativePath) {
  const text = fs.readFileSync(path.join(sourceRoot, relativePath), 'utf8').replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/).filter(Boolean)
  const headers = lines.shift().split('\t')
  return lines.map((line, index) => {
    const values = line.split('\t')
    return Object.fromEntries(headers.map((header, column) => [header, values[column] ?? '']))
  })
}

function clean(value = '') {
  return String(value).replace(/[\t\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function slugFrom(value = '') {
  const withoutQuery = value.split('?')[0].replace(/\/$/, '')
  return withoutQuery.slice(withoutQuery.lastIndexOf('/') + 1)
}

const pageRoute = new Map([
  ['root', '/'], ['home', '/'], ['about-us', '/about'], ['our-mission', '/about'],
  ['our-story', '/about'], ['garden-gate-at-featherstone', '/about'], ['our-team', '/about/people'],
  ['our-programs', '/programs'], ['studio-classrooms', '/programs'], ['kindergarten', '/programs'],
  ['summer-at-gardengate', '/programs'], ['our-approach', '/approach'], ['ouroutdoorclassrooms', '/approach'],
  ['belonging', '/approach'], ['enrollment-application', '/enrollment'], ['newsletters2025', '/news'],
  ['newsletters-press', '/news'], ['articles-newsletters', '/news'], ['press', '/news'],
  ['donate', '/support'], ['professional-development', '/professional-development'],
  ['for-educators', '/professional-development'], ['employment-opportunities', '/employment'],
  ['questions', '/contact'], ['contact', '/contact'], ['privacy', '/privacy'],
  ['accessibility', '/accessibility'],
])

const articleRoute = new Map([
  ['blog-post-one-39wtm', '/news/professional-development-2018'],
  ['oid0tejm6tuo4hriyq50mybfkk4z4b', '/news/the-essential-elements'],
  ['babycow', '/news/baby-cow-scholarship-fund'],
])

function routeFor(value = '') {
  const normalized = value.replace(/^https?:\/\/www\.gardengatemv\.org\/?/, '').replace(/^\//, '')
  if (!normalized) return '/'
  if (normalized.startsWith('articles-newsletters/')) {
    const slug = normalized.split('/')[1]
    return articleRoute.get(slug) ?? `/news/${slug}`
  }
  const slug = slugFrom(normalized).replace(/--[a-f0-9]{8}(?=\.txt$)/, '').replace(/\.txt$/, '')
  if (articleRoute.has(slug)) return articleRoute.get(slug)
  if (normalized.includes('articles-newsletters--') && slug !== 'articles-newsletters') {
    const articleSlug = normalized.match(/articles-newsletters--(.+?)--[a-f0-9]{8}\.txt$/)?.[1]
    if (articleSlug) return articleRoute.get(articleSlug) ?? `/news/${articleSlug}`
  }
  return pageRoute.get(slug) ?? ''
}

function statusFor(evidence = '', date = '') {
  const joined = `${evidence} ${date}`.toLowerCase()
  if (joined.includes('do not publish')) return 'excluded'
  if (joined.includes('historical') || date) return 'dated-or-historical'
  if (joined.includes('verified current')) return 'captured-current; launch review still required'
  if (joined.includes('strong inference')) return 'working interpretation'
  return 'source record'
}

function row({ id, location, type, title, date = '', evidence = '', currentness = '', route = '', section = '', treatment, reason }) {
  return {
    source_id: id,
    original_url_or_path: location,
    source_type: type,
    title_or_subject: title,
    date,
    evidence_status: evidence,
    currentness: currentness || statusFor(evidence, date),
    new_route: route,
    new_section_or_record: section,
    treatment,
    reason,
    implemented: finalizing ? 'yes' : 'planned',
    verified: finalizing ? 'yes' : 'pending final route/content QA',
  }
}

function classifyFile(record, prefix, index) {
  const location = record.local_path
  const lower = location.toLowerCase()
  const evidence = record.evidence_status || ''
  const duplicate = record.duplicate_of || ''
  const route = routeFor(location)
  const title = record.short_description || record.notes || path.basename(location)

  if (duplicate) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route, treatment: 'duplicate', reason: `Duplicate of ${duplicate}; represented once through the controlling record.` })
  if (lower.includes('em-portugues') || lower.includes('translated')) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, treatment: 'deferred', reason: 'Portuguese source retained in evidence but the public language destination is intentionally inactive pending currentness, translation, accessibility, ownership, and service review.' })
  if (evidence.toLowerCase().includes('do not publish')) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, treatment: 'exclude-obsolete', reason: 'Stage 3/4 identifies this material as unsafe, unsupported, obsolete, empty, retired, or rights-limited.' })
  if (lower.includes('/assets/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(lower)) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, treatment: 'deferred', reason: 'Photograph or media record remains available to the approved image library; only final selected photographs are published and documented in IMAGE-USAGE.tsv.' })
  if (lower.includes('articles-newsletters--') && !lower.includes('articles-newsletters--57076117')) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route, section: 'Dated News or Resource record', treatment: 'archive-record', reason: 'Preserved through the repeatable date-aware News/Resource record type.' })
  if (lower.includes('newsletter') && (lower.includes('pdf') || lower.includes('pdf-text'))) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route: '/news', section: 'Dated newsletter resources', treatment: 'resource-file', reason: 'Retained as a clearly dated document resource; its contents are not converted into evergreen claims.' })
  if (route) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route, section: route === '/news' ? 'News & Resources evidence' : 'Evergreen page evidence', treatment: evidence.toLowerCase().includes('historical') ? 'publish-dated' : 'consolidated', reason: 'Source-grounded information is represented on its locked canonical route with evidence-era qualifiers.' })
  if (evidence.toLowerCase().includes('historical')) return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route: '/news', section: 'Dated evidence or internal provenance', treatment: 'archive-record', reason: 'Historical source is preserved through dated context or the evidence ledger rather than treated as current.' })
  return row({ id: `${prefix}-${index + 1}`, location, type: record.file_type, title, date: record.date_or_period, evidence, route: '', section: 'Evidence and verification', treatment: 'consolidated', reason: 'Source supports the reconciled site record, coverage ledger, verification, or a broader canonical responsibility without needing its own public page.' })
}

const output = []

readTsv('03-organize-content/FILE-COVERAGE.tsv').forEach((record, index) => output.push(classifyFile(record, 'FILE', index)))
readTsv('04-lock-sitemap/SOURCE-COVERAGE.tsv').forEach((record, index) => {
  output.push(classifyFile({
    local_path: record.local_path,
    file_type: record.file_type,
    short_description: record.structural_relevance || record.stage_role,
    evidence_status: record.limitations?.includes('Do not publish') ? 'Do not publish' : '',
    date_or_period: '',
    duplicate_of: record.duplicate_of,
    notes: record.notes,
  }, 'SOURCE', index))
})

readTsv('04-lock-sitemap/URL-TRANSITION.tsv').forEach((record, index) => {
  const action = record.proposed_action
  const location = record.current_url
  const destination = record.proposed_destination
  const isPortuguese = location.includes('em-portugues') || location.includes('Translated')
  const isArticle = destination.includes('/news/') && !destination.match(/\.pdf$/i)
  const isPdf = location.toLowerCase().includes('.pdf')
  let treatment = 'consolidated'
  if (isPortuguese) treatment = 'deferred'
  else if (action === 'redirect') treatment = 'redirect'
  else if (action === 'external destination') treatment = 'external-destination'
  else if (action === 'archive') treatment = isArticle ? 'archive-record' : 'exclude-obsolete'
  else if (action === 'needs decision') treatment = 'needs-owner'
  else if (isPdf) treatment = location.includes('2025-Enrollment') ? 'deferred' : 'resource-file'
  else if (isArticle) treatment = 'archive-record'
  else if (action === 'retain' && destination === '/') treatment = 'publish-current'
  else if (action === 'retain' || action === 'rename') treatment = 'publish-current'
  output.push(row({
    id: `URL-${index + 1}`,
    location,
    type: 'URL transition',
    title: record.source_record || slugFrom(location),
    evidence: record.current_state,
    currentness: record.current_state,
    route: treatment === 'deferred' || treatment === 'exclude-obsolete' || treatment === 'needs-owner' ? '' : destination,
    section: record.content_to_preserve,
    treatment,
    reason: record.reason || record.risk_or_open_issue || `Stage 4 route action: ${action}.`,
  }))
})

readTsv('02-collect/source-data/pdf-inventory.tsv').forEach((record, index) => {
  const isPortuguese = record.language?.toLowerCase().includes('portuguese') || record.file_name?.toLowerCase().includes('translated')
  const enrollment = record.file_name?.includes('2025-Enrollment')
  const rightsLimited = record.pdf_id === 'PDF-001' || record.notes?.toLowerCase().includes('rights')
  const treatment = isPortuguese || enrollment || rightsLimited ? 'deferred' : 'resource-file'
  output.push(row({
    id: `PDF-${index + 1}`,
    location: record.source_url || record.local_file,
    type: 'PDF',
    title: record.pdf_title || record.file_name || record.link_text,
    date: record.document_date,
    evidence: record.authority,
    currentness: record.document_date ? `Dated ${record.document_date}` : 'Date not stated; do not present as current',
    route: treatment === 'resource-file' ? '/news' : '',
    section: treatment === 'resource-file' ? 'Dated document resources' : 'Deferred document evidence',
    treatment,
    reason: isPortuguese
      ? 'Portuguese document retained but unavailable publicly until translation, currentness, accessibility, ownership, and service review.'
      : enrollment
        ? 'The visible 2025 application is preserved but not activated as a current enrollment document.'
        : rightsLimited
          ? 'Attachment is historical or rights-limited; a dated HTML record carries the supported public context.'
          : 'Retained as a clearly labeled dated document resource with file and date context.',
  }))
})

const siteTextDir = path.join(sourceRoot, '02-collect/source-data/site-text')
fs.readdirSync(siteTextDir).filter((name) => name.endsWith('.txt')).sort().forEach((name, index) => {
  const location = `02-collect/source-data/site-text/${name}`
  const route = routeFor(location)
  const lower = name.toLowerCase()
  let treatment = route?.startsWith('/news/') ? 'archive-record' : route ? 'consolidated' : 'deferred'
  if (lower.startsWith('cart--')) treatment = 'exclude-obsolete'
  if (lower.startsWith('em-portugues--')) treatment = 'deferred'
  output.push(row({
    id: `TEXT-${index + 1}`,
    location,
    type: 'Official page text inventory',
    title: name.replace(/--[a-f0-9]{8}\.txt$/, '').replaceAll('-', ' '),
    evidence: treatment === 'archive-record' ? 'Historical evidence' : 'Verified current public information',
    route: treatment === 'deferred' || treatment === 'exclude-obsolete' ? '' : route,
    section: treatment === 'archive-record' ? 'Dated News or Resource record' : 'Canonical page evidence',
    treatment,
    reason: treatment === 'archive-record'
      ? 'Migrated into the repeatable dated record system.'
      : treatment === 'exclude-obsolete'
        ? 'Obsolete empty/store responsibility is not recreated.'
        : treatment === 'deferred'
          ? 'Preserved in evidence but intentionally unavailable pending a documented owner/currentness decision.'
          : 'Consolidated into the locked canonical page responsibility.',
  }))
})

const outputPath = path.join(projectRoot, 'verification/CONTENT-COVERAGE.tsv')
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
const lines = [fields.join('\t'), ...output.map((record) => fields.map((field) => clean(record[field])).join('\t'))]
fs.writeFileSync(outputPath, `${lines.join('\n')}\n`)

const treatments = Object.groupBy(output, (record) => record.treatment)
const summary = Object.fromEntries(Object.entries(treatments).map(([key, records]) => [key, records.length]))
console.log(JSON.stringify({ rows: output.length, blankTreatment: output.filter((record) => !record.treatment).length, summary }, null, 2))
