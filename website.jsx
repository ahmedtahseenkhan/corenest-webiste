/* eslint-disable */
// website.jsx — CoreNest marketing site
// One-file React app. Composes hero (live dashboard shot), stats, scroll statement, product showcase, AI triage, hover-expand
// features, detection, stacked platform cards, architecture, ticker,
// comparison, FAQ, demo request form, and footer. Motion patterns are ported
// from Skiper UI (skiper-ui.com) to plain React + CSS.

const { useState: uS, useEffect: uE, useRef: uR, useContext: uC } = React;

/* ── tiny icon helper (subset of product I, redrawn for marketing) ── */
const Ico = ({ d, children, size = 16, stroke = 1.6, fill = 'none' }) => (
  <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
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
};

/* ── i18n: copy dictionary (en + tr) ──
   Keep copy short: one idea per line, visuals do the rest. */
const STR = {
  en: {
    meta: {
      title: 'CoreNest — Catch what legacy SIEMs miss.',
      desc: 'The SIEM built for modern SOCs. 90% less alert noise, an 18-minute MTTR, and a MITRE matrix that actually maps to your detections.',
    },
    nav: { product: 'Product', features: 'Features', platform: 'Platform', faq: 'FAQ', demo: 'Book a demo' },
    hero: {
      eyebrow: 'CoreNest v4.2 · now with AI triage',
      title: [{ t: 'Catch what', br: true }, { t: 'legacy SIEMs', cls: 'strike' }, { t: ' ' }, { t: 'miss.', cls: 'accent' }],
      sub: ['The SIEM for modern SOCs. ', { b: '90% less alert noise' }, ' and an 18-minute MTTR.'],
      demo: 'Book a demo', tour: 'Watch product tour',
      micro: ['Free 14-day trial', 'Live in 30 minutes', 'No credit card'],
      chips: ['+24 alerts in last 60s', 'jane.k · risk 142', 'MTTR 18min', 'MITRE T1059 +4'],
      shot: { src: '/assets/dashboard-en.webp', alt: 'CoreNest overview dashboard', path: 'corenest / overview', badge: '' },
    },
    stats: [
      { sub: 'K', b: 'events / sec' },
      { sub: '+', b: 'detection rules' },
      { sub: '%', b: 'less alert noise' },
      { sub: 'min', b: 'average MTTR' },
    ],
    statement: {
      lines: ['Less noise.', 'Faster response.'],
      sub: ['187', 'raw alerts', '2', 'notables'],
    },
    features: {
      eyebrow: 'What you get',
      h2: ['One platform.', 'Every capability.'],
      items: [
        { title: 'Risk-based alerting', line: 'Notables fire only when entity risk crosses your threshold.', stat: '90%', statL: 'less noise' },
        { title: 'MITRE ATT&CK', line: 'Every detection mapped to a technique. Gaps visible at a glance.', stat: '12/12', statL: 'tactics covered' },
        { title: 'UEBA', line: 'Baselines per identity and host. Anomalies with zero rules.', stat: '4.2σ', statL: 'deviation flagged' },
        { title: 'Threat hunting', line: 'KQL search across raw events. Save and share hunts.', stat: 'KQL', statL: 'familiar syntax' },
        { title: 'SOAR playbooks', line: '40+ playbooks: block IPs, isolate hosts, revoke sessions.', stat: '2.3s', statL: 'to contain' },
        { title: 'Compliance hub', line: 'ISO 27001, SOC 2, HIPAA, PCI and GDPR with live posture scores.', stat: '290', statL: 'control-tagged rules' },
      ],
    },
    showcase: {
      eyebrow: 'The product',
      h2: ['Built for every shift.'],
      tour: 'See full product tour',
      items: [
        { name: 'Overview', desc: 'KPIs, severity and live alerts at a glance.' },
        { name: 'Alerts & Incidents', desc: 'A severity-banded triage queue with one-click investigation.' },
        { name: 'MITRE ATT&CK matrix', desc: 'A coverage heatmap across all 12 tactics.' },
        { name: 'Risk-based alerting', desc: 'Entity scores that fire only real notables.' },
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
        callout: '2 notables instead of 187 raw alerts — 90% less noise.',
      },
    },
    ticker: ['PowerShell encoded payload', 'Brute-force domain admin', 'C2 beaconing to 185.220.101.7', 'Unusual login geo · jane.k', 'Scheduled task by SYSTEM', 'Containment playbook succeeded · 2.3s', 'IAM key exposure detected', 'MITRE T1071 · app-layer C2', 'Privilege escalation attempt', 'UEBA model retrained · jane.k'],
    compare: {
      eyebrow: 'Why teams switch',
      h2: ['CoreNest vs. legacy SIEM', 'and DIY ELK.'],
      head: ['Capability', 'CoreNest', 'Legacy SIEM', 'DIY ELK'],
      rows: [
        { f: 'Time to first alert', us: 'under 30 min', l: 'days–weeks', d: 'weeks' },
        { f: 'Risk-based noise reduction', us: '~90%', l: 'not available', d: 'DIY' },
        { f: 'MITRE ATT&CK matrix view', us: 'native, dynamic', l: 'add-on', d: 'manual' },
        { f: 'UEBA out of the box', us: 'yes', l: 'separate SKU', d: 'no' },
        { f: 'Setup engineering', us: '0.5 FTE', l: '2–3 FTE', d: '4+ FTE' },
      ],
    },
    finalcta: {
      eyebrow: 'Ready when you are',
      h2: ['Stop triaging noise.', 'Start hunting threats.'],
      lede: 'A 30-minute walkthrough on your own data, or a free 14-day trial.',
    },
    form: {
      name: 'Full name', email: 'Work email', company: 'Company',
      interest: "I'm interested in", interests: ['A 30-minute demo', 'A free 14-day trial'],
      message: 'Anything we should know? (optional)',
      submit: 'Send request', sending: 'Sending…',
      note: ['We only use these details to answer your request. See our ', 'Privacy Policy', '.'],
      error: 'Something went wrong. Please try again in a moment.',
    },
    faq: {
      eyebrow: 'FAQ',
      h2: ['Questions,', 'answered.'],
      items: [
        { q: 'What is CoreNest?', a: 'A SIEM for security operations teams. It collects logs and endpoint telemetry, runs 3,000+ detection rules mapped to MITRE ATT&CK, and turns alerts into cases with AI triage.' },
        { q: 'How long does setup take?', a: 'Most teams see their first alerts in under 30 minutes. Agents run on Windows, Linux and macOS, and cloud sources connect in one click.' },
        { q: 'Does AI triage send our data outside?', a: 'Only if you choose a cloud model. You can run triage on a local Ollama model inside your own network, so nothing leaves it.' },
        { q: 'Can we use our existing Sigma rules?', a: 'Yes. A second engine runs community Sigma rules unmodified, next to the native CoreNest ruleset.' },
        { q: 'Is there a free trial?', a: 'Yes: 14 days, no credit card. Choose "free trial" in the form below.' },
        { q: 'How is CoreNest priced?', a: 'Pricing depends on your environment. Request a demo and we will prepare a quote for you.' },
      ],
    },
    footer: {
      tagline: 'Modern SIEM for modern SOCs.',
      cols: [
        { title: 'Product', links: [{ label: 'AI triage', href: '#ai' }, { label: 'Detection & Sigma', href: '#detection' }, { label: 'Platform', href: '#platform' }, { label: 'Architecture', href: '#architecture' }] },
        { title: 'Company', links: [{ label: 'FAQ', href: '#faq' }, { label: 'Request a demo', href: '#cta' }, { label: 'Privacy Policy', href: '/privacy' }] },
      ],
      cookies: 'Cookie settings',
      bottom: '© 2026 CoreNest, Inc. SOC 2 Type II · ISO 27001 · GDPR',
      credit: 'Components by Skiper UI',
    },
    ai: {
      eyebrow: 'New · AI triage',
      h2: ['AI writes the case', 'before you open it.'],
      lede: ['Claude in the cloud or a local Ollama model reads the raw events and writes a ', { b: 'WHAT / WHY / NEXT STEP' }, ' summary.'],
      bullets: ['What happened', 'Why it matters', 'What to do next', 'Runs fully offline'],
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
      lede: ['Native rules plus unmodified ', { b: 'Sigma' }, ' — proven at ', { b: '850,000 EPS' }, '.'],
      chips: ['By tactic', 'By source', 'By framework'],
      bignumCap: 'native rules, each mapped to MITRE.',
      engines: [{ k: 'Primary engine', v: 'Native CoreNest rules · 3,000+' }, { k: 'Secondary engine', v: 'Community Sigma rules, run as-is' }],
      packsHead: ['Per-role detection content', 'turnkey + setup guide'],
      bignum: '3,000',
      epsTop: 'Sustained throughput', epsV: '850,000', epsFoot: 'full 3k ruleset loaded · zero drop',
    },
    capabilities: {
      eyebrow: 'The full platform',
      h2: ['Detection is the start.', "Here's everything else."],
      caps: 'capabilities',
      groups: [
        { label: 'Threat intelligence', line: 'Every event enriched before an analyst sees it.',
          items: ['7 live threat-intel feeds', 'VirusTotal enrichment', 'Vulnerability detection', 'Behavioral UEBA'] },
        { label: 'Endpoint response', line: 'Contain threats in one click — before encryption spreads.',
          items: ['One-click host isolation', 'Ransomware canaries', 'In-memory YARA', 'Active Response'] },
        { label: 'Endpoint telemetry', line: 'Full host visibility from one lightweight agent.',
          items: ['File integrity + whodata', 'Registry, process & network', 'osquery · SCA · Rootcheck', 'Containers & silent sources'] },
        { label: 'Investigate & comply', line: 'Cases, audit trail and reports — no Jira required.',
          items: ['Native case management', 'Config audit log', 'Scheduled PDF reports', '290 control-tagged rules'] },
      ],
    },
    architecture: {
      eyebrow: 'Platform & deployment',
      h2: ['Four services.', 'One pipeline.'],
      nodes: [
        { role: 'Agent', desc: 'Endpoint collector' },
        { role: 'Manager', desc: 'Rules & correlation' },
        { role: 'Indexer', desc: 'Storage & search' },
        { role: 'Dashboard', desc: 'Analyst console' },
      ],
      chips: ['gRPC everywhere', 'Zero-downtime HA', 'Fleet rollout to thousands'],
    },
  },
  tr: {
    meta: {
      title: "CoreNest — Eski SIEM'lerin kaçırdığını yakalayın.",
      desc: "Modern SOC'lar için geliştirilen SIEM. %90 daha az uyarı gürültüsü, 18 dakikalık MTTR ve tespitlerinizle gerçekten eşleşen bir MITRE matrisi.",
    },
    nav: { product: 'Ürün', features: 'Özellikler', platform: 'Platform', faq: 'SSS', demo: 'Demo planla' },
    hero: {
      eyebrow: 'CoreNest v4.2 · artık yapay zekâ triyajı ile',
      title: [{ t: "Eski SIEM'lerin", cls: 'strike', br: true }, { t: 'kaçırdığını ' }, { t: 'yakalayın.', cls: 'accent' }],
      sub: ["Modern SOC'lar için SIEM. ", { b: '%90 daha az uyarı gürültüsü' }, ' ve 18 dakikalık MTTR.'],
      demo: 'Demo planla', tour: 'Ürün turunu izle',
      micro: ['14 gün ücretsiz deneme', '30 dakikada kurulum', 'Kredi kartı gerekmez'],
      chips: ["son 60 sn'de +24 uyarı", 'jane.k · risk 142', 'MTTR 18dk', 'MITRE T1059 +4'],
      shot: { src: '/assets/dashboard-ar.webp', alt: 'CoreNest genel bakış panosu, Arapça arayüz', path: 'corenest / genel bakış', badge: 'Arapça · RTL arayüz' },
    },
    stats: [
      { sub: 'K', b: 'olay / sn' },
      { sub: '+', b: 'tespit kuralı' },
      { sub: '%', b: 'daha az uyarı gürültüsü' },
      { sub: 'dk', b: 'ortalama MTTR' },
    ],
    statement: {
      lines: ['Az gürültü.', 'Hızlı müdahale.'],
      sub: ['187', 'ham uyarı', '2', 'önemli uyarı'],
    },
    features: {
      eyebrow: 'Neler elde edersiniz',
      h2: ['Tek platform.', 'Tüm yetenekler.'],
      items: [
        { title: 'Risk tabanlı uyarı', line: 'Önemli uyarılar yalnızca varlık riski eşiği aştığında tetiklenir.', stat: '%90', statL: 'daha az gürültü' },
        { title: 'MITRE ATT&CK', line: 'Her tespit bir tekniğe eşlenir. Boşluklar bir bakışta görünür.', stat: '12/12', statL: 'taktik kapsandı' },
        { title: 'UEBA', line: 'Her kimlik ve sunucu için temel çizgi. Kural yazmadan anomali.', stat: '4.2σ', statL: 'sapma işaretlendi' },
        { title: 'Tehdit avı', line: 'Ham olaylarda KQL ile arama. Avları kaydedin ve paylaşın.', stat: 'KQL', statL: 'tanıdık söz dizimi' },
        { title: 'SOAR senaryoları', line: '40+ senaryo: IP engelleyin, sunucu izole edin, oturum iptal edin.', stat: '2.3sn', statL: 'sınırlama süresi' },
        { title: 'Uyumluluk merkezi', line: 'Canlı duruş puanlarıyla ISO 27001, SOC 2, HIPAA, PCI ve GDPR.', stat: '290', statL: 'kontrol etiketli kural' },
      ],
    },
    showcase: {
      eyebrow: 'Ürün',
      h2: ['Her vardiya için tasarlandı.'],
      tour: 'Tüm ürün turunu görün',
      items: [
        { name: 'Genel bakış', desc: "KPI'lar, önem derecesi ve canlı uyarılar tek bakışta." },
        { name: 'Uyarılar ve Olaylar', desc: 'Tek tıkla incelemeli, önem derecesine göre triyaj kuyruğu.' },
        { name: 'MITRE ATT&CK matrisi', desc: '12 taktiğin tamamında kapsam ısı haritası.' },
        { name: 'Risk tabanlı uyarı', desc: 'Yalnızca gerçek önemli uyarıları tetikleyen varlık puanları.' },
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
        callout: '187 ham uyarı yerine 2 önemli uyarı — %90 daha az gürültü.',
      },
    },
    ticker: ['PowerShell kodlanmış yük', 'Etki alanı yöneticisine kaba kuvvet', "185.220.101.7'ye C2 sinyali", 'Olağandışı oturum konumu · jane.k', 'SYSTEM tarafından zamanlanmış görev', 'Sınırlama senaryosu başarılı · 2.3s', 'IAM anahtarı ifşası tespit edildi', 'MITRE T1071 · uygulama katmanı C2', 'Yetki yükseltme girişimi', 'UEBA modeli yeniden eğitildi · jane.k'],
    compare: {
      eyebrow: 'Ekipler neden geçiyor',
      h2: ["CoreNest, eski SIEM'ler", 've kendin-yap ELK karşısında.'],
      head: ['Yetenek', 'CoreNest', 'Eski SIEM', 'Kendin-Yap ELK'],
      rows: [
        { f: 'İlk uyarıya kadar süre', us: '30 dk altı', l: 'günler–haftalar', d: 'haftalar' },
        { f: 'Risk tabanlı gürültü azaltma', us: '~%90', l: 'mevcut değil', d: 'kendin yap' },
        { f: 'MITRE ATT&CK matris görünümü', us: 'yerel, dinamik', l: 'eklenti', d: 'manuel' },
        { f: 'Kutudan çıkar çıkmaz UEBA', us: 'evet', l: 'ayrı lisans', d: 'hayır' },
        { f: 'Kurulum mühendisliği', us: '0.5 FTE', l: '2–3 FTE', d: '4+ FTE' },
      ],
    },
    finalcta: {
      eyebrow: 'Hazır olduğunuzda',
      h2: ['Gürültüyü triyaj etmeyi bırakın.', 'Tehdit avına başlayın.'],
      lede: 'Kendi verilerinizle 30 dakikalık bir tanıtım ya da 14 günlük ücretsiz deneme.',
    },
    form: {
      name: 'Ad soyad', email: 'İş e-postası', company: 'Şirket',
      interest: 'İlgilendiğim', interests: ['30 dakikalık demo', '14 günlük ücretsiz deneme'],
      message: 'Eklemek istedikleriniz (isteğe bağlı)',
      submit: 'Talebi gönder', sending: 'Gönderiliyor…',
      note: ['Bu bilgileri yalnızca talebinizi yanıtlamak için kullanırız. Ayrıntılar: ', 'Gizlilik Politikası', '.'],
      error: 'Bir sorun oluştu. Lütfen biraz sonra tekrar deneyin.',
    },
    faq: {
      eyebrow: 'SSS',
      h2: ['Merak', 'edilenler.'],
      items: [
        { q: 'CoreNest nedir?', a: 'Güvenlik operasyon ekipleri için bir SIEM. Günlükleri ve uç nokta telemetrisini toplar, MITRE ATT&CK ile eşlenmiş 3.000+ tespit kuralı çalıştırır ve yapay zekâ triyajıyla uyarıları vakaya dönüştürür.' },
        { q: 'Kurulum ne kadar sürer?', a: 'Çoğu ekip ilk uyarılarını 30 dakikadan kısa sürede görür. Ajanlar Windows, Linux ve macOS üzerinde çalışır; bulut kaynakları tek tıkla bağlanır.' },
        { q: 'Yapay zekâ triyajı verilerimizi dışarı gönderir mi?', a: 'Yalnızca bulut modeli seçerseniz. Triyajı kendi ağınızdaki yerel bir Ollama modeliyle çalıştırabilirsiniz; böylece hiçbir veri ağınızdan çıkmaz.' },
        { q: 'Mevcut Sigma kurallarımızı kullanabilir miyiz?', a: 'Evet. İkinci bir motor, topluluk Sigma kurallarını yerel CoreNest kural setinin yanında olduğu gibi çalıştırır.' },
        { q: 'Ücretsiz deneme var mı?', a: 'Evet: 14 gün, kredi kartı gerekmez. Aşağıdaki formda “ücretsiz deneme”yi seçin.' },
        { q: 'Fiyatlandırma nasıl?', a: 'Fiyat ortamınıza göre belirlenir. Demo talep edin, size özel bir teklif hazırlayalım.' },
      ],
    },
    footer: {
      tagline: "Modern SOC'lar için modern SIEM.",
      cols: [
        { title: 'Ürün', links: [{ label: 'Yapay zekâ triyajı', href: '#ai' }, { label: 'Tespit & Sigma', href: '#detection' }, { label: 'Platform', href: '#platform' }, { label: 'Mimari', href: '#architecture' }] },
        { title: 'Şirket', links: [{ label: 'SSS', href: '#faq' }, { label: 'Demo talep edin', href: '#cta' }, { label: 'Gizlilik Politikası', href: '/privacy' }] },
      ],
      cookies: 'Çerez ayarları',
      bottom: '© 2026 CoreNest, Inc. SOC 2 Type II · ISO 27001 · GDPR',
      credit: 'Bileşenler: Skiper UI',
    },
    ai: {
      eyebrow: 'Yeni · yapay zekâ triyajı',
      h2: ['Yapay zekâ vakayı', 'siz açmadan yazar.'],
      lede: ['Buluttaki Claude veya yerel bir Ollama modeli ham olayları okur ve ', { b: 'NE / NEDEN / SONRAKİ ADIM' }, ' özetini yazar.'],
      bullets: ['Ne oldu', 'Neden önemli', 'Sırada ne var', 'Tamamen çevrimdışı'],
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
      lede: ['Yerel kurallar ve olduğu gibi çalışan ', { b: 'Sigma' }, ' — ', { b: '850.000 EPS' }, ' ile kanıtlandı.'],
      chips: ['Taktiğe göre', 'Kaynağa göre', 'Çerçeveye göre'],
      bignumCap: 'yerel kural, her biri MITRE ile eşlenmiş.',
      engines: [{ k: 'Birincil motor', v: 'Yerel CoreNest kuralları · 3.000+' }, { k: 'İkincil motor', v: 'Topluluk Sigma kuralları, olduğu gibi' }],
      packsHead: ['Role özel tespit içeriği', 'anahtar teslim + kurulum kılavuzu'],
      bignum: '3.000',
      epsTop: 'Sürekli işlem hacmi', epsV: '850.000', epsFoot: 'tüm 3k kural seti yüklü · sıfır kayıp',
    },
    capabilities: {
      eyebrow: 'Platformun tamamı',
      h2: ['Tespit yalnızca başlangıç.', 'İşte geri kalan her şey.'],
      caps: 'yetenek',
      groups: [
        { label: 'Tehdit istihbaratı', line: 'Her olay, analist görmeden önce zenginleştirilir.',
          items: ['7 canlı istihbarat beslemesi', 'VirusTotal zenginleştirme', 'Güvenlik açığı tespiti', 'Davranışsal UEBA'] },
        { label: 'Uç nokta müdahalesi', line: 'Tehditleri tek tıkla durdurun — şifreleme yayılmadan önce.',
          items: ['Tek tıkla izolasyon', 'Fidye yazılımı tuzakları', 'Bellek içi YARA', 'Aktif Müdahale'] },
        { label: 'Uç nokta telemetrisi', line: 'Tek hafif ajandan tam sunucu görünürlüğü.',
          items: ['Dosya bütünlüğü + whodata', 'Kayıt defteri, süreç & ağ', 'osquery · SCA · Rootcheck', 'Konteynerler & sessiz kaynaklar'] },
        { label: 'İnceleme & uyumluluk', line: 'Vakalar, denetim izi ve raporlar — Jira gerekmez.',
          items: ['Yerel vaka yönetimi', 'Yapılandırma denetim günlüğü', 'Zamanlanmış PDF raporları', '290 kontrol etiketli kural'] },
      ],
    },
    architecture: {
      eyebrow: 'Platform & dağıtım',
      h2: ['Dört servis.', 'Tek hat.'],
      nodes: [
        { role: 'Ajan', desc: 'Uç nokta toplayıcı' },
        { role: 'Yönetici', desc: 'Kurallar & ilişkilendirme' },
        { role: 'Dizinleyici', desc: 'Depolama & arama' },
        { role: 'Pano', desc: 'Analist konsolu' },
      ],
      chips: ['Her yerde gRPC', 'Sıfır kesintili HA', 'Binlerce makineye dağıtım'],
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

/* ── scroll progress (framer-motion's useScroll, without the library) ──
   Calls apply(p, el) with p in 0..1 as `el` scrolls. 'stick' runs from the
   element's top reaching the viewport top to its bottom reaching the viewport
   bottom; 'enter' from its top entering the viewport to 25% from the top.
   A function computes p itself. Reduced-motion users get p = 1 (end state). */
const REDUCED = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
function useScrollProgress(ref, apply, mode = 'stick') {
  uE(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = typeof mode === 'function' ? mode(r, vh)
        : mode === 'enter' ? (vh - r.top) / (vh * 0.75)
        : -r.top / Math.max(1, r.height - vh);
      apply(REDUCED ? 1 : Math.min(1, Math.max(0, p)), el);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ── TextRoll (Skiper UI 58): letters roll up on hover, staggered from the center ── */
function TextRoll({ children }) {
  const chars = Array.from(children);
  const mid = (chars.length - 1) / 2;
  const row = chars.map((c, i) => (
    <span key={i} style={{ '--d': Math.abs(i - mid) }}>{c === ' ' ? ' ' : c}</span>
  ));
  return (
    <span className="roll">
      <span className="sr-only">{children}</span>
      <span className="roll-row" aria-hidden="true">{row}</span>
      <span className="roll-row roll-under" aria-hidden="true">{row}</span>
    </span>
  );
}

/* ── i18n: language context ── */
// Older builds saved the language for good; drop that so new visits open in Turkish.
try { localStorage.removeItem('cn-lang'); } catch (e) {}
const LangCtx = React.createContext({ lang: 'tr', setLang: () => {}, t: null });
function useLang() { return uC(LangCtx); }
// Turkish lives at /, English at /en/: each URL has its own static <head>
// (title, description, canonical, share tags) for search engines and link previews.
const SITE = 'https://corenest.io';
const pathFor = (l) => (l === 'en' ? '/en/' : '/');
const langFromPath = () => (/^\/en(\/|$)/.test(location.pathname) ? 'en' : 'tr');
function LangProvider({ children }) {
  const [lang, setLangState] = uS(() => {
    try {
      // older links used ?lang=en / ?lang=tr; move them to the real URL
      const u = new URL(location.href);
      const q = u.searchParams.get('lang');
      if (q === 'en' || q === 'tr') {
        u.searchParams.delete('lang');
        u.pathname = pathFor(q);
        history.replaceState(null, '', u.pathname + u.search + u.hash);
        return q;
      }
    } catch (e) {}
    return langFromPath();
  });
  const setLang = (l) => {
    if (l === lang) return;
    history.pushState(null, '', pathFor(l) + location.search + location.hash);
    setLangState(l);
  };
  uE(() => {
    const onPop = () => setLangState(langFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  uE(() => {
    // the plain pages (privacy, thanks, 404) and the cookie banner follow this visit's language
    try { sessionStorage.setItem('cn-lang', lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('cn:lang', { detail: lang }));
    document.documentElement.lang = lang;
    const m = STR[lang].meta;
    document.title = m.title;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', m.desc);
    const cl = document.querySelector('link[rel="canonical"]');
    if (cl) cl.href = SITE + pathFor(lang);
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
  const links = [
    { href: '#showcase', label: t.nav.product },
    { href: '#features', label: t.nav.features },
    { href: '#platform', label: t.nav.platform },
    { href: '#faq', label: t.nav.faq },
  ];
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="nav-brand" href={pathFor(lang)} aria-label="CoreNest">
          <span className="nav-brand-logo">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </span>
          <span className="nav-wordmark">CoreNest</span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.href} className="nav-link" href={l.href}><TextRoll>{l.label}</TextRoll></a>
          ))}
        </div>
        <div className="nav-actions">
          <div className="lang-switch" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
            <button className={lang === 'tr' ? 'active' : ''} onClick={() => setLang('tr')} aria-pressed={lang === 'tr'}>TR</button>
          </div>
          <a className="btn btn-primary" href="#cta">{t.nav.demo} {IC.arrow}</a>
        </div>
      </div>
    </nav>
  );
}

/* ── hero screenshot: tilted back, flattens as you scroll ── */
function HeroShot() {
  const { t, lang } = useLang();
  const s = t.hero.shot;
  const ref = uR(null);
  useScrollProgress(ref, (p, el) => el.style.setProperty('--tilt', (1 - p).toFixed(4)), () => window.scrollY / 520);
  const tones = ['crit', 'high', 'ok', 'med'];
  return (
    <div className="hero-shot" ref={ref}>
      {t.hero.chips.map((c, i) => (
        <span key={i} className={`hero-chip-float ${tones[i]}`}><i/>{c}</span>
      ))}
      <div className="hero-shot-glow"/>
      <div className="hero-shot-frame">
        <div className="hero-scope-bar">
          <span className="dots"><i/><i/><i/></span>
          <span className="title">{s.path}</span>
          {s.badge && <span className="shot-badge">{s.badge}</span>}
          <span className="live">LIVE</span>
        </div>
        <img key={lang} src={s.src} alt={s.alt} width="2400" height="1310" fetchpriority="high"/>
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
        <div className="hero-copy">
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
            {t.hero.micro.map((m, i) => <span key={i}>{IC.check} {m}</span>)}
          </div>
        </div>
        <div className="reveal" data-delay="4">
          <HeroShot/>
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
              <div className="l">{s.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── statement: letters converge as you scroll (Skiper UI 31, CharacterV1) ── */
function Statement() {
  const { t } = useLang();
  const s = t.statement;
  const ref = uR(null);
  useScrollProgress(ref, (p, el) => el.style.setProperty('--q', Math.min(1, p / 0.6).toFixed(4)));
  return (
    <section className="statement" ref={ref}>
      <div className="statement-pin">
        <h2 className="statement-text">
          <span className="sr-only">{s.lines.join(' ')}</span>
          {s.lines.map((line, li) => {
            const chars = Array.from(line);
            const mid = Math.floor(chars.length / 2);
            return (
              <span className="statement-line" key={li} aria-hidden="true">
                {chars.map((c, i) => (
                  <span key={i} className={c === ' ' ? 'sp' : ''} style={{ '--d': i - mid }}>{c}</span>
                ))}
              </span>
            );
          })}
        </h2>
        <div className="statement-sub">
          <span className="crit"><b>{s.sub[0]}</b> {s.sub[1]}</span>
          {IC.arrow}
          <span className="ok"><b>{s.sub[2]}</b> {s.sub[3]}</span>
        </div>
      </div>
    </section>
  );
}

/* ── features: hover-expand panels (Skiper UI 52, vertical 53 on phones) ── */
function Features() {
  const { t } = useLang();
  const f = t.features;
  const [active, setActive] = uS(0);
  const icons = [IC.zap, IC.compass, IC.swirl, IC.search, IC.shield, IC.scale];
  const tones = ['crit', 'accent', 'low', 'high', 'ok', 'med'];
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{f.eyebrow}</div>
          <h2><Lines a={f.h2}/></h2>
        </div>
        <div className="hx reveal" data-delay="1">
          {f.items.map((it, i) => (
            <article key={i} tabIndex={0}
                     className={`hx-panel tone-${tones[i]} ${active === i ? 'active' : ''}`}
                     onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
              <span className="hx-bigicon" aria-hidden="true">{icons[i]}</span>
              <span className="hx-icon" aria-hidden="true">{icons[i]}</span>
              <span className="hx-vtitle" aria-hidden="true">{it.title}</span>
              <div className="hx-body">
                <h3>{it.title}</h3>
                <p>{it.line}</p>
                <div className="hx-stat"><b>{it.stat}</b><span>{it.statL}</span></div>
              </div>
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
        <div className="section-head reveal" style={{ textAlign: 'left', maxWidth: 700, margin: '0 0 56px' }}>
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
    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 110, display: 'block' }}>
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

/* ── FAQ ── */
function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  uE(() => {
    let el = document.getElementById('ld-faq');
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = 'ld-faq';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: f.items.map(it => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
    });
  }, [f]);
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <div className="section-head reveal">
          <div className="eyebrow muted">{f.eyebrow}</div>
          <h2><Lines a={f.h2}/></h2>
        </div>
        <div className="faq-list reveal" data-delay="1">
          {f.items.map((it, i) => (
            <details className="faq-item" key={i}>
              <summary>{it.q}<span className="faq-plus" aria-hidden="true"/></summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── demo request form (Web3Forms) ──
   Spam protection: a hidden honeypot field Web3Forms checks ("botcheck"),
   a minimum fill time, and Web3Forms' own server-side filter. */
function DemoForm() {
  const { t, lang } = useLang();
  const f = t.form;
  const [status, setStatus] = uS('idle'); // idle | sending | error
  const startedAt = uR(Date.now());

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck || Date.now() - startedAt.current < 3000) return; // bot: drop silently
    const key = (window.CORENEST_CONFIG || {}).web3formsKey;
    if (!key) {
      console.warn('CoreNest: set web3formsKey in config.js to receive demo requests.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `CoreNest: ${data.interest} — ${data.company}`,
          from_name: 'corenest.io',
          replyto: data.email,
          name: data.name, email: data.email, company: data.company,
          interest: data.interest, message: data.message, language: lang,
          botcheck: '',
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.success) throw new Error(out.message || res.status);
      // the thank-you page reports the lead to analytics (once)
      try { sessionStorage.setItem('cn-lead', data.interest); } catch (e) {}
      location.href = '/thanks';
    } catch (err) {
      console.warn('CoreNest: demo request failed', err);
      setStatus('error');
    }
  };

  return (
    <form className="demo-form" onSubmit={onSubmit}>
      <div className="demo-row">
        <label><span>{f.name}</span><input name="name" required autoComplete="name" maxLength={120}/></label>
        <label><span>{f.email}</span><input name="email" type="email" required autoComplete="email" maxLength={160}/></label>
      </div>
      <label><span>{f.company}</span><input name="company" required autoComplete="organization" maxLength={160}/></label>
      <fieldset>
        <legend>{f.interest}</legend>
        <div className="demo-choices">
          {f.interests.map((opt, i) => (
            <label key={i} className="demo-choice">
              <input type="radio" name="interest" value={opt} defaultChecked={i === 0}/>
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label><span>{f.message}</span><textarea name="message" rows={3} maxLength={2000}/></label>
      {/* honeypot: invisible to people, filled in by bots */}
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
      <button className="btn btn-primary demo-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : <>{f.submit} {IC.arrow}</>}
      </button>
      {status === 'error' && <p className="demo-error" role="alert">{f.error}</p>}
      <p className="demo-note">{f.note[0]}<a className="ulink" href="/privacy">{f.note[1]}</a>{f.note[2]}</p>
    </form>
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
          <div className="finalcta-inner finalcta-split">
            <div>
              <div className="eyebrow">{t.finalcta.eyebrow}</div>
              <h2><Lines a={t.finalcta.h2}/></h2>
              <p className="lede" style={{ marginTop: 18 }}>{t.finalcta.lede}</p>
            </div>
            <DemoForm/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── footer (link underline from Skiper UI 40) ── */
function Footer() {
  const { t, lang } = useLang();
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a className="nav-brand" href={pathFor(lang)} aria-label="CoreNest">
              <span className="nav-brand-logo">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              <h2 className="foot-h">{col.title}</h2>
              {col.links.map((lk, li) => (
                <a className="ulink" href={lk.href} key={li}>{lk.label}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>{t.footer.bottom}</span>
          <a className="ulink foot-credit" href="https://skiper-ui.com" target="_blank" rel="noopener">{t.footer.credit}</a>
          {window.cnCookies && window.cnCookies.enabled && (
            <button type="button" className="ulink foot-cookies" onClick={() => window.cnCookies.open()}>{t.footer.cookies}</button>
          )}
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
            <div className="ai-chips">
              {t.ai.bullets.map((bl, i) => <span key={i}>{IC.check}{bl}</span>)}
            </div>
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

/* ── full platform: sticky stacked cards (Skiper UI 16) ──
   Each card pins under the nav; earlier cards shrink as later ones stack on top. */
function CapabilityStack() {
  const { t } = useLang();
  const c = t.capabilities;
  const groupIcons = [IC.rss, IC.shield, IC.chip, IC.file];
  const itemIcons = [
    [IC.rss, IC.shield, IC.bug, IC.swirl],
    [IC.lock, IC.bellOff, IC.eye, IC.zap],
    [IC.file, IC.chip, IC.search, IC.box],
    [IC.compass, IC.search, IC.file, IC.scale],
  ];
  const tones = ['low', 'crit', 'accent', 'high'];
  const n = c.groups.length;
  const ref = uR(null);
  useScrollProgress(ref, (p, el) => {
    el.querySelectorAll('.stack-card').forEach((card, i) => {
      const start = i / n;
      const k = Math.min(1, Math.max(0, (p - start) / (1 - start)));
      const target = 1 - (n - 1 - i) * 0.05;
      card.style.setProperty('--s', (1 - k * (1 - target)).toFixed(4));
    });
  });
  return (
    <section className="section" id="platform">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{c.eyebrow}</div>
          <h2><Lines a={c.h2}/></h2>
        </div>
        <div className="stack" ref={ref}>
          {c.groups.map((g, gi) => (
            <div className="stack-slot" key={gi} style={{ '--i': gi }}>
              <article className={`stack-card tone-${tones[gi]}`}>
                <div className="stack-left">
                  <span className="stack-num">0{gi + 1} · {g.items.length} {c.caps}</span>
                  <span className="stack-ic">{groupIcons[gi]}</span>
                  <h3>{g.label}</h3>
                  <p>{g.line}</p>
                </div>
                <div className="stack-items">
                  {g.items.map((it, i) => (
                    <div className="stack-item" key={i}>
                      <span className="stack-item-ic">{itemIcons[gi][i]}</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── platform architecture: the pipeline line draws itself on scroll (Skiper UI 19) ── */
function Architecture() {
  const { t } = useLang();
  const names = ['WatchNode', 'WatchTower', 'WatchVault', 'CoreNest'];
  const nodeIcons = [IC.chip, IC.server, IC.database, IC.compass];
  const nodes = t.architecture.nodes.map((n, i) => ({ ...n, name: names[i], icon: nodeIcons[i] }));
  const chipIcons = [IC.zap, IC.server, IC.box];
  const ref = uR(null);
  useScrollProgress(ref, (p, el) => el.style.setProperty('--draw', p.toFixed(4)), 'enter');
  return (
    <section className="section" id="architecture">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow muted">{t.architecture.eyebrow}</div>
          <h2><Lines a={t.architecture.h2}/></h2>
        </div>
        <div className="arch" ref={ref}>
          <div className="arch-line" aria-hidden="true">
            <svg viewBox="0 0 1000 2" preserveAspectRatio="none">
              <path d="M0 1 H1000" pathLength="1"/>
            </svg>
            <i className="arch-packet"/><i className="arch-packet"/><i className="arch-packet"/>
          </div>
          <div className="arch-nodes">
            {nodes.map((n, i) => (
              <div className="arch-node" key={i} style={{ '--i': i }}>
                <span className="arch-node-ic">{n.icon}</span>
                <span className="arch-node-role">{n.role}</span>
                <div className="arch-node-name">{n.name}</div>
                <p>{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="arch-chips reveal">
          {t.architecture.chips.map((ch, i) => <span key={i}>{chipIcons[i]}{ch}</span>)}
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
      <Stats/>
      <Statement/>
      <Showcase/>
      <AITriage/>
      <Features/>
      <DetectionEngine/>
      <CapabilityStack/>
      <Architecture/>
      <Ticker/>
      <Compare/>
      <FAQ/>
      <FinalCTA/>
      <Footer/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('site-root')).render(
  <LangProvider><Site/></LangProvider>
);
