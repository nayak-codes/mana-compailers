# 🖥️ Our Compiler — Free Online Code Compiler

[![Live Site](https://img.shields.io/badge/Live-ourcompiler.com-blue?style=for-the-badge)](https://www.ourcompiler.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Backend-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge)](https://render.com/)

> **Write · Compile · Execute — Instantly**  
> A fully browser-based, multi-language online compiler with zero setup, zero login, and zero cost.

---

## 🌐 Live Demo

**→ [https://www.ourcompiler.com](https://www.ourcompiler.com)**

---

## ✨ Features

- ⚡ **Lightning Fast Execution** — Docker-isolated containers run your code in under 2 seconds
- 📝 **Monaco Editor** — The same engine powering VS Code (syntax highlighting, auto-complete, smart indentation)
- 🌍 **9 Programming Languages** — Python, Java, C, C++, JavaScript, Go, Rust, PHP, Ruby
- 🔒 **Privacy First** — Code is never stored; complete sandbox isolation
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- ✨ **Zero Setup** — No installation, no account, no terminal needed
- 📚 **Free Tutorials** — W3Schools-style tutorials for every supported language
- 🖥️ **Interactive Terminal** — Supports `stdin` input for programs that read user input
- 🔀 **Resizable Panels** — Drag to resize editor / output panels
- 💾 **Auto-Save** — Code auto-saved to localStorage per language

---

## 🗣️ Supported Languages

| Language | ID | Version | Icon |
|---|---|---|---|
| Python 3 | `python3` | 3.x | 🐍 |
| Java | `java` | 17+ | ☕ |
| C | `c` | GCC | 🔵 |
| C++ | `cpp17` | C++17 | ⚡ |
| JavaScript | `nodejs` | Node.js | 🟡 |
| Go | `go` | 1.21+ | 🐹 |
| Rust | `rust` | stable | 🦀 |
| PHP | `php` | 8.x | 🐘 |
| Ruby | `ruby` | 3.x | 💎 |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                   FRONTEND (React + Vite)             │
│                   ourcompiler.com                     │
│                                                       │
│  ┌─────────────┐    ┌──────────────┐                 │
│  │  Monaco     │    │   Terminal   │                 │
│  │  Editor     │◄──►│   Output     │                 │
│  └─────────────┘    └──────────────┘                 │
│         │                                             │
│         ▼  POST /api/run                              │
│  ┌─────────────────────────────┐                     │
│  │    Local Express Server     │                     │
│  │    server/index.js          │                     │
│  │    (port 3002, dev only)    │                     │
│  └─────────────────────────────┘                     │
│         │                                             │
│         ▼  Proxy to Docker Backend                   │
└──────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│        DOCKER BACKEND (Render.com)                    │
│  mana-compailer-backend-docker.onrender.com           │
│                                                       │
│  • Spins up isolated Docker containers per request    │
│  • Compiles & runs code securely (sandboxed)          │
│  • Returns stdout, stderr, exit code                  │
│  • Supports stdin forwarding                          │
└──────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
mana-compiler/
├── index.html              # Root HTML — React app entry point
├── package.json            # Dependencies & npm scripts
├── vite.config.js          # Vite build configuration
├── vercel.json             # Vercel/deploy routing config
│
├── src/                    # React frontend source
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Main app component (compiler + home page)
│   ├── languages.js        # Language list, IDs, templates
│   └── index.css           # Global dark-mode CSS variables & styles
│
├── server/                 # Local Express proxy server (dev)
│   └── index.js            # Proxies /api/run → Docker backend
│
├── api/                    # Serverless API route (Vercel/production)
│   └── run.js              # Forwards code execution requests
│
└── public/                 # Static public files (served as-is)
    ├── blog-python.html    # Python tutorial (W3Schools style)
    ├── blog-java.html      # Java tutorial
    ├── blog-c.html         # C tutorial
    ├── blog-cpp.html       # C++ tutorial
    ├── blog-javascript.html# JavaScript tutorial
    ├── blog-go.html        # Go tutorial
    ├── blog-rust.html      # Rust tutorial
    ├── blog-php.html       # PHP tutorial
    ├── blog-ruby.html      # Ruby tutorial
    ├── blog.html           # Tutorials index page
    ├── about.html          # About page
    ├── features.html       # Features page
    ├── contact.html        # Contact page
    ├── privacy-policy.html # Privacy policy (required for AdSense)
    ├── ads.txt             # Google AdSense ads.txt
    ├── robots.txt          # Search engine crawl rules
    ├── sitemap.xml         # SEO sitemap
    └── logo.png            # Site logo / favicon
```

---

## ⚙️ How It Works — Step by Step

### 1. User Opens the Site
- React app loads at `ourcompiler.com`
- **Home page** shows: language picker, tutorials grid, features
- URL params: `?lang=python3` opens compiler directly for that language

### 2. Language Selection
- User clicks a language card → `selectLanguage(id)` called
- Code template loads from `TEMPLATES` (stored in `languages.js`)
- Previously written code restored from `localStorage`
- URL updated: `?lang=python3` (browser back button works!)

### 3. Code Editing
- **Monaco Editor** (`@monaco-editor/react`) renders with:
  - Correct language syntax highlighting
  - Auto-complete & indentation
  - Dark theme (`vs-dark`)
  - JetBrains Mono font

### 4. Code Execution
```
User clicks "▶ Run Code"
    │
    ▼
Frontend: POST /api/run
    body: { language, code, stdin }
    │
    ▼
Docker Backend (Render):
    - Spins up isolated container
    - Compiles code (GCC for C/C++, javac for Java, etc.)
    - Executes with 10s timeout
    - Returns: { output, error, exitCode }
    │
    ▼
Frontend: Displays output in terminal panel
    - Green text for success
    - Red highlighted text for errors
    - Execution time shown (e.g., "⏱ 0.42s · Python 3")
```

### 5. Interactive stdin Support
- Programs that use `input()` (Python), `Scanner` (Java), `scanf` (C), etc. trigger an **interactive terminal mode**
- User types input directly in the terminal → code re-executes with that input
- Supports multiple stdin inputs in sequence

### 6. Panel Layout
- **Editor panel** (left) + **Terminal panel** (right)
- Drag the **resizer bar** to adjust width ratio
- **Maximize buttons** (⛶) expand either panel to full width
- **Swap button** flips editor and terminal positions

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18 or higher
- **npm** v8+
- **Git**

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/nayak-codes/mana-compailers.git
cd mana-compailers

# 2. Install dependencies
npm install

# 3. Start the dev server (frontend + local proxy backend)
npm run dev
```

The app runs at:
- **Frontend:** http://localhost:5173
- **Local Proxy Server:** http://localhost:3002

> The local server proxies code execution requests to the **Render Docker backend** — no local Docker setup required!

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start frontend (Vite) + local proxy server together |
| `npm run client` | Start only the Vite frontend |
| `npm run server` | Start only the local Express proxy server |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview the production build locally |

---

## 🌐 Deployment

### Frontend — GitHub + Render (Auto Deploy)
1. Push to `master` branch → Render auto-deploys
2. Static files served from `/dist` after `npm run build`

### Backend — Docker on Render
- Separate repo: `nayak-codes/mana-compailer-backend`
- Runs Docker containers for each language
- URL: `https://mana-compailer-backend-docker.onrender.com`
- **Note:** Free tier spins down after inactivity → first request may take ~30s (cold start)
- **Warmup ping** sent automatically on page load to minimize cold start

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 |
| **Build Tool** | Vite 5 |
| **Code Editor** | Monaco Editor (`@monaco-editor/react`) |
| **Styling** | Vanilla CSS (CSS Variables, dark mode) |
| **Local Server** | Express.js (proxy only) |
| **Backend Execution** | Docker containers (per language) |
| **Hosting** | Render.com |
| **Font** | JetBrains Mono + Sora (Google Fonts) |
| **Version Control** | Git + GitHub |

---

## 💰 Monetization

- **Google AdSense** integrated on all pages (`ca-pub-7028247458903242`)
- `ads.txt` file present at `/ads.txt` for authorized sellers verification
- AdSense approval pending — ads will auto-display after approval

---

## 📈 SEO

- `sitemap.xml` lists all pages for search engine indexing
- `robots.txt` allows all crawlers
- Semantic HTML with proper `<h1>`, `<meta>` descriptions on all pages
- Open Graph meta tags on tutorial pages
- Google AdSense meta tag: `<meta name="google-adsense-account">`

---

## 🛡️ Security & Privacy

- **No code storage** — all executions are stateless
- **Docker sandboxing** — each run is isolated in its own container
- **No user accounts** — completely anonymous usage
- **CORS** configured on backend to allow frontend requests only
- **Privacy Policy** page available at `/privacy-policy.html`

---

## 📚 Tutorial Pages

Each language has a dedicated W3Schools-style tutorial at `/blog-{language}.html`:

- Left sidebar navigation
- Syntax-highlighted code examples
- Run examples directly in the compiler
- Topics: Variables, Data Types, Control Flow, Functions, OOP, etc.

---

## 🤝 Contributing

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ...

# Commit
git commit -m "feat: describe your change"

# Push
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

---

## 📄 License

This project is proprietary. All rights reserved © 2026 Our Compiler.

---

## 👨‍💻 Built By

**Nayak Codes** — Built with ❤️ for developers, students, and learners worldwide.

> **ourcompiler.com** — Free online code compiler. No downloads. No accounts. Just code.
