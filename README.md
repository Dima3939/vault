# Vault — Institutional Cryptographic Custody & Digital Asset Treasury

[![Live Demo](https://img.shields.io/badge/demo-online-00E599?style=for-the-badge&logo=githubpages&logoColor=black)](https://dima3939.github.io/vault/)
[![Engine Version](https://img.shields.io/badge/engine-v3.8.2-00F0FF?style=for-the-badge)](https://github.com/Dima3939/vault)
[![License](https://img.shields.io/badge/license-MIT-FFD700?style=for-the-badge)](LICENSE)
[![i18n Supported](https://img.shields.io/badge/i18n-6%20Languages-00E599?style=for-the-badge)](https://dima3939.github.io/vault/)

> **Live Production Demo**: [https://dima3939.github.io/vault/](https://dima3939.github.io/vault/)

**Vault** is an institutional-grade digital asset custody and sovereign treasury operating system. Engineered with mathematically proven **Multi-Party Computation (MPC-CMP)**, **FIPS 140-2 Level 3 Hardware Security Modules (HSMs)**, and sub-millisecond automated cross-chain settlement for hedge funds, Tier-1 liquidity providers, and crypto foundations.

---

## ⚡ Key Architectural Features & Interactive Capabilities

### 🔐 1. Interactive D3.js MPC-CMP Signing Ceremony
- **Live Shard Convergence Simulation**: Real-time D3.js force-directed physics graph demonstrating how 3-of-5 isolated cryptographic key shards (AWS Nitro Enclaves, GCP Confidential VMs, Ledger HSMs) converge to sign high-value transactions without ever assembling the master private key.
- **Live ECDSA/Ed25519 Payload Generator**: Instant DER hexadecimal cryptographic hash computation with sub-15ms simulated consensus metrics.

### 📊 2. Dynamic D3.js Treasury Liquidity & Asset Flow
- **Multi-Chain Treasury Allocation**: Interactive D3 bar chart illustrating reserve liquidity distribution across Bitcoin (`BTC`), Ethereum (`ETH`), Solana (`SOL`), and Institutional USD (`USDC`).
- **Interactive Asset Inspector**: Real-time calculation of yield APYs, vault balances, and zero-knowledge settlement finality.

### 🛡️ 3. Programmable Governance & Policy Engine
- **Visual Rule Builder**: Live toggleable transaction guardrails (e.g., *"\$500k Transfer Threshold requiring 3 CFO approvals and 24h timelock"*, *"Swiss/Luxembourg Geo-fencing"*, *"Automated AML Sanctions Screening"*).
- **Dynamic Security Scoring**: Real-time computation of institutional security grades.

### 🌐 4. 6-Language Internationalization Engine (i18n)
- **Comprehensive Dictionaries**: Full professional localization across **English (`EN`)**, **Ukrainian (`UA`)**, **German (`DE`)**, **Spanish (`ES`)**, **French (`FR`)**, and **Russian (`RU`)**.
- **Adaptive Dropdown Selector**: Custom glassmorphism dropdown with native language names, uppercase badges, and zero OS emoji flag duplication bugs.

### ☀️ / 🌙 5. Dual Swiss FinTech Theme System
- **Titanium Obsidian Dark Mode**: High-contrast deep space (`#07080C`) background with emerald laser (`#00E599`) and cyan glows.
- **Swiss White Banking Light Mode**: Pure `#F4F6F9` private banking aesthetic with crisp navy typography and emerald badges.
- **Session Persistence**: Stored instantly in `localStorage`.

### 💻 6. Developer SDK & REST/gRPC Hub
- Copy-ready code snippets with one-click clipboard feedback for:
  - **TypeScript / Node.js**
  - **Python SDK**
  - **Go**
  - **Rust**
  - **cURL API**

---

## 🛠 Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript (Strict Mode), Vite 6 |
| **Data Visualization** | D3.js (v7) Force Simulation & Scaled Charts |
| **Styling & Design System** | Tailwind CSS, Custom CSS3 Variables, Glassmorphism Tokens |
| **Icons & Animation** | Lucide React, Lenis Smooth Scroll Engine, Canvas Confetti |
| **Internationalization** | Custom Type-Safe Modular i18n Dictionary (`frontend/src/i18n.ts`) |
| **Backend API** | Node.js, Express.js, JSON Storage, CORS |
| **CI/CD Deployment** | GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm / yarn / pnpm

### 1. Clone Repository
```bash
git clone https://github.com/Dima3939/vault.git
cd vault
```

### 2. Run Frontend
```bash
cd frontend
npm install
npm run dev
# Starts on http://localhost:5174
```

### 3. Run Backend API
```bash
cd ../backend
npm install
npm run dev
# Starts on http://localhost:3001
```

---

## 📦 Production Build & Deployment

To compile static production bundles:

```bash
cd frontend
npm run build
```

The output bundle in `frontend/dist` is automatically deployed to GitHub Pages on every push to `main`.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
