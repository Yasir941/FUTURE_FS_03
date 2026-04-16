<div align="center">

<img src="https://img.shields.io/badge/Task-03-E3073C?style=for-the-badge&logoColor=white" />
<img src="https://img.shields.io/badge/Internship-Future%20Interns%202026-FFD200?style=for-the-badge&logoColor=black" />
<img src="https://img.shields.io/badge/Framework-Next.js%2015-000000?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Status-Live-06E07F?style=for-the-badge&logoColor=white" />

<br /><br />

<pre>
 ██████╗██╗   ██╗████████╗    ██╗███╗   ██╗    ██╗  ██╗ █████╗ ██╗     ███████╗
██╔════╝██║   ██║╚══██╔══╝    ██║████╗  ██║    ██║  ██║██╔══██╗██║     ██╔════╝
██║     ██║   ██║   ██║       ██║██╔██╗ ██║    ███████║███████║██║     █████╗  
██║     ██║   ██║   ██║       ██║██║╚██╗██║    ██╔══██║██╔══██║██║     ██╔══╝  
╚██████╗╚██████╔╝   ██║       ██║██║ ╚████║    ██║  ██║██║  ██║███████╗██║     
 ╚═════╝ ╚═════╝    ╚═╝       ╚═╝╚═╝  ╚═══╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝   
</pre>

# 🔪 Cut In Half — Flavor Engineering Lab

> **A cinematic, production-ready digital portal for a premium UAE dining brand.**  
> Industrial dark-mode. Zero-friction ordering. Engineered for conversion.

</div>

---



---

## 📝 Project Overview

This repository is the final deliverable for **Task 3 of the Future Interns Full Stack Web Development Internship (2026)** — bridging academic learning with real-world freelance/agency work.

I built a high-end **"Flavor Engineering Lab"** digital portal for **Cut In Half**, a premium burger and dining brand operating across the UAE.

### 🏢 Featured Business

| Field | Details |
| :--- | :--- |
| **Name** | Cut In Half |
| **Industry** | Premium Fast-Casual Dining |
| **Muwailah** | Sharjah |
| **Al Khawaneej** | Dubai |
| **Majan** | Dubai |
| **Umm Suqeim** | Dubai |

---

## 💡 Business Pitch & Strategy

### 1️⃣ The Problem
Most local restaurant websites rely on static menus or slow-loading templates that fail to capture brand identity. For **Cut In Half**, digital friction made it difficult for customers to find branch contacts and locations quickly — especially on mobile.

### 2️⃣ The Solution
A cinematic, interactive portal focused on **instant view on the restaurant**:

| Feature | Description |
| :--- | :--- |
| 🔄 **Dynamic Branch Routing** | UI console updates contact data in real-time based on selected location |
| 📞 **Direct-Action CTA** | `tel:` and `wa.me` protocols for frictionless one-tap ordering |
| 🎨 **Aesthetic Alignment** | Industrial dark-mode system reflecting the "Engineered Flavor" philosophy |

### 3️⃣ Business Value
By replacing passive contact forms with **direct WhatsApp + Call integration**, the site transforms a casual visitor into an active customer in just **two taps** — delivering immediate, measurable ROI.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (TSX) |
| **Animations** | Framer Motion |
| **Styling** | Tailwind CSS |
| **Images** | next/image (LCP optimized) |
| **Maps** | Google Maps (Dynamic, branch-aware) |
| **Communication** | WhatsApp API · Direct `tel:` links |

---

## ⚙️ Technical Architecture

### 🚀 Frontend & UI/UX

- **Next.js 15 App Router** — Optimized routing with full-stack capabilities
- **Cinematic Hero Engine** — High-performance `Framer Motion` carousel with parallax scrolling and metadata overlays
- **Inline SVG Filters** — Zero-network "noise" textures for high-fidelity grain without external requests
- **next/image** — LCP-optimized asset delivery across all branches

### ⚡ Interactive Features

- **Multi-Branch Console** — React state-driven system managing branch-specific metadata (Phone, WhatsApp, Landmarks)
- **Contextual Maps** — Google Maps embeds that update dynamically per branch selection
- **Automated Dialing** — Cleanly formatted `tel:` links for one-tap mobile calls
- **WhatsApp API** — Pre-configured `wa.me` links for instant order inquiries

---

## 📂 Project Structure

```bash
FUTURE_FS_03/
├── app/                         # ⚛️  Next.js App Router
│   ├── layout.tsx               # Root layout & metadata
│   ├── page.tsx                 # 🏠 Homepage — Hero + Sections
│   └── globals.css              # Global styles & Tailwind directives
│
├── components/                  # 🧩 UI Components
│   ├── HeroCarousel.tsx         # 🎬 Cinematic hero with Framer Motion
│   ├── BranchConsole.tsx        # 📍 Multi-branch selector & contact router
│   ├── MapEmbed.tsx             # 🗺️  Dynamic Google Maps component
│   └── CTAButtons.tsx           # 📞 WhatsApp + Call action buttons
│
├── public/                      # 🖼️  Static assets & branch images
│
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind design tokens
└── README.md                    # 📄 You are here
```

---

## 🚀 Getting Started

### 📌 Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- [Git](https://git-scm.com/)

---

### ⚙️ Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Yasir941/FUTURE_FS_03.git
cd FUTURE_FS_03
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Run Development Server

```bash
npm run dev
```

> ✅ App will run on `http://localhost:3000`

#### 4️⃣ Production Build

```bash
npm run build
npm start
```

> ✅ Optimized production server ready

---

## 📌 Key Highlights

- ✅ **Next.js 15** App Router with full TypeScript support
- ✅ **Cinematic hero carousel** powered by Framer Motion parallax
- ✅ **Multi-branch console** — real-time contact routing per location
- ✅ **Zero-friction ordering** via WhatsApp API + direct call integration
- ✅ **Dynamic Google Maps** — contextually updates on branch selection
- ✅ **Industrial glassmorphism** design system with grainy textures
- ✅ **LCP-optimized** images via `next/image`
- ✅ **Mobile-first** layout — converts in two taps on any device

---

## 📑 Submission Details

| Field | Info |
| :--- | :--- |
| **Intern Name** | Yasir Azam |
| **Internship** | Full Stack Web Development — Future Interns |
| **Task** | 03 — Real Local Business Pitch & Build |
| **Repository** | [FUTURE_FS_03](https://github.com/Yasir941/FUTURE_FS_03) |
| **Deployment** | https://cutin-half.vercel.app/ |

---

## 👨‍💻 Developer

<table>
  <tr>
    <td align="center">
      <b>Yasir Azam</b><br/>
      Full Stack Web Development Intern<br/>
      <i>Future Interns — Task 03</i><br/><br/>
      <a href="https://github.com/Yasir941">
        <img src="https://img.shields.io/badge/GitHub-Yasir941-181717?style=for-the-badge&logo=github&logoColor=white" />
      </a>
      <br/><br/>
      <a href="https://www.linkedin.com/in/yasir-azam-1b6205320">
        <img src="https://img.shields.io/badge/LinkedIn-Yasir%20Azam-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

## 📄 License

Built as part of the **Future Interns Full Stack Web Development Internship — Task 3**.

---

<div align="center">

**🔪 Engineered Flavor · Precision Dining · Powered by Next.js**

<br />

<img src="https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat-square&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/Typed%20with-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Animated%20with-Framer%20Motion-A020F0?style=flat-square&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Styled%20with-Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />

<br /><br />

*© 2026 CUT IN HALF. All Rights Reserved.*

</div>