/* eslint-disable */
// website.jsx — CoreNest marketing site
// One-file React app. Composes hero, trust strip, stats, features,
// product showcase, MITRE demo, threat ticker, comparison, quotes,
// pricing, final CTA, and footer.

const { useState: uS, useEffect: uE, useRef: uR, useContext: uC } = React;

/* ── tiny icon helper (subset of product I, redrawn for marketing) ── */
const Ico = ({ d, children, size = 16, stroke = 1.6, fill = 'none' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {d && <path d={d}/>}{children}
  </svg>
);
const IC = {
  shield: <Ico><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></Ico>,
  arrow:  <Ico><path d="M5 12h14M13 6l6 6-6 6"/></Ico>,
  play:   <Ico fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></Ico>,
  check:  <Ico><path d="M20 6 9 17l-5-5"/></Ico>,
  x:      <Ico><path d="M18 6 6 18M6 6l12 12"/></Ico>,
  star:   <Ico fill="currentColor" stroke="none"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></Ico>,
  zap:    <Ico><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></Ico>,
  cross:  <Ico><circle cx="12" cy="12" r="9"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/></Ico>,
  swirl:  <Ico><path d="M21 12a9 9 0 1 1-9-9c4.5 0 7 3 7 7s-2.5 5-5 5-3-1.5-3-3"/></Ico>,
  compass:<Ico><circle cx="12" cy="12" r="9"/><path d="m16 8-6 2-2 6 6-2 2-6z"/></Ico>,
  flask:  <Ico><path d="M9 3h6M10 3v6L4 20a2 2 0 0 0 1.7 3h12.6A2 2 0 0 0 20 20l-6-11V3"/></Ico>,
  cloud:  <Ico><path d="M17 19a5 5 0 0 0 .5-9.9 7 7 0 0 0-13.5 2.4A4 4 0 0 0 5 19h12z"/></Ico>,
  scale:  <Ico><path d="M12 3v18M6 7l-3 7c0 2 1.5 3 3 3s3-1 3-3L6 7zM18 7l-3 7c0 2 1.5 3 3 3s3-1 3-3l-3-7zM5 7h14"/></Ico>,
  chip:   <Ico><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></Ico>,
  search: <Ico><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></Ico>,
  gauge:  <Ico><path d="M12 14 18 8M22 12a10 10 0 1 0-19.5 3"/><circle cx="12" cy="14" r="1.5"/></Ico>,
  ext:    <Ico><path d="M7 17 17 7M9 7h8v8"/></Ico>,
  sparkle:<Ico><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 8.5 13.4 11l2.5 1-2.5 1L12 15.5 10.6 13l-2.5-1 2.5-1z" fill="currentColor" stroke="none"/></Ico>,
  rss:    <Ico><path d="M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 12a7 7 0 0 1 7 7M5 5a14 14 0 0 1 14 14"/></Ico>,
  bug:    <Ico><path d="M8 7a4 4 0 0 1 8 0M5 11h14M6 8 4 6M18 8l2-2M4 13H2M22 13h-2M5 17l-2 2M19 17l2 2"/><rect x="8" y="7" width="8" height="11" rx="4"/></Ico>,
  lock:   <Ico><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></Ico>,
  file:   <Ico><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></Ico>,
  server: <Ico><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></Ico>,
  database:<Ico><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></Ico>,
  box:    <Ico><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/></Ico>,
  bellOff:<Ico><path d="M8.7 3.7A6 6 0 0 1 18 8c0 3 1 5 1 5M6 8c0 4-2 6-2 6h12M10.3 20a2 2 0 0 0 3.4 0M3 3l18 18"/></Ico>,
  eye:    <Ico><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></Ico>,
  twitter:<Ico stroke="none" fill="currentColor"><path d="M14 3h3l-7 8 8 10h-5.5l-4.5-6-5 6H0l7.5-8.5L0 3h5.5l4 5.5L14 3zm-1 16h1.5L6 5H4.5L13 19z"/></Ico>,
  github: <Ico stroke="none" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.4 6.8 9.7.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-1.4 2.8-1 2.8-1 .6 1.5.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"/></Ico>,
  linkedin:<Ico stroke="none" fill="currentColor"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 18H5V9h3v9zM6.5 7.5a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4zM18 18h-3v-4.4c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.2-.1.4-.1.7V18h-3V9h3v1.3a3 3 0 0 1 2.7-1.5c2 0 3 1.3 3 3.7V18z"/></Ico>,
};

/* ── i18n: copy dictionary (en + tr) ── */
const STR = {
  en: {
    meta: {
      title: 'CoreNest — Catch what legacy SIEMs miss.',
      desc: 'The SIEM built for modern SOCs. 90% less alert noise, an 18-minute MTTR, and a MITRE matrix that actually maps to your detections.',
    },
    nav: { product: 'Product', solutions: 'Solutions', pricing: 'Pricing', customers: 'Customers', resources: 'Resources', docs: 'Docs', signin: 'Sign in', demo: 'Book a demo' },
    hero: {
      eyebrow: 'CoreNest v4.2 · now with AI triage',
      title: [{ t: 'Catch what', br: true }, { t: 'legacy SIEMs', cls: 'strike' }, { t: ' ' }, { t: 'miss.', cls: 'accent' }],
      sub: ['The SIEM built for modern SOCs. ', { b: '90% less alert fatigue' }, ', an 18-minute average MTTR, and the only matrix view that actually maps to your detections.'],
      demo: 'Book a demo', tour: 'Watch product tour',
      micro: ['Free 14-day trial', 'Deploy in under 30 minutes', 'No credit card'],
    },
    scope: {
      events: 'Events 24h', critical: 'Critical', agents: 'Agents',
      alertVol: 'Alert volume · 24 h', peak: 'peak 58 · 19:00 UTC',
      liveFeed: 'LIVE FEED', perMin: 'alerts/min',
      chips: ['+24 alerts in last 60s', 'jane.k · risk 142', 'MTTR 18min', 'MITRE T1059 +4'],
      feed: ['PowerShell encoded payload · prod-edge-04', 'Brute-force on dc-east-01', 'C2 beaconing · 185.220.101.7', 'Unusual login geo · jane.k', 'Scheduled task by SYSTEM', 'Outbound connection · web-fr-02'],
    },
    trust: 'Trusted by 700+ security teams worldwide',
    stats: [
      { sub: 'K', b: 'events/sec sustained', l: 'with the full 3k ruleset loaded' },
      { sub: '+', b: 'native detection rules', l: 'mapped to MITRE & frameworks' },
      { sub: '%', b: 'less alert noise', l: 'via risk-based alerting' },
      { sub: 'min', b: 'average MTTR', l: 'across customer SOCs' },
    ],
    features: {
      eyebrow: 'What you get',
      h2: ['One platform. Every', 'capability your SOC needs.'],
      lede: "From ingestion to investigation to response — CoreNest unifies the workflows you've stitched together for years.",
      items: [
        { title: 'Risk-based alerting', body: 'Notables fire only when accumulated entity risk crosses your threshold. Triage what matters; auto-close the rest.' },
        { title: 'MITRE ATT&CK coverage', body: 'Every detection is mapped to a technique. Visualize coverage, find gaps, and tune detection content.' },
        { title: 'UEBA out of the box', body: 'Statistical baselines per identity, host, and service account. Anomalies surface without writing a single rule.' },
        { title: 'KQL threat hunting', body: 'Pivot through raw events with familiar Kibana-style query syntax. Save and share hunts across the team.' },
        { title: 'Detection Studio', body: '3,000+ native rules plus Sigma support. Author your own with a live preview against historical data — no waiting to see if it fires.' },
        { title: 'Cloud-native connectors', body: 'AWS, Azure, GCP, Okta, Workspace, M365. One-click ingestion. Normalized to ECS so dashboards just work.' },
        { title: 'WatchNode agent', body: 'Lightweight Linux / macOS / Windows agent. Sub-1% CPU footprint. Self-update, self-heal, signed binaries.' },
        { title: 'Compliance hub', body: 'ISO 27001, NIST CSF, SOC 2, HIPAA, PCI-DSS, GDPR. Live posture scores; export-ready evidence packs.' },
        { title: 'SOAR + playbooks', body: '40+ pre-built response playbooks. Block IPs, isolate hosts, revoke sessions, page PagerDuty — without leaving the case.' },
      ],
    },
    showcase: {
      eyebrow: 'The product',
      h2: ['Built for the SOC analyst on shift,', 'the hunter at 2 AM, the director on Monday.'],
      tour: 'See full product tour',
      items: [
        { name: 'Overview', desc: 'Operational pulse for the whole org. KPIs, severity breakdown, live alert feed.' },
        { name: 'Alerts & Incidents', desc: 'Triage queue with severity-banded KPIs, filter chips, and one-click investigation in Discover.' },
        { name: 'MITRE ATT&CK matrix', desc: 'Coverage heatmap across all 12 enterprise tactics. Spot detection gaps at a glance.' },
        { name: 'Risk-based alerting', desc: 'Accumulated entity scores with threshold-based notables. 90% less alert noise, by construction.' },
      ],
    },
    demos: {
      overview: {
        kpis: ['Events 24h', 'Critical', 'Agents', 'Open cases'],
        trend: 'Alert trend · 24h', peak: 'peak 58 · 19:00 UTC', live: 'Live feed',
        feed: ['PowerShell encoded payload', 'Brute-force on domain admin', 'Anomalous outbound to 185.220.101.7', 'Unusual login geo · jane.k'],
      },
      alerts: {
        sevs: ['Critical', 'High', 'Medium', 'Low'],
        kpis: ['Total alerts', 'Critical', 'High', 'Medium'],
        cols: ['Time', 'Sev', 'Incident', 'Status'],
        rows: [
          { d: 'PowerShell ransomware staging · prod-edge-04', st: 'in-triage' },
          { d: 'Brute-force on dc-east-01', st: 'investigating' },
          { d: 'Anomalous outbound to 185.220.101.7', st: 'investigating' },
          { d: 'Unusual login geo · jane.k', st: 'acknowledged' },
        ],
      },
      mitre: {
        coverage: 'Technique coverage · 24 h', cellsLit: 'cells lit · 12/12 tactics',
        tactics: ['Recon', 'Resource', 'Init Acc', 'Exec', 'Persist', 'Priv Esc', 'Def Evade', 'Cred Acc', 'Discover', 'Lateral', 'C2', 'Impact'],
        legend: ['Critical (5+)', 'Hot (3–4)', 'Warm (1–2)'],
      },
      risk: {
        leaderboard: 'Entity risk leaderboard', notables: '2 notables · threshold 100', notable: 'NOTABLE',
        callout: "Only 2 notable alerts fired today — instead of the 187 raw alerts these entities generated. That's how CoreNest cuts noise by 90%.",
      },
    },
    ticker: ['PowerShell encoded payload', 'Brute-force domain admin', 'C2 beaconing to 185.220.101.7', 'Unusual login geo · jane.k', 'Scheduled task by SYSTEM', 'Containment playbook succeeded · 2.3s', 'IAM key exposure detected', 'MITRE T1071 · app-layer C2', 'Privilege escalation attempt', 'UEBA model retrained · jane.k'],
    compare: {
      eyebrow: 'Why teams switch',
      h2: ['Compare to legacy SIEMs', 'and DIY ELK stacks.'],
      head: ['Capability', 'CoreNest', 'Legacy SIEM', 'DIY ELK'],
      rows: [
        { f: 'Time to first alert', us: 'under 30 min', l: 'days–weeks', d: 'weeks' },
        { f: 'Risk-based noise reduction', us: '~90%', l: 'not available', d: 'DIY' },
        { f: 'MITRE ATT&CK matrix view', us: 'native, dynamic', l: 'add-on', d: 'manual' },
        { f: 'UEBA out of the box', us: 'yes', l: 'separate SKU', d: 'no' },
        { f: 'Cloud-native connectors', us: '30+ pre-built', l: 'limited', d: 'roll your own' },
        { f: 'Total cost (mid-size SOC)', us: '$2k–8k / mo', l: '$30k+ / mo', d: 'engineering time' },
        { f: 'Setup engineering', us: '0.5 FTE', l: '2–3 FTE', d: '4+ FTE' },
      ],
    },
    testimonials: {
      eyebrow: 'Customer love',
      h2: ['Why analysts and directors', 'both stay on the platform.'],
      items: [
        { text: '"We replaced Splunk in 6 weeks. Our team went from drowning in 800 alerts a day to triaging 30 notables. We hired a hunter instead of another tier-1."', role: 'Director of SecOps · Frontier Bank' },
        { text: '"The MITRE matrix view alone is worth the price. We finally see our coverage gaps without spreadsheets."', role: 'Threat Hunter · Vega Cloud' },
        { text: '"Risk-based alerting is the killer feature. Our MTTR dropped from 4h to 22 minutes."', role: 'SOC Manager · Northstar' },
      ],
    },
    pricing: {
      eyebrow: 'Pricing',
      h2: ['Priced per ingestion, not per seat.', 'No surprise overages.'],
      lede: '14-day free trial on every plan. Cancel anytime. Migrate from Splunk and get a free quarter of credit.',
      badge: 'Most popular',
      plans: [
        { name: 'Starter', price: '$0', unit: 'free forever', tag: 'For small teams getting started with detection', cta: 'Start free',
          features: ['5 agents · 10 GB/mo ingestion', 'Core SIEM + Discover + Alerts', 'MITRE ATT&CK matrix', '7-day retention', 'Community detection content'] },
        { name: 'Business', price: '$2,400', unit: '/mo · billed annually', tag: 'For growing SOCs that need risk-based alerting', cta: 'Start 14-day trial',
          features: ['Up to 500 agents · 500 GB/mo', { b: 'Everything in Starter, plus:' }, 'UEBA + Risk-based alerting', 'SOAR with 40+ playbooks', '90-day retention · ECS normalized', 'SSO + RBAC · 24×7 chat support'] },
        { name: 'Enterprise', price: 'Custom', unit: 'contact sales', tag: 'For regulated industries and global SOCs', cta: 'Talk to sales',
          features: ['Unlimited agents · custom retention', { b: 'Everything in Business, plus:' }, 'Air-gapped + multi-region', 'Custom detection content packs', 'Compliance hub (HIPAA, PCI, SOC 2)', 'Dedicated CSM + named threat analyst'] },
      ],
    },
    finalcta: {
      eyebrow: 'Ready when you are',
      h2: ['Stop triaging noise.', 'Start hunting threats.'],
      lede: 'See CoreNest running against your data in a 30-minute walkthrough. Or start a free trial and have your first alerts in under an hour.',
      demo: 'Book a demo', trial: 'Start free trial',
    },
    footer: {
      tagline: 'Modern SIEM for modern SOCs. Cut alert noise by 90%, map every detection to MITRE, and respond in minutes — not hours.',
      cols: [
        { title: 'Product', links: [{ label: 'AI triage', href: '#ai' }, { label: 'Detection & Sigma', href: '#detection' }, { label: 'Threat intel', href: '#capabilities' }, { label: 'EDR & response', href: '#capabilities' }, { label: 'UEBA', href: '#' }, { label: 'Architecture', href: '#architecture' }] },
        { title: 'Solutions', links: [{ label: 'Mid-market SOCs', href: '#' }, { label: 'Enterprise', href: '#' }, { label: 'MSSPs', href: '#' }, { label: 'Compliance', href: '#' }, { label: 'Cloud security', href: '#' }] },
        { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'Detection library', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Customer stories', href: '#' }, { label: 'Status', href: '#' }, { label: 'Changelog', href: '#' }] },
        { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Security', href: '#' }, { label: 'Trust center', href: '#' }, { label: 'Contact', href: '#' }] },
      ],
      bottom: '© 2026 CoreNest, Inc. SOC 2 Type II · ISO 27001 · GDPR',
    },
    ai: {
      eyebrow: 'New · AI triage',
      h2: ["Your SOC's first", 'responder writes the', 'case for you.'],
      lede: ['The instant an alert fires, an LLM — Claude in the cloud or a local Ollama model in your VPC — reads the raw events and writes a plain-English ', { b: 'WHAT / WHY / NEXT-STEP' }, ' summary straight onto the case.'],
      bullets: [
        { b: 'What happened', t: ' — the event chain, decoded and correlated, in two sentences.' },
        { b: 'Why it matters', t: ' — mapped techniques, UEBA deviation, and blast radius.' },
        { b: 'What to do next', t: ' — concrete response steps an analyst runs in one click.' },
        { b: 'Your data stays yours', t: ' — run fully offline against a local model; nothing leaves the network.' },
      ],
      cta: 'See AI triage live',
      card: {
        sevBadge: 'Critical', title: 'PowerShell encoded payload · prod-edge-04',
        meta: ['risk 142', 'T1059.001', 'opened 16:42', '1 analyst'],
        panelH: 'AI triage summary', model: 'claude · local ollama',
        segs: [
          { k: 'WHAT', c: 'crit', text: 'An obfuscated PowerShell one-liner on prod-edge-04 decoded to a Cobalt Strike stager beaconing to 185.220.101.7.' },
          { k: 'WHY', c: 'high', text: 'Maps to T1059.001 + T1071. svc-deploy-prod has no history of interactive PowerShell — UEBA scores this a 4.2σ deviation.' },
          { k: 'NEXT STEP', c: 'ok', text: 'Isolate prod-edge-04, revoke svc-deploy-prod sessions, block the C2 IP at the edge. Ransomware canaries intact — no encryption yet.' },
        ],
        actions: ['Isolate host', 'Block C2 IP', 'Revoke sessions'],
      },
    },
    detection: {
      eyebrow: 'Detection & rule engine',
      h2: ['3,000 detections out of the box.', 'Not 700.'],
      lede: ['A native ruleset organized by tactic, source and framework — running alongside a second engine that executes community ', { b: 'Sigma' }, ' rules unmodified. Proven at ', { b: '850,000 EPS' }, ' with the full set loaded.'],
      chips: ['By tactic', 'By source', 'By framework'],
      bignumCap: 'native detection rules, each mapped to a MITRE technique and tunable live in Detection Studio.',
      engines: [{ k: 'Primary engine', v: 'Native CoreNest rules · 3,000+' }, { k: 'Secondary engine', v: 'Community Sigma rules, run as-is' }],
      packsHead: ['Per-role detection content', 'turnkey + setup guide'],
      bignum: '3,000',
      epsTop: 'Sustained throughput', epsV: '850,000', epsFoot: 'full 3k ruleset loaded · zero drop',
    },
    capabilities: {
      eyebrow: 'The full platform',
      h2: ['Detection is the start.', "Here's everything else."],
      lede: 'Intel, response, endpoint telemetry, case management and compliance — one agent, one manager, one console.',
      caps: 'capabilities',
      groups: [
        { label: 'Threat intelligence & enrichment', items: [
          { t: '7 live threat-intel feeds', b: 'AbuseIPDB, AlienVault OTX, Feodo Tracker, MalwareBazaar, URLhaus, MISP and plaintext lists — correlated against every event.' },
          { t: 'VirusTotal enrichment', b: 'Rate-limited, TTL-cached reputation attached to alerts, so you enrich without burning your API quota.' },
          { t: 'Vulnerability detection', b: 'NVD CVE feed with OS-aware matching and a dpkg / rpm version comparator that flags exposed packages.' },
          { t: 'Behavioral UEBA', b: 'Cross-entity 2σ spikes, brute-force / exfil / first-seen-process detection, peer-group outliers and seasonal self-baselines.' },
        ] },
        { label: 'Endpoint detection & response', items: [
          { t: 'One-click host isolation', b: "Quarantine a host's network while keeping the manager link alive — auto-releases on a TTL so nothing stays stranded." },
          { t: 'Ransomware canary detection', b: "Decoy files trip a critical alert the instant they're tampered with (MITRE T1486) — before encryption spreads." },
          { t: 'In-memory YARA scanning', b: 'Scans live process memory for fileless and in-memory threats (T1620) that never touch disk.' },
          { t: 'Active Response engine', b: 'Auto-block IPs, kill processes, disable accounts and restart services — with safelists and TTL auto-undo.' },
        ] },
        { label: 'Endpoint telemetry · WatchNode', items: [
          { t: 'File integrity monitoring + whodata', b: 'See exactly who changed each file via auditd on Linux and Windows 4663–4656 events.' },
          { t: 'Registry, process & network', b: 'Full host activity capture across Windows, Linux and macOS from one lightweight agent.' },
          { t: 'osquery · SCA · Rootcheck', b: 'Ad-hoc host queries, Security Configuration Assessment and rootkit / anomaly checks, built in.' },
          { t: 'Containers & silent sources', b: 'Docker event collection, plus an alert the moment an expected log source goes quiet.' },
        ] },
        { label: 'Investigate, report & comply', items: [
          { t: 'Native case management', b: 'Built-in ticketing with auto-create, SLA tracking and a full audit trail. No Jira required.' },
          { t: 'Config audit log', b: 'Every configuration change recorded and attributable, so you always know who changed what.' },
          { t: 'Scheduled PDF reports', b: 'Automated report generation with SMTP email delivery on whatever cadence you set.' },
          { t: '290 control-tagged rules', b: 'ISO 27001, NIST, SOC 2, HIPAA, PCI and GDPR — backed by live posture dashboards.' },
        ] },
      ],
    },
    architecture: {
      eyebrow: 'Platform & deployment',
      h2: ['Four services. One pipeline.', 'Built to scale and stay up.'],
      nodes: [
        { role: 'Agent', desc: 'Endpoint collector — FIM, osquery, YARA, active response.' },
        { role: 'Manager', desc: 'Rule engine, correlation, intel enrichment, AI triage.' },
        { role: 'Indexer', desc: 'OpenSearch storage, search and retention.' },
        { role: 'Dashboard', desc: 'Analyst console — cases, MITRE, reports.' },
      ],
      cards: [
        { t: 'gRPC-connected services', b: 'Every tier streams over authenticated gRPC — low-latency and back-pressure aware, so bursts never drop events.' },
        { t: 'High-availability topology', b: 'A 3-node OpenSearch cluster behind HAProxy with dual managers gives you zero-downtime failover.' },
        { t: 'Fleet deployment', b: 'Automated PowerShell + nssm rollout pushes WatchNode to thousands of machines in a single pass.' },
      ],
    },
  },
  tr: {
    meta: {
      title: "CoreNest — Eski SIEM'lerin kaçırdığını yakalayın.",
      desc: "Modern SOC'lar için geliştirilen SIEM. %90 daha az uyarı gürültüsü, 18 dakikalık MTTR ve tespitlerinizle gerçekten eşleşen bir MITRE matrisi.",
    },
    nav: { product: 'Ürün', solutions: 'Çözümler', pricing: 'Fiyatlandırma', customers: 'Müşteriler', resources: 'Kaynaklar', docs: 'Dokümanlar', signin: 'Giriş yap', demo: 'Demo planla' },
    hero: {
      eyebrow: 'CoreNest v4.2 · artık yapay zekâ triyajı ile',
      title: [{ t: "Eski SIEM'lerin", cls: 'strike', br: true }, { t: 'kaçırdığını ' }, { t: 'yakalayın.', cls: 'accent' }],
      sub: ['Modern SOC’lar için geliştirilen SIEM. ', { b: '%90 daha az uyarı yorgunluğu' }, ', ortalama 18 dakikalık MTTR ve tespitlerinizle gerçekten eşleşen tek matris görünümü.'],
      demo: 'Demo planla', tour: 'Ürün turunu izle',
      micro: ['14 gün ücretsiz deneme', '30 dakikadan kısa sürede kurulum', 'Kredi kartı gerekmez'],
    },
    scope: {
      events: 'Olaylar 24s', critical: 'Kritik', agents: 'Ajanlar',
      alertVol: 'Uyarı hacmi · 24 sa', peak: 'zirve 58 · 19:00 UTC',
      liveFeed: 'CANLI AKIŞ', perMin: 'uyarı/dk',
      chips: ["son 60 sn'de +24 uyarı", 'jane.k · risk 142', 'MTTR 18dk', 'MITRE T1059 +4'],
      feed: ['PowerShell kodlanmış yük · prod-edge-04', 'dc-east-01 üzerinde kaba kuvvet', 'C2 sinyali · 185.220.101.7', 'Olağandışı oturum konumu · jane.k', 'SYSTEM tarafından zamanlanmış görev', 'Giden bağlantı · web-fr-02'],
    },
    trust: '700+ güvenlik ekibinin güvendiği platform',
    stats: [
      { sub: 'K', b: 'olay/sn sürekli', l: 'tüm 3k kural seti yüklüyken' },
      { sub: '+', b: 'yerel tespit kuralı', l: 'MITRE ve çerçevelerle eşlenmiş' },
      { sub: '%', b: 'daha az uyarı gürültüsü', l: 'risk tabanlı uyarı ile' },
      { sub: 'dk', b: 'ortalama MTTR', l: "müşteri SOC'larında" },
    ],
    features: {
      eyebrow: 'Neler elde edersiniz',
      h2: ['Tek platform.', "SOC'unuzun ihtiyaç duyduğu her yetenek."],
      lede: 'Veri alımından incelemeye, oradan müdahaleye — CoreNest yıllardır bir araya getirmeye çalıştığınız iş akışlarını birleştirir.',
      items: [
        { title: 'Risk tabanlı uyarı', body: 'Önemli uyarılar yalnızca birikmiş varlık riski eşiğinizi aştığında tetiklenir. Önemli olanı önceliklendirin; gerisini otomatik kapatın.' },
        { title: 'MITRE ATT&CK kapsamı', body: 'Her tespit bir tekniğe eşlenir. Kapsamı görselleştirin, boşlukları bulun ve tespit içeriğini ince ayarlayın.' },
        { title: 'Kutudan çıkar çıkmaz UEBA', body: 'Her kimlik, ana bilgisayar ve servis hesabı için istatistiksel temel çizgiler. Tek bir kural yazmadan anomaliler ortaya çıkar.' },
        { title: 'KQL ile tehdit avı', body: 'Tanıdık Kibana tarzı sorgu söz dizimiyle ham olaylar arasında gezinin. Avları kaydedin ve ekiple paylaşın.' },
        { title: 'Detection Studio', body: '3.000+ yerel kural ve Sigma desteği. Geçmiş verilere karşı canlı önizlemeyle kendi kuralınızı yazın — tetiklenip tetiklenmediğini görmek için beklemek yok.' },
        { title: 'Bulut-yerel bağlayıcılar', body: 'AWS, Azure, GCP, Okta, Workspace, M365. Tek tıkla veri alımı. ECS’ye normalize edilir, böylece panolar sorunsuz çalışır.' },
        { title: 'WatchNode ajanı', body: 'Hafif Linux / macOS / Windows ajanı. %1’in altında CPU kullanımı. Kendi kendine güncelleme, kendi kendine onarım, imzalı ikili dosyalar.' },
        { title: 'Uyumluluk merkezi', body: 'ISO 27001, NIST CSF, SOC 2, HIPAA, PCI-DSS, GDPR. Canlı duruş puanları; dışa aktarmaya hazır kanıt paketleri.' },
        { title: 'SOAR + senaryolar', body: '40+ hazır müdahale senaryosu. IP engelleyin, ana bilgisayarları izole edin, oturumları iptal edin, PagerDuty’ye bildirim gönderin — vakadan çıkmadan.' },
      ],
    },
    showcase: {
      eyebrow: 'Ürün',
      h2: ['Nöbetteki SOC analisti,', "sabah 2'deki avcı, pazartesi günü direktör için."],
      tour: 'Tüm ürün turunu görün',
      items: [
        { name: 'Genel bakış', desc: "Tüm kuruluşun operasyonel nabzı. KPI'lar, önem derecesi dağılımı, canlı uyarı akışı." },
        { name: 'Uyarılar ve Olaylar', desc: "Önem derecesine göre KPI'lar, filtre etiketleri ve Discover'da tek tıkla inceleme içeren triyaj kuyruğu." },
        { name: 'MITRE ATT&CK matrisi', desc: '12 kurumsal taktiğin tamamında kapsam ısı haritası. Tespit boşluklarını bir bakışta görün.' },
        { name: 'Risk tabanlı uyarı', desc: 'Eşik tabanlı önemli uyarılarla birikmiş varlık puanları. Tasarım gereği %90 daha az uyarı gürültüsü.' },
      ],
    },
    demos: {
      overview: {
        kpis: ['Olaylar 24s', 'Kritik', 'Ajanlar', 'Açık vakalar'],
        trend: 'Uyarı trendi · 24s', peak: 'zirve 58 · 19:00 UTC', live: 'Canlı akış',
        feed: ['PowerShell kodlanmış yük', 'Etki alanı yöneticisine kaba kuvvet', "185.220.101.7'ye anormal giden trafik", 'Olağandışı oturum konumu · jane.k'],
      },
      alerts: {
        sevs: ['Kritik', 'Yüksek', 'Orta', 'Düşük'],
        kpis: ['Toplam uyarı', 'Kritik', 'Yüksek', 'Orta'],
        cols: ['Zaman', 'Önem', 'Olay', 'Durum'],
        rows: [
          { d: 'PowerShell fidye yazılımı hazırlığı · prod-edge-04', st: 'triyajda' },
          { d: 'dc-east-01 üzerinde kaba kuvvet', st: 'inceleniyor' },
          { d: "185.220.101.7'ye anormal giden trafik", st: 'inceleniyor' },
          { d: 'Olağandışı oturum konumu · jane.k', st: 'onaylandı' },
        ],
      },
      mitre: {
        coverage: 'Teknik kapsamı · 24 sa', cellsLit: 'hücre yandı · 12/12 taktik',
        tactics: ['Önkeşif', 'Kaynak', 'İlk Erş', 'Çalıştır', 'Kalıcı', 'Yetki Y.', 'Svn Atl', 'Kiml Er', 'Keşif', 'Yanal', 'C2', 'Etki'],
        legend: ['Kritik (5+)', 'Yoğun (3–4)', 'Ilık (1–2)'],
      },
      risk: {
        leaderboard: 'Varlık risk sıralaması', notables: '2 önemli · eşik 100', notable: 'ÖNEMLİ',
        callout: 'Bugün yalnızca 2 önemli uyarı tetiklendi — bu varlıkların ürettiği 187 ham uyarı yerine. CoreNest gürültüyü işte böyle %90 azaltır.',
      },
    },
    ticker: ['PowerShell kodlanmış yük', 'Etki alanı yöneticisine kaba kuvvet', "185.220.101.7'ye C2 sinyali", 'Olağandışı oturum konumu · jane.k', 'SYSTEM tarafından zamanlanmış görev', 'Sınırlama senaryosu başarılı · 2.3s', 'IAM anahtarı ifşası tespit edildi', 'MITRE T1071 · uygulama katmanı C2', 'Yetki yükseltme girişimi', 'UEBA modeli yeniden eğitildi · jane.k'],
    compare: {
      eyebrow: 'Ekipler neden geçiyor',
      h2: ["Eski SIEM'ler ve kendin-yap", 'ELK yığınlarıyla karşılaştırın.'],
      head: ['Yetenek', 'CoreNest', 'Eski SIEM', 'Kendin-Yap ELK'],
      rows: [
        { f: 'İlk uyarıya kadar süre', us: '30 dk altı', l: 'günler–haftalar', d: 'haftalar' },
        { f: 'Risk tabanlı gürültü azaltma', us: '~%90', l: 'mevcut değil', d: 'kendin yap' },
        { f: 'MITRE ATT&CK matris görünümü', us: 'yerel, dinamik', l: 'eklenti', d: 'manuel' },
        { f: 'Kutudan çıkar çıkmaz UEBA', us: 'evet', l: 'ayrı lisans', d: 'hayır' },
        { f: 'Bulut-yerel bağlayıcılar', us: '30+ hazır', l: 'sınırlı', d: 'kendin yaz' },
        { f: 'Toplam maliyet (orta SOC)', us: '$2k–8k / ay', l: '$30k+ / ay', d: 'mühendislik zamanı' },
        { f: 'Kurulum mühendisliği', us: '0.5 FTE', l: '2–3 FTE', d: '4+ FTE' },
      ],
    },
    testimonials: {
      eyebrow: 'Müşteri memnuniyeti',
      h2: ['Analistler ve direktörler', 'neden platformda kalıyor.'],
      items: [
        { text: "\"Splunk'ı 6 haftada değiştirdik. Ekibimiz günde 800 uyarıda boğulmaktan 30 önemli uyarıyı triyaj etmeye geçti. Bir tier-1 daha yerine bir tehdit avcısı işe aldık.\"", role: 'SecOps Direktörü · Frontier Bank' },
        { text: '"Tek başına MITRE matris görünümü bile fiyatına değer. Kapsam boşluklarımızı nihayet elektronik tablolar olmadan görüyoruz."', role: 'Tehdit Avcısı · Vega Cloud' },
        { text: "\"Risk tabanlı uyarı en değerli özellik. MTTR'miz 4 saatten 22 dakikaya düştü.\"", role: 'SOC Yöneticisi · Northstar' },
      ],
    },
    pricing: {
      eyebrow: 'Fiyatlandırma',
      h2: ['Koltuk başına değil, veri alımı başına.', 'Sürpriz aşım ücreti yok.'],
      lede: "Her planda 14 gün ücretsiz deneme. İstediğiniz zaman iptal edin. Splunk'tan geçin, bir çeyreklik ücretsiz kredi kazanın.",
      badge: 'En popüler',
      plans: [
        { name: 'Starter', price: '$0', unit: 'sonsuza dek ücretsiz', tag: 'Tespit ile yeni başlayan küçük ekipler için', cta: 'Ücretsiz başla',
          features: ['5 ajan · aylık 10 GB veri alımı', 'Temel SIEM + Discover + Uyarılar', 'MITRE ATT&CK matrisi', '7 gün saklama', 'Topluluk tespit içeriği'] },
        { name: 'Business', price: '$2,400', unit: '/ay · yıllık faturalandırma', tag: "Risk tabanlı uyarıya ihtiyaç duyan büyüyen SOC'lar için", cta: '14 günlük denemeyi başlat',
          features: ['500 ajana kadar · aylık 500 GB', { b: "Starter'daki her şey, ayrıca:" }, 'UEBA + Risk tabanlı uyarı', '40+ senaryolu SOAR', '90 gün saklama · ECS normalize', 'SSO + RBAC · 7/24 sohbet desteği'] },
        { name: 'Enterprise', price: 'Özel', unit: 'satışla iletişime geçin', tag: "Düzenlemeye tabi sektörler ve küresel SOC'lar için", cta: 'Satışla görüşün',
          features: ['Sınırsız ajan · özel saklama', { b: "Business'taki her şey, ayrıca:" }, 'Hava boşluklu + çoklu bölge', 'Özel tespit içerik paketleri', 'Uyumluluk merkezi (HIPAA, PCI, SOC 2)', 'Özel CSM + atanmış tehdit analisti'] },
      ],
    },
    finalcta: {
      eyebrow: 'Hazır olduğunuzda',
      h2: ['Gürültüyü triyaj etmeyi bırakın.', 'Tehdit avına başlayın.'],
      lede: "CoreNest'i 30 dakikalık bir tanıtımda kendi verilerinizle çalışırken görün. Ya da ücretsiz denemeye başlayın ve ilk uyarılarınızı bir saatten kısa sürede alın.",
      demo: 'Demo planla', trial: 'Ücretsiz denemeyi başlat',
    },
    footer: {
      tagline: "Modern SOC'lar için modern SIEM. Uyarı gürültüsünü %90 azaltın, her tespiti MITRE'ye eşleyin ve saatler değil dakikalar içinde müdahale edin.",
      cols: [
        { title: 'Ürün', links: [{ label: 'Yapay zekâ triyajı', href: '#ai' }, { label: 'Tespit & Sigma', href: '#detection' }, { label: 'Tehdit istihbaratı', href: '#capabilities' }, { label: 'EDR & müdahale', href: '#capabilities' }, { label: 'UEBA', href: '#' }, { label: 'Mimari', href: '#architecture' }] },
        { title: 'Çözümler', links: [{ label: "Orta ölçekli SOC'lar", href: '#' }, { label: 'Kurumsal', href: '#' }, { label: "MSSP'ler", href: '#' }, { label: 'Uyumluluk', href: '#' }, { label: 'Bulut güvenliği', href: '#' }] },
        { title: 'Kaynaklar', links: [{ label: 'Dokümantasyon', href: '#' }, { label: 'Tespit kütüphanesi', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Müşteri hikâyeleri', href: '#' }, { label: 'Durum', href: '#' }, { label: 'Değişiklik günlüğü', href: '#' }] },
        { title: 'Şirket', links: [{ label: 'Hakkımızda', href: '#' }, { label: 'Kariyer', href: '#' }, { label: 'Güvenlik', href: '#' }, { label: 'Güven merkezi', href: '#' }, { label: 'İletişim', href: '#' }] },
      ],
      bottom: '© 2026 CoreNest, Inc. SOC 2 Type II · ISO 27001 · GDPR',
    },
    ai: {
      eyebrow: 'Yeni · yapay zekâ triyajı',
      h2: ["SOC'unuzun ilk", 'müdahale ekibi vakayı', 'sizin için yazıyor.'],
      lede: ['Bir uyarı tetiklendiği anda bir LLM — buluttaki Claude veya VPC’nizdeki yerel bir Ollama modeli — ham olayları okur ve doğrudan vakanın üzerine sade bir dille ', { b: 'NE / NEDEN / SONRAKİ ADIM' }, ' özeti yazar.'],
      bullets: [
        { b: 'Ne oldu', t: ' — olay zinciri, çözülmüş ve ilişkilendirilmiş, iki cümlede.' },
        { b: 'Neden önemli', t: ' — eşlenen teknikler, UEBA sapması ve etki alanı.' },
        { b: 'Sırada ne var', t: ' — bir analistin tek tıkla çalıştırdığı somut müdahale adımları.' },
        { b: 'Verileriniz sizde kalır', t: ' — yerel bir modelle tamamen çevrimdışı çalışın; ağdan hiçbir şey çıkmaz.' },
      ],
      cta: 'Yapay zekâ triyajını canlı görün',
      card: {
        sevBadge: 'Kritik', title: 'PowerShell kodlanmış yük · prod-edge-04',
        meta: ['risk 142', 'T1059.001', 'açıldı 16:42', '1 analist'],
        panelH: 'Yapay zekâ triyaj özeti', model: 'claude · yerel ollama',
        segs: [
          { k: 'NE', c: 'crit', text: "prod-edge-04 üzerindeki şifrelenmiş tek satırlık bir PowerShell komutu, 185.220.101.7'ye sinyal gönderen bir Cobalt Strike yükleyicisine çözüldü." },
          { k: 'NEDEN', c: 'high', text: "T1059.001 + T1071 ile eşleşir. svc-deploy-prod'un etkileşimli PowerShell geçmişi yok — UEBA bunu 4.2σ sapma olarak puanlıyor." },
          { k: 'SONRAKİ ADIM', c: 'ok', text: "prod-edge-04'ü izole edin, svc-deploy-prod oturumlarını iptal edin, C2 IP'sini uçta engelleyin. Fidye yazılımı tuzakları sağlam — henüz şifreleme yok." },
        ],
        actions: ['Ana bilgisayarı izole et', "C2 IP'sini engelle", 'Oturumları iptal et'],
      },
    },
    detection: {
      eyebrow: 'Tespit & kural motoru',
      h2: ['Kutudan çıkar çıkmaz 3.000 tespit.', '700 değil.'],
      lede: ['Taktiğe, kaynağa ve çerçeveye göre düzenlenmiş yerel bir kural seti — topluluk ', { b: 'Sigma' }, ' kurallarını olduğu gibi çalıştıran ikinci bir motorla birlikte. Tüm set yüklüyken ', { b: '850.000 EPS' }, ' ile kanıtlanmıştır.'],
      chips: ['Taktiğe göre', 'Kaynağa göre', 'Çerçeveye göre'],
      bignumCap: "yerel tespit kuralı; her biri bir MITRE tekniğine eşlenir ve Detection Studio'da canlı olarak ayarlanabilir.",
      engines: [{ k: 'Birincil motor', v: 'Yerel CoreNest kuralları · 3.000+' }, { k: 'İkincil motor', v: 'Topluluk Sigma kuralları, olduğu gibi' }],
      packsHead: ['Role özel tespit içeriği', 'anahtar teslim + kurulum kılavuzu'],
      bignum: '3.000',
      epsTop: 'Sürekli işlem hacmi', epsV: '850.000', epsFoot: 'tüm 3k kural seti yüklü · sıfır kayıp',
    },
    capabilities: {
      eyebrow: 'Platformun tamamı',
      h2: ['Tespit yalnızca başlangıç.', 'İşte geri kalan her şey.'],
      lede: 'İstihbarat, müdahale, uç nokta telemetrisi, vaka yönetimi ve uyumluluk — tek ajan, tek yönetici, tek konsol.',
      caps: 'yetenek',
      groups: [
        { label: 'Tehdit istihbaratı & zenginleştirme', items: [
          { t: '7 canlı tehdit istihbaratı beslemesi', b: 'AbuseIPDB, AlienVault OTX, Feodo Tracker, MalwareBazaar, URLhaus, MISP ve düz metin listeleri — her olayla ilişkilendirilir.' },
          { t: 'VirusTotal zenginleştirme', b: 'Hız sınırlı, TTL önbellekli itibar verisi uyarılara eklenir; böylece API kotanızı tüketmeden zenginleştirirsiniz.' },
          { t: 'Güvenlik açığı tespiti', b: 'İşletim sistemi farkında eşleştirme ve açıkta kalan paketleri işaretleyen dpkg / rpm sürüm karşılaştırıcısı ile NVD CVE beslemesi.' },
          { t: 'Davranışsal UEBA', b: 'Varlıklar arası 2σ sıçramaları, kaba kuvvet / sızdırma / ilk-görülen-süreç tespiti, akran grubu aykırı değerleri ve mevsimsel öz temel çizgileri.' },
        ] },
        { label: 'Uç nokta tespit & müdahale', items: [
          { t: 'Tek tıkla ana bilgisayar izolasyonu', b: 'Yönetici bağlantısını canlı tutarken bir ana bilgisayarın ağını karantinaya alın — TTL ile otomatik serbest bırakılır, böylece hiçbir şey kapalı kalmaz.' },
          { t: 'Fidye yazılımı tuzağı tespiti', b: 'Tuzak dosyalar kurcalandığı anda kritik bir uyarı tetikler (MITRE T1486) — şifreleme yayılmadan önce.' },
          { t: 'Bellek içi YARA taraması', b: 'Diske hiç dokunmayan dosyasız ve bellek içi tehditler (T1620) için canlı süreç belleğini tarar.' },
          { t: 'Aktif Müdahale motoru', b: "IP'leri otomatik engelleyin, süreçleri sonlandırın, hesapları devre dışı bırakın ve servisleri yeniden başlatın — güvenli listeler ve TTL otomatik geri alma ile." },
        ] },
        { label: 'Uç nokta telemetrisi · WatchNode', items: [
          { t: 'Dosya bütünlüğü izleme + whodata', b: "Linux'ta auditd ve Windows 4663–4656 olayları aracılığıyla her dosyayı tam olarak kimin değiştirdiğini görün." },
          { t: 'Kayıt defteri, süreç & ağ', b: 'Tek bir hafif ajandan Windows, Linux ve macOS genelinde tam ana bilgisayar etkinliği kaydı.' },
          { t: 'osquery · SCA · Rootcheck', b: 'Anlık ana bilgisayar sorguları, Güvenlik Yapılandırma Değerlendirmesi ve rootkit / anomali kontrolleri yerleşik olarak.' },
          { t: 'Konteynerler & sessiz kaynaklar', b: 'Docker olay toplama ve beklenen bir günlük kaynağı sustuğu anda bir uyarı.' },
        ] },
        { label: 'İnceleyin, raporlayın & uyumlu kalın', items: [
          { t: 'Yerel vaka yönetimi', b: 'Otomatik oluşturma, SLA takibi ve tam denetim izi içeren yerleşik biletleme. Jira gerekmez.' },
          { t: 'Yapılandırma denetim günlüğü', b: 'Her yapılandırma değişikliği kaydedilir ve ilişkilendirilebilir; böylece neyi kimin değiştirdiğini her zaman bilirsiniz.' },
          { t: 'Zamanlanmış PDF raporları', b: 'Belirlediğiniz herhangi bir sıklıkta SMTP e-posta teslimatıyla otomatik rapor oluşturma.' },
          { t: '290 kontrol etiketli kural', b: 'ISO 27001, NIST, SOC 2, HIPAA, PCI ve GDPR — canlı duruş panolarıyla desteklenir.' },
        ] },
      ],
    },
    architecture: {
      eyebrow: 'Platform & dağıtım',
      h2: ['Dört servis. Tek hat.', 'Ölçeklenmek ve ayakta kalmak için.'],
      nodes: [
        { role: 'Ajan', desc: 'Uç nokta toplayıcı — FIM, osquery, YARA, aktif müdahale.' },
        { role: 'Yönetici', desc: 'Kural motoru, ilişkilendirme, istihbarat zenginleştirme, yapay zekâ triyajı.' },
        { role: 'Dizinleyici', desc: 'OpenSearch depolama, arama ve saklama.' },
        { role: 'Pano', desc: 'Analist konsolu — vakalar, MITRE, raporlar.' },
      ],
      cards: [
        { t: 'gRPC ile bağlı servisler', b: 'Her katman kimlik doğrulamalı gRPC üzerinden akış sağlar — düşük gecikmeli ve geri-basınç farkında, böylece ani yükler olayları asla düşürmez.' },
        { t: 'Yüksek erişilebilirlik topolojisi', b: 'HAProxy arkasında 3 düğümlü bir OpenSearch kümesi ve çift yönetici, sıfır kesintiyle yük devretme sağlar.' },
        { t: 'Filo dağıtımı', b: "Otomatik PowerShell + nssm dağıtımı, WatchNode'u tek seferde binlerce makineye gönderir." },
      ],
    },
  },
};

/* ── count-up hook ── */
function useCountUp(end, duration = 1600, trigger) {
  const [val, setVal] = uS(0);
  uE(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, end, duration]);
  return val;
}

/* ── reveal on scroll ── */
function useReveal() {
  uE(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '-40px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── i18n: render helpers ── */
function Lines({ a }) {
  return a.map((s, i) => <React.Fragment key={i}>{i > 0 && <br/>}{s}</React.Fragment>);
}
function Rich({ a }) {
  return a.map((p, i) => typeof p === 'string'
    ? <React.Fragment key={i}>{p}</React.Fragment>
    : <b key={i} style={{ color: 'var(--fg)' }}>{p.b}</b>);
}
function TitleSegs({ a }) {
  return a.map((s, i) => (
    <React.Fragment key={i}>
      {s.cls ? <span className={s.cls}>{s.t}</span> : s.t}
      {s.br && <br/>}
    </React.Fragment>
  ));
}

/* ── i18n: language context ── */
const LangCtx = React.createContext({ lang: 'en', setLang: () => {}, t: null });
function useLang() { return uC(LangCtx); }
function LangProvider({ children }) {
  const [lang, setLangState] = uS(() => {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'en' || q === 'tr') return q;
      const saved = localStorage.getItem('cn-lang');
      if (saved === 'en' || saved === 'tr') return saved;
      return 'tr'; // Turkish is the default language
    } catch (e) { return 'tr'; }
  });
  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('cn-lang', l); } catch (e) {}
  };
  uE(() => {
    document.documentElement.lang = lang;
    const m = STR[lang].meta;
    document.title = m.title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', m.desc);
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: STR[lang] }}>{children}</LangCtx.Provider>;
}

/* ── nav ── */
function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = uS(false);
  uE(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="nav-brand" href="#">
          <span className="nav-brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </span>
          <span className="nav-wordmark">CoreNest</span>
        </a>
        <div className="nav-links">
          <a className="nav-link has-chevron" href="#features">{t.nav.product}</a>
          <a className="nav-link has-chevron" href="#showcase">{t.nav.solutions}</a>
          <a className="nav-link" href="#pricing">{t.nav.pricing}</a>
          <a className="nav-link" href="#">{t.nav.customers}</a>
          <a className="nav-link has-chevron" href="#">{t.nav.resources}</a>
          <a className="nav-link" href="#">{t.nav.docs}</a>
        </div>
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
            <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')} aria-pressed={lang === 'tr'}>TR</button>
          </div>
          <a className="btn btn-ghost" href="#">{t.nav.signin}</a>
          <a className="btn btn-primary" href="#cta">{t.nav.demo} {IC.arrow}</a>
        </div>
      </div>
    </nav>
  );
}

/* ── hero scope: animated dashboard preview ── */
function HeroScope() {
  const { t } = useLang();
  const [phase, setPhase] = uS(0);
  uE(() => {
    const id = setInterval(() => setPhase(p => p + 1), 80);
    return () => clearInterval(id);
  }, []);

  const points = Array.from({ length: 36 }, (_, i) => {
    const t = (i + phase * 0.5) * 0.4;
    return 32 + Math.sin(t) * 16 + Math.sin(t * 2.3) * 8 + Math.cos(t * 1.7) * 6;
  });
  const W = 280, H = 80;
  const stepX = W / (points.length - 1);
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${i * stepX},${H - v}`).join(' ');
  const area = `${path} L${W},${H} L0,${H} Z`;

  const feedMeta = [
    { t: '16:42:08', s: 'crit' },
    { t: '16:41:55', s: 'high' },
    { t: '16:41:12', s: 'high' },
    { t: '16:39:47', s: 'med' },
    { t: '16:38:21', s: 'med' },
    { t: '16:37:03', s: 'low' },
  ];
  const feedRows = feedMeta.map((m, i) => ({ ...m, d: t.scope.feed[i] }));

  return (
    <div className="hero-scope">
      <span className="hero-chip-float crit"><i/>{t.scope.chips[0]}</span>
      <span className="hero-chip-float high"><i/>{t.scope.chips[1]}</span>
      <span className="hero-chip-float ok"><i/>{t.scope.chips[2]}</span>
      <span className="hero-chip-float med"><i/>{t.scope.chips[3]}</span>

      <div className="hero-scope-card">
        <div className="hero-scope-bar">
          <span className="dots"><i/><i/><i/></span>
          <span className="title">corenest / overview</span>
          <span className="live">LIVE</span>
        </div>
        <div className="hero-scope-body">
          <div className="hero-kpis">
            <div className="hero-kpi alerts">
              <div className="hero-kpi-l">{t.scope.events}</div>
              <div className="hero-kpi-v">24,847</div>
            </div>
            <div className="hero-kpi crit">
              <div className="hero-kpi-l">{t.scope.critical}</div>
              <div className="hero-kpi-v crit">3</div>
            </div>
            <div className="hero-kpi agents">
              <div className="hero-kpi-l">{t.scope.agents}</div>
              <div className="hero-kpi-v">142<span style={{ fontSize: 12, color: 'var(--fg-4)' }}>/146</span></div>
            </div>
          </div>

          <div className="hero-trend">
            <div className="hero-trend-h">
              <h4>{t.scope.alertVol}</h4>
              <span className="meta">{t.scope.peak}</span>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 60, display: 'block' }}>
              <defs>
                <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d={area} fill="url(#heroGrad)"/>
              <path d={path} fill="none" stroke="var(--accent)" strokeWidth="1.5"/>
            </svg>
          </div>

          <div className="hero-feed">
            <div className="hero-feed-h">
              <span className="live">{t.scope.liveFeed}</span>
              <span style={{ marginLeft: 'auto' }}>{feedRows.length}+ {t.scope.perMin}</span>
            </div>
            <div className="hero-feed-list">
              {[...feedRows, ...feedRows].map((r, i) => (
                <div className="row" key={i}>
                  <span className="t">{r.t}</span>
                  <span className={`sev ${r.s}`}/>
                  <span className="d">{r.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── hero section ── */
function Hero() {
  const { t } = useLang();
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-bg-grid"/>
        <div className="hero-bg-radar"/>
        <div className="hero-bg-glow"/>
      </div>
      <div className="container hero-inner">
        <div>
          <div className="eyebrow reveal">{t.hero.eyebrow}</div>
          <h1 className="hero-title reveal" data-delay="1">
            <TitleSegs a={t.hero.title}/>
          </h1>
          <p className="lede hero-sub reveal" data-delay="2">
            <Rich a={t.hero.sub}/>
          </p>
          <div className="hero-cta reveal" data-delay="3">
            <a className="btn btn-primary" href="#cta">{t.hero.demo} {IC.arrow}</a>
            <a className="btn btn-secondary" href="#showcase">{IC.play} {t.hero.tour}</a>
          </div>
          <div className="hero-microstrip reveal" data-delay="4">
            <span>{IC.check} {t.hero.micro[0]}</span>
            <span>{IC.check} {t.hero.micro[1]}</span>
            <span>{IC.check} {t.hero.micro[2]}</span>
          </div>
        </div>
        <div className="reveal" data-delay="2">
          <HeroScope/>
        </div>
      </div>
    </section>
  );
}

/* ── trust strip (logo marquee) ── */
function Trust() {
  const { t } = useLang();
  const logos = [
    { name: 'Northstar', icon: <Ico><polygon points="12,2 14,10 22,10 16,15 18,22 12,18 6,22 8,15 2,10 10,10"/></Ico> },
    { name: 'Vega Cloud', icon: <Ico><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3" fill="currentColor"/></Ico> },
    { name: 'Frontier Bank', icon: <Ico><rect x="3" y="10" width="18" height="10"/><polygon points="12,3 22,10 2,10"/></Ico> },
    { name: 'Acme Securities', icon: <Ico><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Ico> },
    { name: 'Helix Health', icon: <Ico><path d="M4 20c4-4 12-4 16-16M4 4c4 4 12 4 16 16"/></Ico> },
    { name: 'Nexus Retail', icon: <Ico><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></Ico> },
    { name: 'Arctic Energy', icon: <Ico><polygon points="12,2 22,21 2,21"/></Ico> },
    { name: 'Lumen Labs', icon: <Ico><circle cx="12" cy="12" r="8"/><path d="m12 4v16M4 12h16"/></Ico> },
    { name: 'Quanta Telco', icon: <Ico><path d="M4 12a8 8 0 0 1 16 0M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></Ico> },
  ];
  const stream = [...logos, ...logos];
  return (
    <section className="trust">
      <div className="trust-label reveal">{t.trust}</div>
      <div className="marquee">
        <div className="marquee-track">
          {stream.map((l, i) => (
            <span key={i} className="marquee-logo">{l.icon}{l.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── stats counter ── */
function Stats() {
  const { t, lang } = useLang();
  const ref = uR(null);
  const [vis, setVis] = uS(false);
  uE(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { rootMargin: '-80px' });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const eps     = useCountUp(850,  1500, vis);
  const rules   = useCountUp(3000, 1600, vis);
  const fatigue = useCountUp(90,   1500, vis);
  const mttr    = useCountUp(18,   1200, vis);

  const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
  const vals = [
    String(Math.round(eps)),
    Math.round(rules).toLocaleString(locale),
    String(Math.round(fatigue)),
    String(Math.round(mttr)),
  ];
  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {t.stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <div className="v">{vals[i]}<span className="sub">{s.sub}</span></div>
              <div className="l"><b>{s.b}</b><br/>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── features grid (9) ── */
function Features() {
  const { t } = useLang();
  const icons = [IC.zap, IC.compass, IC.swirl, IC.search, IC.flask, IC.cloud, IC.chip, IC.scale, IC.gauge];
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.features.eyebrow}</div>
          <h2><Lines a={t.features.h2}/></h2>
          <p className="lede center" style={{ marginTop: 16 }}>
            {t.features.lede}
          </p>
        </div>
        <div className="features-grid reveal" data-delay="1">
          {t.features.items.map((it, i) => (
            <article key={i} className="feature">
              <div className="feature-icon">{icons[i]}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── product showcase: sticky scroll cycling through 4 demos ── */
function Showcase() {
  const { t } = useLang();
  const [active, setActive] = uS(0);
  const demoKeys = ['overview', 'alerts', 'mitre', 'risk'];
  const items = t.showcase.items.map((it, i) => ({ ...it, demo: demoKeys[i] }));

  const ref = uR(null);
  uE(() => {
    let id;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        id = setInterval(() => setActive(a => (a + 1) % items.length), 4200);
      } else {
        clearInterval(id);
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => { clearInterval(id); io.disconnect(); };
  }, []);

  return (
    <section className="section" id="showcase" ref={ref}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: 'left', maxWidth: 700, marginBottom: 56 }}>
          <div className="eyebrow muted">{t.showcase.eyebrow}</div>
          <h2><Lines a={t.showcase.h2}/></h2>
        </div>

        <div className="showcase-grid">
          <div className="showcase-rail reveal">
            {items.map((it, i) => (
              <div key={i}
                   className={`showcase-item ${active === i ? 'active' : ''}`}
                   onClick={() => setActive(i)}
                   onMouseEnter={() => setActive(i)}>
                <h3>{it.name}</h3>
                <p>{it.desc}</p>
              </div>
            ))}
            <div style={{ marginTop: 32 }}>
              <a className="btn btn-secondary" href="#cta">{t.showcase.tour} {IC.arrow}</a>
            </div>
          </div>

          <div className="showcase-panel reveal" data-delay="1">
            <ShowcasePanel demo={items[active].demo}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcasePanel({ demo }) {
  if (demo === 'overview')  return <DemoOverview/>;
  if (demo === 'alerts')    return <DemoAlerts/>;
  if (demo === 'mitre')     return <DemoMitre/>;
  if (demo === 'risk')      return <DemoRisk/>;
  return null;
}

function DemoFrame({ title, live, children }) {
  return (
    <div style={{ height: '100%' }}>
      <div className="hero-scope-bar">
        <span className="dots"><i/><i/><i/></span>
        <span className="title">corenest / {title}</span>
        {live && <span className="live">LIVE</span>}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function DemoOverview() {
  const { t } = useLang();
  const d = t.demos.overview;
  return (
    <DemoFrame title="overview" live>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { l: d.kpis[0], v: '24,847', c: 'var(--low)' },
          { l: d.kpis[1], v: '3',      c: 'var(--crit)' },
          { l: d.kpis[2], v: '142',    c: 'var(--ok)' },
          { l: d.kpis[3], v: '7',      c: 'var(--accent)' },
        ].map((k, i) => (
          <div key={i} style={{
            background: 'var(--surface-2)', border: '1px solid var(--line)',
            borderRadius: 10, padding: 14, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: k.c }}/>
            <div style={{ fontSize: 10, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{k.l}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: 'var(--fg)' }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11 }}>
          <span style={{ color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{d.trend}</span>
          <span style={{ color: 'var(--fg-4)', fontFamily: 'var(--font-mono)' }}>{d.peak}</span>
        </div>
        <TrendChart/>
      </div>
      <div style={{ marginTop: 14, background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 11, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: 10 }}>{d.live}</div>
        {[
          { t: '16:42:08', s: 'crit', d: d.feed[0], a: 'prod-edge-04' },
          { t: '16:41:55', s: 'high', d: d.feed[1], a: 'dc-east-01' },
          { t: '16:41:12', s: 'high', d: d.feed[2], a: 'prod-app-12' },
          { t: '16:39:47', s: 'med',  d: d.feed[3], a: 'web-fr-02' },
        ].map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '70px 14px 1fr 110px',
            gap: 10, alignItems: 'center', padding: '6px 0',
            fontSize: 11, borderTop: i ? '1px solid var(--line)' : 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-4)' }}>{r.t}</span>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${r.s})`,
                           boxShadow: r.s === 'crit' ? '0 0 6px var(--crit)' : 'none' }}/>
            <span style={{ color: 'var(--fg)' }}>{r.d}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', textAlign: 'right' }}>{r.a}</span>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

function DemoAlerts() {
  const { t } = useLang();
  const d = t.demos.alerts;
  return (
    <DemoFrame title="alerts" live>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {d.sevs.map((s, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 24, padding: '0 10px', borderRadius: 6,
            background: i === 0 ? 'var(--accent-soft)' : 'var(--surface-2)',
            color: i === 0 ? 'var(--accent)' : 'var(--fg-2)',
            border: `1px solid ${i === 0 ? 'rgba(45,212,191,0.32)' : 'var(--line)'}`,
            fontSize: 11, fontWeight: 500,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: `var(--${['crit','high','med','low'][i]})` }}/>
            {s}
          </span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
        {[
          { l: d.kpis[0], v: '712', tag: '+18%', c: 'var(--low)' },
          { l: d.kpis[1], v: '3',   tag: 'ATTN', c: 'var(--crit)' },
          { l: d.kpis[2], v: '28',  tag: '+9',   c: 'var(--high)' },
          { l: d.kpis[3], v: '681', tag: 'OK',   c: 'var(--med)' },
        ].map((k, i) => (
          <div key={i} style={{
            background: 'var(--surface-2)', border: '1px solid var(--line)',
            borderRadius: 10, padding: 12, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: k.c }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 9.5, color: 'var(--fg-4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{k.l}</span>
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: k.c, background: 'var(--surface-3)', padding: '1px 5px', borderRadius: 3 }}>{k.tag}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: i === 1 ? 'var(--crit)' : 'var(--fg)' }}>{k.v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '70px 60px 1fr 80px',
          gap: 10, padding: '8px 14px', fontSize: 10, color: 'var(--fg-4)',
          textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
          background: 'var(--bg-soft)', borderBottom: '1px solid var(--line)',
        }}>
          <span>{d.cols[0]}</span><span>{d.cols[1]}</span><span>{d.cols[2]}</span><span>{d.cols[3]}</span>
        </div>
        {[
          { t: '16:42:08', s: 'crit', d: d.rows[0].d, st: d.rows[0].st },
          { t: '16:41:55', s: 'high', d: d.rows[1].d, st: d.rows[1].st },
          { t: '16:41:12', s: 'high', d: d.rows[2].d, st: d.rows[2].st },
          { t: '16:39:47', s: 'med',  d: d.rows[3].d, st: d.rows[3].st },
        ].map((r, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '70px 60px 1fr 80px',
            gap: 10, padding: '8px 14px', alignItems: 'center',
            fontSize: 11, borderTop: i ? '1px solid var(--line)' : 'none',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-4)' }}>{r.t}</span>
            <span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                height: 16, padding: '0 6px', fontSize: 9, fontWeight: 600,
                textTransform: 'uppercase', borderRadius: 4,
                color: `var(--${r.s})`, background: `var(--${r.s}-soft)`,
                fontFamily: 'var(--font-mono)',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: `var(--${r.s})` }}/>
                {r.s}
              </span>
            </span>
            <span style={{ color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.d}</span>
            <span style={{ fontSize: 10, color: 'var(--fg-3)' }}>{r.st}</span>
          </div>
        ))}
      </div>
    </DemoFrame>
  );
}

function DemoMitre() {
  const { t } = useLang();
  const d = t.demos.mitre;
  const [lit, setLit] = uS(0);
  uE(() => {
    const id = setInterval(() => setLit(l => l + 1), 90);
    return () => clearInterval(id);
  }, []);

  const tactics = d.tactics;
  const cellPattern = [2,1,3,9,3,1,5,6,2,4,7,1];
  return (
    <DemoFrame title="mitre-attack" live>
      <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{d.coverage}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)' }}>{Math.min(lit, 96)} {d.cellsLit}</span>
      </div>
      <div className="matrix-demo">
        {tactics.map((t, ti) => {
          const count = cellPattern[ti];
          return (
            <div key={ti} className="col">
              <div className="col-h">{t}</div>
              {Array.from({ length: count }).map((_, ci) => {
                const idx = ti * 8 + ci;
                const isLit = idx < lit;
                const cls = !isLit ? '' :
                  count >= 7 ? 'lit-crit' :
                  count >= 4 ? 'lit-hot' :
                  count >= 2 ? 'lit-warm' : '';
                return <div key={ci} className={`cell ${cls}`}/>;
              })}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 12, fontSize: 10, color: 'var(--fg-3)', justifyContent: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(242,85,85,0.58)' }}/> {d.legend[0]}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(242,85,85,0.32)' }}/> {d.legend[1]}
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 12, height: 8, borderRadius: 2, background: 'rgba(245,158,11,0.18)' }}/> {d.legend[2]}
        </span>
      </div>
    </DemoFrame>
  );
}

function DemoRisk() {
  const { t } = useLang();
  const d = t.demos.risk;
  const entities = [
    { id: 'jane.k@corp',     score: 142, threshold: 100, badge: 'JK', color: '#fb7185' },
    { id: 'svc-deploy-prod', score: 118, threshold: 100, badge: 'SD', color: '#fbbf24' },
    { id: 'prod-edge-04',    score:  96, threshold: 100, badge: 'P4', color: '#60a5fa' },
    { id: 'admin.root',      score:  82, threshold: 100, badge: 'AR', color: '#a78bfa' },
    { id: 'dc-east-01',      score:  64, threshold: 100, badge: 'DC', color: '#34d399' },
    { id: 'web-fr-02',       score:  41, threshold: 100, badge: 'WF', color: '#22d3ee' },
  ];
  return (
    <DemoFrame title="risk-based-alerting" live>
      <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{d.leaderboard}</span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--crit)' }}>{d.notables}</span>
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
        {entities.map((e, i) => {
          const pct = Math.min(180, (e.score / e.threshold) * 100);
          const overThreshold = e.score >= e.threshold;
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '22px 1fr 60px 1fr 50px',
              gap: 12, padding: '11px 14px', alignItems: 'center',
              fontSize: 11, borderTop: i ? '1px solid var(--line)' : 'none',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                background: e.color, color: '#0a0a0c',
                display: 'grid', placeItems: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              }}>{e.badge}</span>
              <span style={{ color: 'var(--fg)', fontWeight: 500 }}>{e.id}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontWeight: 500,
                color: overThreshold ? 'var(--crit)' : e.score >= 70 ? 'var(--high)' : 'var(--ok)',
              }}>{e.score}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ position: 'relative', flex: 1, height: 6, background: 'var(--surface-3)', borderRadius: 3, overflow: 'hidden' }}>
                  <span style={{
                    display: 'block', height: '100%',
                    width: `${Math.min(100, pct)}%`,
                    background: overThreshold ? 'linear-gradient(90deg, var(--high), var(--crit))' :
                                e.score >= 70 ? 'linear-gradient(90deg, var(--med), var(--high))' :
                                'linear-gradient(90deg, var(--ok), var(--med))',
                    borderRadius: 3,
                  }}/>
                </span>
                {overThreshold && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 600,
                    color: 'var(--crit)', background: 'var(--crit-soft)',
                    padding: '2px 5px', borderRadius: 3,
                  }}>{d.notable}</span>
                )}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-4)', textAlign: 'right' }}>
                {Math.round((e.score / e.threshold) * 100)}%
              </span>
            </div>
          );
        })}
      </div>
      <div style={{
        marginTop: 12,
        background: 'rgba(56,189,248,0.06)',
        border: '1px solid rgba(56,189,248,0.18)',
        borderRadius: 8, padding: '10px 14px',
        fontSize: 11.5, color: 'var(--fg-2)', lineHeight: 1.5,
      }}>
        {d.callout}
      </div>
    </DemoFrame>
  );
}

/* ── animated trend chart used in demo ── */
function TrendChart() {
  const [phase, setPhase] = uS(0);
  uE(() => {
    const id = setInterval(() => setPhase(p => p + 1), 100);
    return () => clearInterval(id);
  }, []);
  const data = Array.from({ length: 40 }, (_, i) => ({
    crit: Math.max(0, Math.sin((i + phase * 0.4) * 0.3) * 1 + 1),
    high: Math.max(0, Math.cos((i + phase * 0.3) * 0.2) * 3 + 3),
    med:  Math.max(0, Math.sin((i + phase * 0.5) * 0.15) * 6 + 7),
    low:  Math.max(0, Math.cos((i + phase * 0.2) * 0.1) * 10 + 12),
  }));
  const W = 540, H = 120;
  const max = Math.max(...data.map(d => d.crit + d.high + d.med + d.low)) || 1;
  const stepX = W / (data.length - 1);
  const series = [
    { key: 'low',  v: (d) => d.low + d.med + d.high + d.crit, color: 'var(--low)' },
    { key: 'med',  v: (d) => d.med + d.high + d.crit,         color: 'var(--med)' },
    { key: 'high', v: (d) => d.high + d.crit,                 color: 'var(--high)' },
    { key: 'crit', v: (d) => d.crit,                          color: 'var(--crit)' },
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 110, display: 'block' }}>
      {series.map((s, si) => {
        const top = data.map((d, i) => `${i * stepX},${H - (s.v(d) / max) * H}`).join(' ');
        return (
          <polyline key={si} points={`${top} ${W},${H} 0,${H}`}
                    fill={s.color} fillOpacity="0.22" stroke={s.color} strokeWidth="1.2" strokeOpacity="0.85"/>
        );
      })}
    </svg>
  );
}

/* ── threat ticker ── */
function Ticker() {
  const { t } = useLang();
  const meta = [
    { s: 'crit', t: '16:42:08', a: 'prod-edge-04' },
    { s: 'high', t: '16:41:55', a: 'dc-east-01' },
    { s: 'high', t: '16:41:12', a: 'prod-app-12' },
    { s: 'med',  t: '16:39:47', a: 'web-fr-02' },
    { s: 'low',  t: '16:38:21', a: 'jumpbox-prod' },
    { s: 'ok',   t: '16:37:03', a: 'soar' },
    { s: 'crit', t: '16:36:18', a: 'aws-cloudtrail' },
    { s: 'med',  t: '16:35:09', a: 'mail-relay-02' },
    { s: 'high', t: '16:34:42', a: 'win-vdi-031' },
    { s: 'ok',   t: '16:33:55', a: 'ueba' },
  ];
  const items = meta.map((m, i) => ({ ...m, d: t.ticker[i] }));
  const stream = [...items, ...items];
  return (
    <section className="ticker">
      <div className="ticker-track">
        {stream.map((it, i) => (
          <span key={i} className="ticker-item">
            <span className={`sev ${it.s}`}/>
            <span className="t">{it.t}</span>
            <b>{it.d}</b>
            <span>· {it.a}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

/* ── comparison ── */
function Compare() {
  const { t } = useLang();
  const rows = t.compare.rows;
  return (
    <section className="section" style={{ paddingTop: 80 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.compare.eyebrow}</div>
          <h2><Lines a={t.compare.h2}/></h2>
        </div>
        <div className="compare reveal" data-delay="1">
          <div className="compare-row head">
            <span>{t.compare.head[0]}</span>
            <span className="us">{t.compare.head[1]}</span>
            <span>{t.compare.head[2]}</span>
            <span>{t.compare.head[3]}</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} className="compare-row">
              <span className="compare-feat">{r.f}</span>
              <span className="compare-cell us">{IC.check} {r.us}</span>
              <span className="compare-cell legacy">{IC.x} {r.l}</span>
              <span className="compare-cell diy">{IC.x} {r.d}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── testimonials ── */
function Testimonials() {
  const { t } = useLang();
  const fixed = [
    { big: true, name: 'Maria Reyes', av: 'MR' },
    { name: 'Alex Park', av: 'AP' },
    { name: 'Liam Chen', av: 'LC' },
  ];
  const items = t.testimonials.items.map((it, i) => ({ ...fixed[i], ...it }));
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.testimonials.eyebrow}</div>
          <h2><Lines a={t.testimonials.h2}/></h2>
        </div>
        <div className="quotes-grid">
          {items.map((q, i) => (
            <div key={i} className={`quote ${q.big ? 'big' : ''} reveal`} data-delay={i + 1}>
              <span className="stars">
                {Array.from({ length: 5 }).map((_, j) => <span key={j}>{IC.star}</span>)}
              </span>
              <p className="quote-text">{q.text}</p>
              <div className="quote-by">
                <span className="quote-avatar">{q.av}</span>
                <span className="quote-meta">
                  <b>{q.name}</b>
                  <span>{q.role}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── pricing ── */
function Pricing() {
  const { t } = useLang();
  const plans = t.pricing.plans;
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.pricing.eyebrow}</div>
          <h2><Lines a={t.pricing.h2}/></h2>
          <p className="lede center" style={{ marginTop: 16 }}>
            {t.pricing.lede}
          </p>
        </div>
        <div className="pricing-grid">
          {plans.map((p, i) => {
            const featured = i === 1;
            return (
            <div key={i} className={`plan ${featured ? 'featured' : ''} reveal`} data-delay={i + 1}>
              {featured && <span className="plan-badge">{t.pricing.badge}</span>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.price}<span className="unit">{p.unit}</span></div>
              <div className="plan-tagline">{p.tag}</div>
              <a className={`btn ${featured ? 'btn-primary' : 'btn-secondary'} plan-cta`} href="#cta">
                {p.cta} {IC.arrow}
              </a>
              <ul className="plan-features">
                {p.features.map((f, j) => (
                  <li key={j}>{IC.check}<span>{typeof f === 'string' ? f : <b>{f.b}</b>}</span></li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── final CTA ── */
function FinalCTA() {
  const { t } = useLang();
  return (
    <section id="cta">
      <div className="container">
        <div className="finalcta reveal">
          <div className="finalcta-bg"/>
          <div className="finalcta-inner">
            <div className="eyebrow">{t.finalcta.eyebrow}</div>
            <h2><Lines a={t.finalcta.h2}/></h2>
            <p className="lede" style={{ marginTop: 18 }}>
              {t.finalcta.lede}
            </p>
            <div className="ctas" style={{ marginTop: 32 }}>
              <a className="btn btn-primary" href="#">{t.finalcta.demo} {IC.arrow}</a>
              <a className="btn btn-secondary" href="#">{t.finalcta.trial}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── footer ── */
function Footer() {
  const { t } = useLang();
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="nav-brand" href="#">
              <span className="nav-brand-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
              </span>
              CoreNest
            </a>
            <p>{t.footer.tagline}</p>
          </div>
          {t.footer.cols.map((col, ci) => (
            <div className="foot-col" key={ci}>
              <h5>{col.title}</h5>
              {col.links.map((lk, li) => (
                <a href={lk.href} key={li}>{lk.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>{t.footer.bottom}</span>
          <div className="foot-socials">
            <a href="#" title="Twitter">{IC.twitter}</a>
            <a href="#" title="GitHub">{IC.github}</a>
            <a href="#" title="LinkedIn">{IC.linkedin}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── AI triage spotlight: case card with a streamed LLM summary ── */
function AITriageCard() {
  const { t } = useLang();
  const c = t.ai.card;
  const segs = c.segs;
  const total = segs.reduce((n, s) => n + s.text.length, 0);
  const [n, setN] = uS(0);
  uE(() => {
    let to;
    const tick = () => {
      setN(p => (p >= total + 26 ? 0 : p + 2));
      to = setTimeout(tick, 24);
    };
    to = setTimeout(tick, 24);
    return () => clearTimeout(to);
  }, [total]);

  let rem = n;
  const sliced = segs.map(s => {
    const show = Math.max(0, Math.min(s.text.length, rem));
    const typing = rem > 0 && rem < s.text.length;
    rem -= s.text.length;
    return { ...s, vis: s.text.slice(0, show), typing };
  });

  return (
    <div className="ai-card">
      <div className="hero-scope-bar">
        <span className="dots"><i/><i/><i/></span>
        <span className="title">corenest / case&nbsp;#4827</span>
        <span className="live">LIVE</span>
      </div>
      <div className="ai-case">
        <div className="ai-case-row">
          <span className="sev-badge crit">{c.sevBadge}</span>
          <span className="ai-case-title">{c.title}</span>
        </div>
        <div className="ai-case-meta">
          {c.meta.map((m, i) => <span key={i}>{m}</span>)}
        </div>
      </div>
      <div className="ai-panel">
        <div className="ai-panel-h">
          <span className="ai-spark">{IC.sparkle}</span>
          {c.panelH}
          <span className="ai-model">{c.model}</span>
        </div>
        {sliced.map((s, i) => (
          <div className="ai-seg" key={i}>
            <span className={`ai-seg-k ${s.c}`}>{s.k}</span>
            <span className="ai-seg-t">{s.vis}{s.typing && <span className="ai-cursor"/>}</span>
          </div>
        ))}
        <div className="ai-actions">
          <span className="ai-btn primary">{IC.lock} {c.actions[0]}</span>
          <span className="ai-btn">{c.actions[1]}</span>
          <span className="ai-btn">{c.actions[2]}</span>
        </div>
      </div>
    </div>
  );
}

function AITriage() {
  const { t } = useLang();
  return (
    <section className="section" id="ai" style={{ paddingTop: 48 }}>
      <div className="container">
        <div className="spotlight-grid">
          <div className="reveal">
            <div className="eyebrow">{t.ai.eyebrow}</div>
            <h2><Lines a={t.ai.h2}/></h2>
            <p className="lede" style={{ marginTop: 16 }}>
              <Rich a={t.ai.lede}/>
            </p>
            <ul className="spotlight-list">
              {t.ai.bullets.map((bl, i) => (
                <li key={i}>{IC.check}<span><b>{bl.b}</b>{bl.t}</span></li>
              ))}
            </ul>
            <div style={{ marginTop: 28 }}>
              <a className="btn btn-primary" href="#cta">{t.ai.cta} {IC.arrow}</a>
            </div>
          </div>
          <div className="reveal" data-delay="1">
            <AITriageCard/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── detection & rule engine ── */
function DetectionEngine() {
  const { t } = useLang();
  const dt = t.detection;
  const packs = [
    { name: 'Active Directory', src: 'security 4624–4769', n: 412 },
    { name: 'IIS',              src: 'w3c access logs',    n: 168 },
    { name: 'MSSQL',            src: 'audit + error log',  n: 134 },
    { name: 'Apache',           src: 'access + error',     n: 156 },
    { name: 'Postfix',          src: 'maillog',            n: 92  },
    { name: 'sshd',             src: 'auth / secure',      n: 118 },
  ];
  return (
    <section className="section" id="detection" style={{ paddingTop: 64 }}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: 'left', maxWidth: 760, margin: '0 0 48px' }}>
          <div className="eyebrow muted">{dt.eyebrow}</div>
          <h2><Lines a={dt.h2}/></h2>
          <p className="lede" style={{ marginTop: 16 }}>
            <Rich a={dt.lede}/>
          </p>
        </div>
        <div className="det-grid">
          <div className="reveal">
            <div className="det-chips">
              {dt.chips.map((ch, i) => <span className="det-chip" key={i}>{ch}</span>)}
            </div>
            <div className="det-bignum">{dt.bignum}<span>+</span></div>
            <p className="det-cap">{dt.bignumCap}</p>
            <div className="det-engines">
              <div className="det-engine">
                <span className="det-engine-k">{IC.flask} {dt.engines[0].k}</span>
                <span>{dt.engines[0].v}</span>
              </div>
              <div className="det-engine">
                <span className="det-engine-k">{IC.search} {dt.engines[1].k}</span>
                <span>{dt.engines[1].v}</span>
              </div>
            </div>
          </div>
          <div className="reveal" data-delay="1">
            <div className="packs-card">
              <div className="hero-scope-bar">
                <span className="dots"><i/><i/><i/></span>
                <span className="title">corenest / rule-packs</span>
                <span className="live">LIVE</span>
              </div>
              <div className="packs-body">
                <div className="packs-head">
                  <span>{dt.packsHead[0]}</span>
                  <span>{dt.packsHead[1]}</span>
                </div>
                {packs.map((p, i) => (
                  <div className="pack-row" key={i}>
                    <span className="pack-dot"/>
                    <span className="pack-name">{p.name}</span>
                    <span className="pack-src">{p.src}</span>
                    <span className="pack-n">{p.n}</span>
                  </div>
                ))}
                <div className="eps-meter">
                  <div className="eps-top">
                    <span>{dt.epsTop}</span>
                    <span className="eps-v">{dt.epsV} <i>EPS</i></span>
                  </div>
                  <div className="eps-bar"><span/></div>
                  <div className="eps-foot">{dt.epsFoot}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── full-platform capability map ── */
function CapabilityMap() {
  const { t } = useLang();
  const groupIcons = [IC.rss, IC.zap, IC.chip, IC.scale];
  const itemIcons = [
    [IC.rss, IC.shield, IC.bug, IC.swirl],
    [IC.lock, IC.shield, IC.eye, IC.zap],
    [IC.file, IC.chip, IC.search, IC.bellOff],
    [IC.compass, IC.search, IC.file, IC.scale],
  ];
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.capabilities.eyebrow}</div>
          <h2><Lines a={t.capabilities.h2}/></h2>
          <p className="lede center" style={{ marginTop: 16 }}>
            {t.capabilities.lede}
          </p>
        </div>
        {t.capabilities.groups.map((g, gi) => (
          <div className="capgroup reveal" key={gi}>
            <div className="capgroup-h">
              <span className="capgroup-ic">{groupIcons[gi]}</span>
              <h3>{g.label}</h3>
              <span className="capgroup-rule"/>
              <span className="capgroup-ct">{g.items.length} {t.capabilities.caps}</span>
            </div>
            <div className="cap-grid">
              {g.items.map((it, i) => (
                <article className="feature" key={i}>
                  <div className="feature-icon">{itemIcons[gi][i]}</div>
                  <h3>{it.t}</h3>
                  <p>{it.b}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── platform architecture ── */
function Architecture() {
  const { t } = useLang();
  const names = ['WatchNode', 'WatchTower', 'WatchVault', 'CoreNest'];
  const nodeIcons = [IC.chip, IC.server, IC.database, IC.compass];
  const nodes = t.architecture.nodes.map((n, i) => ({ ...n, name: names[i], icon: nodeIcons[i] }));
  const cardIcons = [IC.zap, IC.server, IC.box];
  const cards = t.architecture.cards.map((c, i) => ({ ...c, icon: cardIcons[i] }));
  return (
    <section className="section" id="architecture" style={{ paddingTop: 48 }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.architecture.eyebrow}</div>
          <h2><Lines a={t.architecture.h2}/></h2>
        </div>
        <div className="arch-flow reveal">
          {nodes.map((n, i) => (
            <React.Fragment key={i}>
              <div className="arch-node">
                <div className="arch-node-h">
                  <span className="arch-node-ic">{n.icon}</span>
                  <span className="arch-node-role">{n.role}</span>
                </div>
                <div className="arch-node-name">{n.name}</div>
                <p>{n.desc}</p>
              </div>
              {i < nodes.length - 1 && <div className="arch-arrow"><span>gRPC</span>{IC.arrow}</div>}
            </React.Fragment>
          ))}
        </div>
        <div className="arch-cards reveal" data-delay="1">
          {cards.map((c, i) => (
            <div className="arch-card" key={i}>
              <div className="feature-icon">{c.icon}</div>
              <div>
                <h3>{c.t}</h3>
                <p>{c.b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── App ── */
function Site() {
  useReveal();
  return (
    <>
      <Nav/>
      <Hero/>
      <Trust/>
      <Stats/>
      <Showcase/>
      <AITriage/>
      <Features/>
      <DetectionEngine/>
      <CapabilityMap/>
      <Architecture/>
      <Ticker/>
      <Compare/>
      <Testimonials/>
      <Pricing/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('site-root')).render(
  <LangProvider><Site/></LangProvider>
);
