export type LanguageCode = 'en' | 'uk' | 'de' | 'es' | 'fr' | 'ru';

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  badge: string;
}

export const supportedLanguages: LanguageMeta[] = [
  { code: 'en', name: 'English', badge: 'EN' },
  { code: 'uk', name: 'Українська', badge: 'UA' },
  { code: 'de', name: 'Deutsch', badge: 'DE' },
  { code: 'es', name: 'Español', badge: 'ES' },
  { code: 'fr', name: 'Français', badge: 'FR' },
  { code: 'ru', name: 'Русский', badge: 'RU' }
];

export const translations = {
  en: {
    nav: {
      features: "Core Security",
      mpcSim: "MPC Simulator",
      treasury: "Treasury Flow",
      developers: "SDK & API",
      compliance: "Compliance",
      pricing: "Pricing",
      faq: "FAQ",
      launchApp: "Launch Console",
      requestAccess: "Request Sovereign Vault",
      langTitle: "Language"
    },
    hero: {
      badge: "Cryptographic Engine v3.8 Active",
      title: "Institutional Digital Asset Custody & Sovereign Treasury",
      subtitle: "The mathematically proven Multi-Party Computation (MPC-CMP) custody infrastructure for global hedge funds, Web3 protocols, and Tier-1 liquidity providers. Zero single point of failure.",
      inputPlaceholder: "Enter institutional email (e.g. treasury@fund.com)",
      submitBtn: "Deploy Vault Node",
      queueCount: "Institutional AUM: $4.2B+ Protected",
      fipsReady: "FIPS 140-2 Level 3 HSM Certified",
      stat1Title: "MPC Shard Latency",
      stat1Val: "14.2 ms",
      stat2Title: "Cryptographic Entropy",
      stat2Val: "256-bit ECDSA / Ed25519"
    },
    trust: {
      title: "Trusted by Tier-1 Custodians, Crypto Protocols, and Family Offices"
    },
    features: {
      tag: "Cryptographic Architecture",
      title: "Zero Single Point of Failure Security",
      desc: "Four multi-layered cryptographic pillars decoupling signing authorization from private key exposure.",
      card1Badge: "MPC-CMP PROTOCOL",
      card1Title: "Threshold Signature (TSS) Key Sharding",
      card1Desc: "Private keys are never generated, assembled, or stored in any single location. Distributed 3-of-5 mathematical shards sign high-value transactions with <strong>sub-15ms multi-cloud consensus</strong>.",
      card1LiveLabel: "Live Hardware Enclave Telemetry",
      card1LiveStatus: "TEE ENCLAVE SECURED",
      card2Badge: "HARDWARE SECURITY",
      card2Title: "FIPS 140-2 Level 3 Cloud HSM",
      card2Desc: "Dedicated, tamper-evident hardware cryptographic coprocessors with automatic physical zeroization on intrusion detection.",
      card3Badge: "POLICY ENGINE",
      card3Title: "Programmable Quorum Governance",
      card3Desc: "Enforce granular multi-sig policies, biometric checks, velocity limits, and timelocks before any transaction payload broadcasts.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Instant Cross-Chain Treasury",
      card4Desc: "Unified programmatic liquidity routing across Bitcoin, Ethereum, Solana, and ERC-20 tokens with automatic gas abstraction."
    },
    mpc: {
      tag: "Live Interactive D3 Simulation",
      title: "Execute MPC-CMP Key Signing Ceremony",
      desc: "Witness how distributed cryptographic key shards converge across isolated enclaves to construct a valid ECDSA signature without revealing the master key.",
      initiateBtn: "⚡ Initiate 3-of-5 Signing Ceremony",
      resetBtn: "Reset Shards",
      signingStatus: "Status: Cryptographic Quorum Reached (3/5 Validated)",
      curveMetric: "Elliptic Curve",
      entropyMetric: "System Entropy",
      latencyMetric: "Signing Latency",
      shards: [
        { id: "Shard Alpha", role: "AWS Nitro Enclave (us-east)", status: "Active" },
        { id: "Shard Beta", role: "GCP Confidential VM (eu-west)", status: "Active" },
        { id: "Shard Gamma", role: "Ledger HSM Co-Signer", status: "Active" },
        { id: "Shard Delta", role: "Mobile Biometric Enclave", status: "Standby" },
        { id: "Shard Epsilon", role: "Cold Disaster Recovery", status: "Standby" }
      ]
    },
    treasury: {
      tag: "Interactive D3 Treasury",
      title: "Dynamic Asset Allocation & Liquidity Flow",
      desc: "Explore real-time cryptographic asset distribution across cold storage, warm MPC vaults, and live DeFi yield pipelines.",
      totalAum: "Total Vault Reserves",
      yieldRate: "Weighted Average Yield",
      settlementSpeed: "Settlement Finality"
    },
    policy: {
      tag: "Rule Engine",
      title: "Configurable Security Governance",
      desc: "Simulate automated transaction guardrails applied to outgoing treasury transfers.",
      rule1: "Transfer Limit Threshold",
      rule1Desc: "Transactions exceeding $500,000 require 3 CFO approvals and 24h timelock.",
      rule2: "Geo-Fenced Enclave Routing",
      rule2Desc: "Egress traffic restricted to verified Swiss & Luxembourg VPC endpoints.",
      rule3: "Automated AML / Sanctions Screening",
      rule3Desc: "Zero-Knowledge screening against Chainalysis & TRM Labs blacklists."
    },
    sdk: {
      tag: "Developer Integration",
      title: "Automate Treasury with 3 Lines of Code",
      copyBtn: "Copy Code",
      copied: "✓ Copied to Clipboard!"
    },
    compliance: {
      tag: "Certifications & Audits",
      title: "Institutional Compliance Standards",
      desc: "Engineered to satisfy the stringent requirements of sovereign wealth funds and regulated institutions.",
      matrixTitle: "Security Standard Matrix"
    },
    pricing: {
      tag: "Sovereign Plans",
      title: "Predictable Institutional Pricing",
      desc: "Transparent custody tiers scale with your asset under management without surprise basis-point markups.",
      monthly: "Monthly Billing",
      annual: "Annual Billing",
      saveBadge: "SAVE 20%",
      period: "/ month",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Full MPC API testnet access for crypto startups and builders.",
      tier1Btn: "Start Testnet Free",
      tier2Title: "Growth Treasury",
      tier2Desc: "For protocols and hedge funds managing up to $50M in digital assets.",
      tier2Popular: "Recommended",
      tier2Btn: "Deploy 14-Day Trial",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "Unlimited AUM, custom dedicated VPC hardware HSMs, and 24/7 dedicated security desk.",
      tier3Btn: "Contact Institutional Sales"
    },
    faq: {
      tag: "FAQ",
      title: "Frequently Asked Questions",
      desc: "Detailed technical answers regarding MPC key mathematics, HSM security, and insurance coverage.",
      q1: "How does Vault's MPC differ from traditional Multi-Sig smart contracts?",
      a1: "Multi-Sig is blockchain-specific, expensive in gas fees, and reveals signers on-chain. Vault's MPC-CMP operates off-chain at the cryptographic protocol level, producing a standard single-signature transaction that is completely chain-agnostic and gas-efficient.",
      q2: "What happens if our cloud infrastructure or one of the key shards is compromised?",
      a2: "A 3-of-5 threshold structure guarantees that compromising 1 or 2 shards yields zero usable private key information. Furthermore, our automated Key Refresh algorithm rotates shard mathematics every 60 minutes without changing the public address.",
      q3: "Are assets held in Vault insured against physical and cyber loss?",
      a3: "Yes. All sovereign enterprise vaults are backed by our $250M Lloyd's of London crime and specie insurance policy covering key destruction and unauthorized enclave access.",
      q4: "Can we deploy Vault entirely inside our own AWS / GCP GovCloud environment?",
      a4: "Yes. We provide complete Terraform infrastructure-as-code modules enabling zero-egress, single-tenant deployment inside your corporate cloud perimeter."
    },
    cta: {
      title: "Secure your institutional treasury today",
      desc: "Join leading asset managers and digital asset institutions trusting Vault for sovereign cryptographic security.",
      btn: "Deploy Sovereign Vault Node →"
    },
    footer: {
      desc: "The institutional cryptographic custody and digital asset operating system. Mathematical security with zero single point of failure.",
      rights: "© 2026 Vault Cryptographic Technologies AG. All rights reserved. Zurich • London • Singapore."
    }
  },

  uk: {
    nav: {
      features: "Безпека",
      mpcSim: "MPC Симулятор",
      treasury: "Потік казначейства",
      developers: "SDK та API",
      compliance: "Сертифікація",
      pricing: "Тарифи",
      faq: "FAQ",
      launchApp: "Консоль",
      requestAccess: "Замовити Vault",
      langTitle: "Мова"
    },
    hero: {
      badge: "Криптографічний рушій v3.8 Активний",
      title: "Інституційне криптографічне зберігання та суверенне казначейство",
      subtitle: "Математично доведена інфраструктура Multi-Party Computation (MPC-CMP) для глобальних хедж-фондів, Web3 протоколів та постачальників ліквідності. Нуль єдиних точок відмови.",
      inputPlaceholder: "Корпоративний email (напр. treasury@fund.com)",
      submitBtn: "Розгорнути вузол Vault",
      queueCount: "Активи під захистом: $4.2B+ AUM",
      fipsReady: "Сертифіковано FIPS 140-2 Level 3 HSM",
      stat1Title: "Затримка MPC шарду",
      stat1Val: "14.2 мс",
      stat2Title: "Криптографічна ентропія",
      stat2Val: "256-біт ECDSA / Ed25519"
    },
    trust: {
      title: "Нам довіряють провідні кастодіани, криптопротоколи та інвестиційні фонди"
    },
    features: {
      tag: "Криптографічна архітектура",
      title: "Безпека без жодної точки відмови",
      desc: "Чотири багаторівневі криптографічні стовпи, що відокремлюють право підпису від розкриття приватного ключа.",
      card1Badge: "ПРОТОКОЛ MPC-CMP",
      card1Title: "Пороговий підпис (TSS) та шардинг ключів",
      card1Desc: "Приватні ключі ніколи не генеруються та не зберігаються в одному місці. Розподілені 3-з-5 шарди підписують транзакції з <strong>консенсусом менше 15 мс</strong>.",
      card1LiveLabel: "Телеметрія апаратного анклаву",
      card1LiveStatus: "TEE АНКЛАВ ЗАХИЩЕНО",
      card2Badge: "АПАРАТНА БЕЗПЕКА",
      card2Title: "FIPS 140-2 Level 3 Хмарний HSM",
      card2Desc: "Виділені апаратні криптопроцесори з автоматичним фізичним самознищенням ключів при спробі зламу.",
      card3Badge: "ПОЛІТИКИ БЕЗПЕКИ",
      card3Title: "Програмоване кворумне управління",
      card3Desc: "Гнучкі правила мультипідпису, біометрична верифікація, ліміти швидкості та таймлоки перед відправкою транзакції в мережу.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Миттєве кросчейн казначейство",
      card4Desc: "Єдина маршрутизація ліквідності між Bitcoin, Ethereum, Solana та токенами ERC-20 з автоматичною оптимізацією газу."
    },
    mpc: {
      tag: "Інтерактивна D3 Симуляція",
      title: "Церемонія підписання ключа MPC-CMP",
      desc: "Подивіться, як розподілені криптографічні шарди сходяться з ізольованих анклавів для формування дійсного підпису без збору майстер-ключа.",
      initiateBtn: "⚡ Запустити церемонію підпису 3-з-5",
      resetBtn: "Скинути шарди",
      signingStatus: "Статус: Криптографічний кворум досягнуто (3/5 валідовано)",
      curveMetric: "Еліптична крива",
      entropyMetric: "Ентропія системи",
      latencyMetric: "Час підписання",
      shards: [
        { id: "Шард Alpha", role: "AWS Nitro Enclave (us-east)", status: "Активний" },
        { id: "Шард Beta", role: "GCP Confidential VM (eu-west)", status: "Активний" },
        { id: "Шард Gamma", role: "Ledger HSM Co-Signer", status: "Активний" },
        { id: "Шард Delta", role: "Біометричний мобільний анклав", status: "Очікування" },
        { id: "Шард Epsilon", role: "Холодне аварійне відновлення", status: "Очікування" }
      ]
    },
    treasury: {
      tag: "Інтерактивне D3 Казначейство",
      title: "Розподіл активів та потік ліквідності",
      desc: "Досліджуйте розподіл капіталу в реальному часі між холодним сховищем, теплими MPC сховищами та пулами дохідності.",
      totalAum: "Загальні резерви Vault",
      yieldRate: "Середня дохідність",
      settlementSpeed: "Швидкість фіналізації"
    },
    policy: {
      tag: "Рушій правил",
      title: "Конфігурація політик безпеки",
      desc: "Симуляція автоматичних правил безпеки для вихідних корпоративних транзакцій.",
      rule1: "Поріг суми переказу",
      rule1Desc: "Транзакції понад $500,000 вимагають схвалення 3 фінансових директорів та 24г затримки.",
      rule2: "Гео-зонування анклавів",
      rule2Desc: "Трафік суворо обмежений перевіреними VPC вузлами у Швейцарії та Люксембурзі.",
      rule3: "Автоматичний AML скринінг",
      rule3Desc: "Zero-Knowledge перевірка адрес за санкційними базами Chainalysis та TRM Labs."
    },
    sdk: {
      tag: "Інтеграція для розробників",
      title: "Автоматизація казначейства у 3 рядки коду",
      copyBtn: "Копіювати код",
      copied: "✓ Скопійовано в буфер!"
    },
    compliance: {
      tag: "Сертифікати та аудит",
      title: "Інституційні стандарти безпеки",
      desc: "Розроблено відповідно до найвищих вимог банківських регуляторів та суверенних фондів.",
      matrixTitle: "Матриця стандартів безпеки"
    },
    pricing: {
      tag: "Тарифні плани",
      title: "Прозоре ціноутворення",
      desc: "Масштабуйте обсяг активів під управлінням без прихованих комісій за базисні пункти.",
      monthly: "Щомісячно",
      annual: "Оплата за рік",
      saveBadge: "ЗНИЖКА 20%",
      period: "/ місяць",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Повний доступ до тестової мережі MPC API для стартапів.",
      tier1Btn: "Тестувати безкоштовно",
      tier2Title: "Growth Treasury",
      tier2Desc: "Для протоколів та фондів з активами під управлінням до $50M.",
      tier2Popular: "Рекомендовано",
      tier2Btn: "Спробувати 14 днів",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "Необмежений AUM, персональні апаратні HSM та цілодобовий Security Desk.",
      tier3Btn: "Зв'язатися з нами"
    },
    faq: {
      tag: "FAQ",
      title: "Поширені запитання",
      desc: "Відповіді на технічні питання щодо математики MPC, захисту HSM та страхового покриття.",
      q1: "Чим MPC у Vault відрізняється від звичайних Multi-Sig смарт-контрактів?",
      a1: "Multi-Sig прив'язаний до конкретного блокчейну і витрачає багато газу. MPC-CMP у Vault працює на криптографічному рівні поза блокчейном, створюючи звичайний одиночний підпис для будь-якої мережі.",
      q2: "Що станеться у разі компрометації одного з хмарних серверів або шардів?",
      a2: "Схема 3-з-5 гарантує, що володіння 1 або 2 шардами дає 0 корисної інформації про ключ. Крім того, алгоритм Key Refresh змінює шарди кожні 60 хвилин без зміни публічної адреси.",
      q3: "Чи застраховані цифрові активи, що зберігаються у Vault?",
      a3: "Так. Корпоративні сховища застраховані полісом Lloyd's of London на суму $250 млн від кібератак та апаратних збоїв.",
      q4: "Чи можна розгорнути Vault повністю у нашій власній хмарі AWS / GCP?",
      a4: "Так. Ми надаємо готові Terraform модулі для ізольованого розгортання без виходу трафіку за межі вашого периметра."
    },
    cta: {
      title: "Захистіть активи вашого казначейства сьогодні",
      desc: "Приєднуйтесь до провідних керуючих фондів, які довіряють безпеку своїх активів платформі Vault.",
      btn: "Розгорнути Sovereign Vault Node →"
    },
    footer: {
      desc: "Операційна система інституційного криптографічного зберігання активів. Математична безпека без жодної точки відмови.",
      rights: "© 2026 Vault Cryptographic Technologies AG. Всі права захищені. Цюрих • Лондон • Сінгапур."
    }
  },

  de: {
    nav: {
      features: "Sicherheit",
      mpcSim: "MPC-Simulator",
      treasury: "Treasury-Fluss",
      developers: "SDK & API",
      compliance: "Compliance",
      pricing: "Preise",
      faq: "FAQ",
      launchApp: "Konsole",
      requestAccess: "Sovereign Vault anfordern",
      langTitle: "Sprache"
    },
    hero: {
      badge: "Kryptografische Engine v3.8 Aktiv",
      title: "Institutionelle Krypto-Verwahrung & Sovereign Treasury",
      subtitle: "Die mathematisch bewiesene Multi-Party Computation (MPC-CMP) Verwahrungsinfrastruktur für globale Hedgefonds und Web3-Protokolle. Kein Single Point of Failure.",
      inputPlaceholder: "Institutionelle E-Mail (z.B. treasury@fonds.de)",
      submitBtn: "Vault-Knoten bereitstellen",
      queueCount: "Geschützte Vermögenswerte: $4.2B+ AUM",
      fipsReady: "FIPS 140-2 Level 3 HSM Zertifiziert",
      stat1Title: "MPC-Shard-Latenz",
      stat1Val: "14.2 ms",
      stat2Title: "Kryptografische Entropie",
      stat2Val: "256-Bit ECDSA / Ed25519"
    },
    trust: {
      title: "Vertraut von führenden Verwahrern, Krypto-Protokollen und Family Offices"
    },
    features: {
      tag: "Kryptografische Architektur",
      title: "Sicherheit ohne Single Point of Failure",
      desc: "Vier mehrschichtige Säulen, die Signaturautorisierung von der Offenlegung privater Schlüssel entkoppeln.",
      card1Badge: "MPC-CMP PROTOKOLL",
      card1Title: "Schwellenwert-Signaturen (TSS) & Sharding",
      card1Desc: "Private Schlüssel werden niemals an einem einzigen Ort generiert oder gespeichert. Verteilte 3-von-5 Shards signieren Transaktionen mit <strong>Latenzen unter 15 ms</strong>.",
      card1LiveLabel: "Hardware-Enklaven-Telemetrie",
      card1LiveStatus: "TEE ENKLAVE GESICHERT",
      card2Badge: "HARDWARE-SICHERHEIT",
      card2Title: "FIPS 140-2 Level 3 Cloud-HSM",
      card2Desc: "Dedizierte kryptografische Hardware-Coprozessoren mit automatischer physischer Löschung bei Manipulationsversuchen.",
      card3Badge: "RICHTLINIEN-ENGINE",
      card3Title: "Programmierbare Quorum-Governance",
      card3Desc: "Granulare Multi-Sig-Richtlinien, biometrische Prüfungen und Timelocks vor der Freigabe von Transaktionen.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Sofortiges Cross-Chain Treasury",
      card4Desc: "Einheitliches Liquiditätsrouting über Bitcoin, Ethereum, Solana und ERC-20 mit Gas-Abstraktion."
    },
    mpc: {
      tag: "Interaktive D3-Simulation",
      title: "MPC-CMP Signaturzeremonie ausführen",
      desc: "Beobachten Sie, wie verteilte kryptografische Shards aus isolierten Enklaven zusammengeführt werden, ohne den Hauptschlüssel preiszugeben.",
      initiateBtn: "⚡ 3-von-5 Signaturzeremonie starten",
      resetBtn: "Shards zurücksetzen",
      signingStatus: "Status: Kryptografisches Quorum erreicht (3/5 validiert)",
      curveMetric: "Elliptische Kurve",
      entropyMetric: "Systementropie",
      latencyMetric: "Signaturzeit",
      shards: [
        { id: "Shard Alpha", role: "AWS Nitro Enclave (us-east)", status: "Aktiv" },
        { id: "Shard Beta", role: "GCP Confidential VM (eu-west)", status: "Aktiv" },
        { id: "Shard Gamma", role: "Ledger HSM Co-Signer", status: "Aktiv" },
        { id: "Shard Delta", role: "Biometrische Enklave", status: "Bereit" },
        { id: "Shard Epsilon", role: "Disaster Recovery", status: "Bereit" }
      ]
    },
    treasury: {
      tag: "Interaktives D3 Treasury",
      title: "Vermögensallokation & Liquiditätsfluss",
      desc: "Untersuchen Sie die Echtzeit-Verteilung zwischen Cold Storage, warmen MPC-Tresoren und DeFi-Pipelines.",
      totalAum: "Gesamte Vault-Reserven",
      yieldRate: "Durchschnittliche Rendite",
      settlementSpeed: "Abwicklungszeit"
    },
    policy: {
      tag: "Regel-Engine",
      title: "Konfigurierbare Sicherheitsregeln",
      desc: "Simulieren Sie automatisierte Leitplanken für ausgehende Überweisungen.",
      rule1: "Überweisungsschwelle",
      rule1Desc: "Transaktionen über $500,000 erfordern 3 CFO-Genehmigungen und 24h Timelock.",
      rule2: "Geografisches Enklaven-Routing",
      rule2Desc: "Ausgehender Datenverkehr streng auf Schweizer & Luxemburger Endpunkte begrenzt.",
      rule3: "Automatisiertes AML-Screening",
      rule3Desc: "Zero-Knowledge-Prüfung gegen Chainalysis- und TRM Labs-Sanktionslisten."
    },
    sdk: {
      tag: "Entwickler-Integration",
      title: "Treasury automatisieren in 3 Zeilen Code",
      copyBtn: "Code kopieren",
      copied: "✓ In die Zwischenablage kopiert!"
    },
    compliance: {
      tag: "Zertifizierungen & Audits",
      title: "Institutionelle Compliance-Standards",
      desc: "Entwickelt für die Anforderungen regulierter Finanzinstitute und Staatsfonds.",
      matrixTitle: "Sicherheitsstandard-Matrix"
    },
    pricing: {
      tag: "Souveräne Tarife",
      title: "Vorhersehbare institutionelle Preise",
      desc: "Transparente Verwahrungstarife skalieren mit Ihren verwalteten Vermögenswerten.",
      monthly: "Monatlich",
      annual: "Jährliche Zahlung",
      saveBadge: "20% SPAREN",
      period: "/ Monat",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Vollständiger MPC-API Testnet-Zugang für Startups.",
      tier1Btn: "Kostenlos starten",
      tier2Title: "Growth Treasury",
      tier2Desc: "Für Protokolle und Fonds mit bis zu $50M AUM.",
      tier2Popular: "Empfohlen",
      tier2Btn: "14 Tage testen",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "Unbegrenztes AUM, dedizierte Hardware-HSMs und 24/7 Security Desk.",
      tier3Btn: "Vertrieb kontaktieren"
    },
    faq: {
      tag: "FAQ",
      title: "Häufig gestellte Fragen",
      desc: "Detaillierte Antworten zu MPC-Mathematik, HSM-Sicherheit und Versicherung.",
      q1: "Wie unterscheidet sich Vault MPC von Multi-Sig Smart Contracts?",
      a1: "Multi-Sig ist blockchain-spezifisch und teuer an Gas-Gebühren. Vault MPC-CMP arbeitet off-chain und erzeugt standardmäßige Einzelsignaturen für jede Blockchain.",
      q2: "Was passiert, wenn ein Cloud-Server oder Shard kompromittiert wird?",
      a2: "Die 3-von-5 Struktur garantiert, dass 1 oder 2 Shards keinerlei nutzbare Schlüsseldaten preisgeben. Zudem rotiert der Key-Refresh-Algorithmus Shards alle 60 Minuten.",
      q3: "Sind Vermögenswerte in Vault versichert?",
      a3: "Ja. Alle Sovereign Enterprise Vaults sind mit einer 250-Mio.-Dollar-Police von Lloyd's of London gegen Diebstahl und Einbruch abgesichert.",
      q4: "Kann Vault in unserer eigenen AWS/GCP-Cloud betrieben werden?",
      a4: "Ja. Wir bieten vollständige Terraform-Module für den Betrieb innerhalb Ihres eigenen Sicherheitsbereichs."
    },
    cta: {
      title: "Sichern Sie Ihr institutionelles Treasury noch heute",
      desc: "Schließen Sie sich führenden Vermögensverwaltern an, die auf Vault für souveräne Krypto-Sicherheit vertrauen.",
      btn: "Sovereign Vault Node bereitstellen →"
    },
    footer: {
      desc: "Das Betriebssystem für institutionelle Kryptoverwahrung. Mathematische Sicherheit ohne Single Point of Failure.",
      rights: "© 2026 Vault Cryptographic Technologies AG. Alle Rechte vorbehalten. Zürich • London • Singapur."
    }
  },

  es: {
    nav: {
      features: "Seguridad",
      mpcSim: "Simulador MPC",
      treasury: "Flujo de Tesorería",
      developers: "SDK y API",
      compliance: "Certificaciones",
      pricing: "Precios",
      faq: "FAQ",
      launchApp: "Consola",
      requestAccess: "Solicitar Vault",
      langTitle: "Idioma"
    },
    hero: {
      badge: "Motor Criptográfico v3.8 Activo",
      title: "Custodia Criptográfica Institucional y Tesorería Soberana",
      subtitle: "La infraestructura Multi-Party Computation (MPC-CMP) probada matemáticamente para fondos de cobertura globales y protocolos Web3. Cero puntos únicos de fallo.",
      inputPlaceholder: "Correo institucional (ej. tesoreria@fondo.com)",
      submitBtn: "Desplegar Nodo Vault",
      queueCount: "Activos Protegidos: $4.2B+ AUM",
      fipsReady: "Certificado FIPS 140-2 Level 3 HSM",
      stat1Title: "Latencia de Shard MPC",
      stat1Val: "14.2 ms",
      stat2Title: "Entropía Criptográfica",
      stat2Val: "256-bit ECDSA / Ed25519"
    },
    trust: {
      title: "Respaldado por custodios líderes, protocolos cripto y family offices"
    },
    features: {
      tag: "Arquitectura Criptográfica",
      title: "Seguridad sin puntos únicos de fallo",
      desc: "Cuatro pilares de seguridad que desacoplan la firma de transacciones de la exposición de claves privadas.",
      card1Badge: "PROTOCOLO MPC-CMP",
      card1Title: "Firmas de Umbral (TSS) y Fragmentación de Claves",
      card1Desc: "Las claves privadas nunca se generan ni se almacenan en un solo lugar. 3 de 5 fragmentos distribuidos firman con <strong>consenso en menos de 15 ms</strong>.",
      card1LiveLabel: "Telemetría de Enclave de Hardware",
      card1LiveStatus: "ENCLAVE TEE PROTEGIDO",
      card2Badge: "SEGURIDAD DE HARDWARE",
      card2Title: "Cloud HSM FIPS 140-2 Nivel 3",
      card2Desc: "Coprocesadores criptográficos dedicados con autodestrucción física ante cualquier intento de intrusión.",
      card3Badge: "MOTOR DE POLÍTICAS",
      card3Title: "Gobernanza de Quórum Programable",
      card3Desc: "Políticas multifirma granulares, verificación biométrica y bloqueos de tiempo antes de transmitir transacciones.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Tesorería Multicadena Instantánea",
      card4Desc: "Enrutamiento unificado de liquidez en Bitcoin, Ethereum, Solana y ERC-20 con abstracción de gas."
    },
    mpc: {
      tag: "Simulación D3 Interactiva",
      title: "Ceremonia de Firma de Clave MPC-CMP",
      desc: "Observe cómo los fragmentos convergen desde enclaves aislados para construir una firma válida sin revelar la clave maestra.",
      initiateBtn: "⚡ Iniciar Ceremonia de Firma 3 de 5",
      resetBtn: "Reiniciar Fragmentos",
      signingStatus: "Estado: Quórum Criptográfico Alcanzado (3/5 validados)",
      curveMetric: "Curva Elíptica",
      entropyMetric: "Entropía del Sistema",
      latencyMetric: "Tiempo de Firma",
      shards: [
        { id: "Shard Alpha", role: "AWS Nitro Enclave (us-east)", status: "Activo" },
        { id: "Shard Beta", role: "GCP Confidential VM (eu-west)", status: "Activo" },
        { id: "Shard Gamma", role: "Ledger HSM Co-Signer", status: "Activo" },
        { id: "Shard Delta", role: "Enclave Móvil Biométrico", status: "En espera" },
        { id: "Shard Epsilon", role: "Recuperación ante Desastres", status: "En espera" }
      ]
    },
    treasury: {
      tag: "Tesorería Interactiva D3",
      title: "Asignación de Activos y Flujo de Liquidez",
      desc: "Explore la distribución en tiempo real entre almacenamiento en frío, bóvedas MPC y rendimientos DeFi.",
      totalAum: "Reservas Totales Vault",
      yieldRate: "Rendimiento Promedio",
      settlementSpeed: "Velocidad de Liquidación"
    },
    policy: {
      tag: "Motor de Reglas",
      title: "Gobernanza de Seguridad Configurable",
      desc: "Simule límites automáticos aplicados a transferencias salientes de tesorería.",
      rule1: "Límite de Transferencia",
      rule1Desc: "Transferencias superiores a $500,000 requieren aprobación de 3 directores y 24h de espera.",
      rule2: "Enrutamiento Geográfico",
      rule2Desc: "Tráfico restringido estrictamente a enclaves verificados en Suiza y Luxemburgo.",
      rule3: "Detección Automatizada AML",
      rule3Desc: "Verificación Zero-Knowledge contra listas de sanciones de Chainalysis y TRM Labs."
    },
    sdk: {
      tag: "Integración para Desarrolladores",
      title: "Automatice su Tesorería en 3 Líneas de Código",
      copyBtn: "Copiar Código",
      copied: "✓ ¡Copiado al Portapapeles!"
    },
    compliance: {
      tag: "Certificaciones y Auditorías",
      title: "Estándares Institucionales de Cumplimiento",
      desc: "Diseñado para satisfacer los requisitos más estrictos de fondos soberanos e instituciones financieras.",
      matrixTitle: "Matriz de Estándares de Seguridad"
    },
    pricing: {
      tag: "Planes Soberanos",
      title: "Precios Institucionales Predecibles",
      desc: "Planes transparentes que escalan con sus activos bajo gestión sin tarifas sorpresa.",
      monthly: "Facturación Mensual",
      annual: "Facturación Anual",
      saveBadge: "AHORRA 20%",
      period: "/ mes",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Acceso completo a la API MPC en testnet para desarrolladores.",
      tier1Btn: "Comenzar Gratis",
      tier2Title: "Growth Treasury",
      tier2Desc: "Para protocolos y fondos que gestionan hasta $50M en activos digitales.",
      tier2Popular: "Recomendado",
      tier2Btn: "Prueba de 14 Días",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "AUM ilimitado, módulos HSM dedicados y mesa de seguridad 24/7.",
      tier3Btn: "Contactar a Ventas"
    },
    faq: {
      tag: "FAQ",
      title: "Preguntas Frecuentes",
      desc: "Respuestas técnicas sobre matemáticas MPC, seguridad de hardware HSM y seguros.",
      q1: "¿En qué se diferencia el MPC de Vault de los contratos Multi-Sig tradicionales?",
      a1: "Multi-Sig depende de cada blockchain y tiene altos costos de gas. El MPC-CMP de Vault opera a nivel criptográfico fuera de la cadena, generando una firma única para cualquier red.",
      q2: "¿Qué sucede si se compromete un servidor o fragmento de clave?",
      a2: "La estructura 3 de 5 asegura que 1 o 2 fragmentos no revelan nada de la clave privada. Además, Key Refresh rota los fragmentos cada 60 minutos.",
      q3: "¿Los activos en Vault están asegurados?",
      a3: "Sí. Las bóvedas están respaldadas por una póliza de $250M de Lloyd's of London contra robo e intrusión física.",
      q4: "¿Podemos desplegar Vault en nuestra propia nube AWS / GCP?",
      a4: "Sí. Ofrecemos módulos Terraform para un despliegue sin salida de datos dentro de su perímetro corporativo."
    },
    cta: {
      title: "Proteja la tesorería de su institución hoy",
      desc: "Únase a los principales administradores de activos que confían en Vault para su seguridad criptográfica.",
      btn: "Desplegar Nodo Sovereign Vault →"
    },
    footer: {
      desc: "El sistema operativo de custodia criptográfica institucional. Seguridad matemática sin puntos únicos de fallo.",
      rights: "© 2026 Vault Cryptographic Technologies AG. Todos los derechos reservados. Zúrich • Londres • Singapur."
    }
  },

  fr: {
    nav: {
      features: "Sécurité",
      mpcSim: "Simulateur MPC",
      treasury: "Flux de Trésorerie",
      developers: "SDK & API",
      compliance: "Conformité",
      pricing: "Tarifs",
      faq: "FAQ",
      launchApp: "Console",
      requestAccess: "Demander un Vault",
      langTitle: "Langue"
    },
    hero: {
      badge: "Moteur Cryptographique v3.8 Actif",
      title: "Conservation Cryptographique Institutionnelle & Trésorerie Souveraine",
      subtitle: "L'infrastructure Multi-Party Computation (MPC-CMP) mathématiquement prouvée pour les fonds d'investissement et protocoles Web3. Zéro point unique de défaillance.",
      inputPlaceholder: "Email institutionnel (ex: tresorerie@fonds.fr)",
      submitBtn: "Déployer un Nœud Vault",
      queueCount: "Actifs Protégés : $4.2B+ AUM",
      fipsReady: "Certifié FIPS 140-2 Level 3 HSM",
      stat1Title: "Latence de Shard MPC",
      stat1Val: "14.2 ms",
      stat2Title: "Entropie Cryptographique",
      stat2Val: "256-bit ECDSA / Ed25519"
    },
    trust: {
      title: "Recommandé par les principaux dépositaires, protocoles crypto et family offices"
    },
    features: {
      tag: "Architecture Cryptographique",
      title: "Sécurité sans aucun point unique de défaillance",
      desc: "Quatre piliers de sécurité découplant l'autorisation de signature de l'exposition des clés privées.",
      card1Badge: "PROTOCOLE MPC-CMP",
      card1Title: "Signature à Seuil (TSS) & Sharding de Clés",
      card1Desc: "Les clés privées ne sont jamais assemblées ni stockées au même endroit. 3 shards sur 5 signent les transactions avec un <strong>consensus sous 15 ms</strong>.",
      card1LiveLabel: "Télémétrie d'Enclave Matérielle",
      card1LiveStatus: "ENCLAVE TEE SÉCURISÉE",
      card2Badge: "SÉCURITÉ MATÉRIELLE",
      card2Title: "Cloud HSM FIPS 140-2 Niveau 3",
      card2Desc: "Coprocesseurs cryptographiques dédiés avec auto-destruction physique des clés en cas d'intrusion.",
      card3Badge: "MOTEUR DE RÈGLES",
      card3Title: "Gouvernance de Quorum Programmable",
      card3Desc: "Règles multi-signatures granulaires, vérifications biométriques et timelocks avant l'émission des transactions.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Trésorerie Cross-Chain Instantanée",
      card4Desc: "Routage unifié de la liquidité sur Bitcoin, Ethereum, Solana et ERC-20 avec abstraction automatique du gaz."
    },
    mpc: {
      tag: "Simulation D3 Interactive",
      title: "Cérémonie de Signature de Clé MPC-CMP",
      desc: "Observez comment les shards convergent depuis des enclaves isolées pour former une signature valide sans reconstituer la clé maîtresse.",
      initiateBtn: "⚡ Lancer la Cérémonie 3 sur 5",
      resetBtn: "Réinitialiser les Shards",
      signingStatus: "Statut : Quorum Cryptographique Atteint (3/5 validés)",
      curveMetric: "Courbe Elliptique",
      entropyMetric: "Entropie Système",
      latencyMetric: "Temps de Signature",
      shards: [
        { id: "Shard Alpha", role: "AWS Nitro Enclave (us-east)", status: "Actif" },
        { id: "Shard Beta", role: "GCP Confidential VM (eu-west)", status: "Actif" },
        { id: "Shard Gamma", role: "Ledger HSM Co-Signer", status: "Actif" },
        { id: "Shard Delta", role: "Enclave Mobile Biométrique", status: "En attente" },
        { id: "Shard Epsilon", role: "Récupération d'Urgence", status: "En attente" }
      ]
    },
    treasury: {
      tag: "Trésorerie Interactive D3",
      title: "Allocation d'Actifs & Flux de Liquidité",
      desc: "Explorez la distribution en temps réel entre stockage à froid, coffres MPC et rendements DeFi.",
      totalAum: "Réserves Totales du Vault",
      yieldRate: "Rendement Moyen",
      settlementSpeed: "Délai de Règlement"
    },
    policy: {
      tag: "Moteur de Règles",
      title: "Gouvernance de Sécurité Configurable",
      desc: "Simulez des garde-fous automatiques appliqués aux transferts de trésorerie.",
      rule1: "Seuil de Virement",
      rule1Desc: "Les transferts supérieurs à $500,000 nécessitent 3 approbations et 24h de délai.",
      rule2: "Routage Géographique",
      rule2Desc: "Trafic strictement limité aux enclaves certifiées en Suisse et au Luxembourg.",
      rule3: "Filtrage AML Automatisé",
      rule3Desc: "Vérification Zero-Knowledge contre les listes de sanctions Chainalysis et TRM Labs."
    },
    sdk: {
      tag: "Intégration Développeur",
      title: "Automatisez votre Trésorerie en 3 Lignes de Code",
      copyBtn: "Copier le Code",
      copied: "✓ Copié dans le Presse-papier !"
    },
    compliance: {
      tag: "Certifications & Audits",
      title: "Normes Institutionnelles de Conformité",
      desc: "Conçu pour satisfaire aux exigences strictes des fonds souverains et institutions financières.",
      matrixTitle: "Matrice des Normes de Sécurité"
    },
    pricing: {
      tag: "Offres Souveraines",
      title: "Tarification Institutionnelle Prévisible",
      desc: "Des forfaits transparents qui évoluent avec vos actifs sous gestion sans frais cachés.",
      monthly: "Facturation Mensuelle",
      annual: "Facturation Annuelle",
      saveBadge: "ÉCONOMISEZ 20%",
      period: "/ mois",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Accès complet à l'API MPC sur testnet pour les créateurs.",
      tier1Btn: "Démarrer Gratuitement",
      tier2Title: "Growth Treasury",
      tier2Desc: "Pour les protocoles et fonds gérant jusqu'à $50M d'actifs.",
      tier2Popular: "Recommandé",
      tier2Btn: "Essai de 14 Jours",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "AUM illimité, modules HSM dédiés et centre de sécurité 24/7.",
      tier3Btn: "Contacter l'Équipe"
    },
    faq: {
      tag: "FAQ",
      title: "Foire Aux Questions",
      desc: "Réponses techniques sur les mathématiques MPC, la sécurité HSM et les garanties d'assurance.",
      q1: "En quoi le MPC de Vault diffère-t-il des smart contracts Multi-Sig traditionnels ?",
      a1: "Le Multi-Sig dépend de chaque blockchain et génère des frais de gaz élevés. Le MPC-CMP de Vault opère au niveau cryptographique hors-chaîne, générant une signature standard pour tout réseau.",
      q2: "Que se passe-t-il en cas de compromission d'un serveur ou d'un shard ?",
      a2: "La structure 3 sur 5 garantit que 1 ou 2 shards ne révèlent aucune information sur la clé privée. De plus, l'algorithme Key Refresh renouvelle les shards toutes les 60 minutes.",
      q3: "Les actifs déposés dans Vault sont-ils assurés ?",
      a3: "Oui. Tous les coffres d'entreprise sont couverts par une police d'assurance de 250M$ de Lloyd's of London contre le vol et l'intrusion.",
      q4: "Peut-on déployer Vault entièrement sur notre propre cloud AWS / GCP ?",
      a4: "Oui. Nous fournissons des modules Terraform complets pour un déploiement sans sortie de données dans votre périmètre d'entreprise."
    },
    cta: {
      title: "Sécurisez votre trésorerie institutionnelle dès aujourd'hui",
      desc: "Rejoignez les gestionnaires d'actifs qui font confiance à Vault pour leur sécurité cryptographique.",
      btn: "Déployer un Nœud Sovereign Vault →"
    },
    footer: {
      desc: "Le système d'exploitation de conservation cryptographique institutionnelle. Sécurité mathématique sans point unique de défaillance.",
      rights: "© 2026 Vault Cryptographic Technologies AG. Tous droits réservés. Zurich • Londres • Singapour."
    }
  },

  ru: {
    nav: {
      features: "Безопасность",
      mpcSim: "MPC Симулятор",
      treasury: "Поток казначейства",
      developers: "SDK и API",
      compliance: "Сертификация",
      pricing: "Тарифы",
      faq: "FAQ",
      launchApp: "Консоль",
      requestAccess: "Запросить Vault",
      langTitle: "Язык"
    },
    hero: {
      badge: "Криптографический движок v3.8 Активен",
      title: "Институциональное криптографическое хранение и суверенное казначейство",
      subtitle: "Математически доказанная инфраструктура Multi-Party Computation (MPC-CMP) для глобальных хедж-фондов, Web3 протоколов и поставщиков ликвидности. Ноль единых точек отказа.",
      inputPlaceholder: "Корпоративный email (напр. treasury@fund.com)",
      submitBtn: "Развернуть узел Vault",
      queueCount: "Активы под защитой: $4.2B+ AUM",
      fipsReady: "Сертифицировано FIPS 140-2 Level 3 HSM",
      stat1Title: "Задержка MPC шарда",
      stat1Val: "14.2 мс",
      stat2Title: "Криптографическая энтропия",
      stat2Val: "256-бит ECDSA / Ed25519"
    },
    trust: {
      title: "Нам доверяют ведущие кастодианы, криптопротоколы и инвестиционные фонды"
    },
    features: {
      tag: "Криптографическая архитектура",
      title: "Безопасность без единой точки отказа",
      desc: "Четыре многоуровневых криптографических столпа, отделяющих право подписи от раскрытия приватного ключа.",
      card1Badge: "ПРОТОКОЛ MPC-CMP",
      card1Title: "Пороговая подпись (TSS) и шардинг ключей",
      card1Desc: "Приватные ключи никогда не генерируются и не хранятся в одном месте. Распределенные 3-из-5 шарды подписывают транзакции с <strong>консенсусом менее 15 мс</strong>.",
      card1LiveLabel: "Телеметрия аппаратного анклава",
      card1LiveStatus: "TEE АНКЛАВ ЗАЩИЩЕН",
      card2Badge: "АППАРАТНАЯ БЕЗОПАСНОСТЬ",
      card2Title: "FIPS 140-2 Level 3 Облачный HSM",
      card2Desc: "Выделенные аппаратные криптопроцессоры с автоматическим физическим уничтожением ключей при попытке взлома.",
      card3Badge: "ПОЛИТИКИ БЕЗОПАСНОСТИ",
      card3Title: "Программируемое кворумное управление",
      card3Desc: "Гибкие правила мультиподписи, биометрическая проверка, лимиты скорости и таймлоки перед отправкой транзакции в сеть.",
      card4Badge: "ZERO-KNOWLEDGE",
      card4Title: "Мгновенное кроссчейн казначейство",
      card4Desc: "Единая маршрутизация ликвидности между Bitcoin, Ethereum, Solana и токенами ERC-20 с автоматической оптимизацией газа."
    },
    mpc: {
      tag: "Интерактивная D3 Симуляция",
      title: "Церемония подписания ключа MPC-CMP",
      desc: "Посмотрите, как распределенные криптографические шарды сходятся из изолированных анклавов для формирования действительной подписи без сбора мастер-ключа.",
      initiateBtn: "⚡ Запустить церемонию подписи 3-из-5",
      resetBtn: "Сбросить шарды",
      signingStatus: "Статус: Криптографический кворум достигнут (3/5 валидировано)",
      curveMetric: "Эллиптическая кривая",
      entropyMetric: "Энтропия системы",
      latencyMetric: "Время подписания",
      shards: [
        { id: "Шард Alpha", role: "AWS Nitro Enclave (us-east)", status: "Активен" },
        { id: "Шард Beta", role: "GCP Confidential VM (eu-west)", status: "Активен" },
        { id: "Шард Gamma", role: "Ledger HSM Co-Signer", status: "Активен" },
        { id: "Шард Delta", role: "Биометрический мобильный анклав", status: "Ожидание" },
        { id: "Шард Epsilon", role: "Холодное аварийное восстановление", status: "Ожидание" }
      ]
    },
    treasury: {
      tag: "Интерактивное D3 Казначейство",
      title: "Распределение активов и поток ликвидности",
      desc: "Исследуйте распределение капитала в реальном времени между холодным хранилищем, теплыми MPC хранилищами и пулами доходности.",
      totalAum: "Общие резервы Vault",
      yieldRate: "Средняя доходность",
      settlementSpeed: "Скорость финализации"
    },
    policy: {
      tag: "Движок правил",
      title: "Конфигурация политик безопасности",
      desc: "Симуляция автоматических правил безопасности для исходящих корпоративных транзакций.",
      rule1: "Порог суммы перевода",
      rule1Desc: "Транзакции свыше $500,000 требуют одобрения 3 финансовых директоров и 24ч задержки.",
      rule2: "Гео-зонирование анклавов",
      rule2Desc: "Трафик строго ограничен проверенными VPC узлами в Швейцарии и Люксембурге.",
      rule3: "Автоматический AML скрининг",
      rule3Desc: "Zero-Knowledge проверка адресов по санкционным базам Chainalysis и TRM Labs."
    },
    sdk: {
      tag: "Интеграция для разработчиков",
      title: "Автоматизация казначейства в 3 строки кода",
      copyBtn: "Копировать код",
      copied: "✓ Скопировано в буфер!"
    },
    compliance: {
      tag: "Сертификаты и аудит",
      title: "Институциональные стандарты безопасности",
      desc: "Разработано в соответствии с высочайшими требованиями банковских регуляторов и суверенных фондов.",
      matrixTitle: "Матрица стандартов безопасности"
    },
    pricing: {
      tag: "Тарифные планы",
      title: "Прозрачное ценообразование",
      desc: "Масштабируйте объем активов под управлением без скрытых комиссий за базисные пункты.",
      monthly: "Ежемесячно",
      annual: "Оплата за год",
      saveBadge: "СКИДКА 20%",
      period: "/ месяц",
      tier1Title: "Developer Sandbox",
      tier1Desc: "Полный доступ к тестовой сети MPC API для стартапов.",
      tier1Btn: "Тестировать бесплатно",
      tier2Title: "Growth Treasury",
      tier2Desc: "Для протоколов и фондов с активами под управлением до $50M.",
      tier2Popular: "Рекомендовано",
      tier2Btn: "Попробовать 14 дней",
      tier3Title: "Sovereign Enterprise",
      tier3Desc: "Неограниченный AUM, персональные аппаратные HSM и круглосуточный Security Desk.",
      tier3Btn: "Связаться с нами"
    },
    faq: {
      tag: "FAQ",
      title: "Часто задаваемые вопросы",
      desc: "Ответы на технические вопросы о математике MPC, защите HSM и страховом покрытии.",
      q1: "Чем MPC в Vault отличается от обычных Multi-Sig смарт-контрактов?",
      a1: "Multi-Sig привязан к конкретному блокчейну и расходует много газа. MPC-CMP в Vault работает на криптографическом уровне вне блокчейна, создавая обычную одиночную подпись для любой сети.",
      q2: "Что произойдет в случае компрометации одного из облачных серверов или шардов?",
      a2: "Схема 3-из-5 гарантирует, что владение 1 или 2 шардами дает 0 полезной информации о ключе. Кроме того, алгоритм Key Refresh меняет шарды каждые 60 минут без изменения публичного адреса.",
      q3: "Застрахованы ли цифровые активы, хранящиеся в Vault?",
      a3: "Да. Корпоративные хранилища застрахованы полисом Lloyd's of London на сумму $250 млн от кибератак и аппаратных сбоев.",
      q4: "Можно ли развернуть Vault полностью в нашем собственном облаке AWS / GCP?",
      a4: "Да. Мы предоставляем готовые Terraform модули для изолированного развертывания без выхода трафика за пределы вашего периметра."
    },
    cta: {
      title: "Защитите активы вашего казначейства сегодня",
      desc: "Присоединяйтесь к ведущим управляющим фондам, доверяющим безопасность своих активов платформе Vault.",
      btn: "Развернуть Sovereign Vault Node →"
    },
    footer: {
      desc: "Операционная система институционального криптографического хранения активов. Математическая безопасность без единой точки отказа.",
      rights: "© 2026 Vault Cryptographic Technologies AG. Все права защищены. Цюрих • Лондон • Сингапур."
    }
  }
};
