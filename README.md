# CodeMaster Gamified Logic Arena 🚀⚡

Cyberpunk-themed quiz app to practice programming basics. Made with HTML/CSS/JS on the frontend and a local relational engine managing client-side data state structures.

**Live Frontend:** "https://code-master-gamified-logic-arena.vercel.app"

![CodeMaster Pro Logo](CodeMaster%20Pro.jpeg)

---

## What it does

### Gameplay
*   **5 Languages**: HTML5, CSS3, JavaScript, Python, and C. 62 total high-quality algorithmic and conceptual challenges.
*   **Two modes**:
    *   **Easy**: 60-second timer per question with point bonuses awarded for rapid selection.
    *   **Hard**: A brutal, hyper-focused 30-second total countdown for the entire quiz.
*   **Login screen**: Secure client-side auth featuring SHA-256 password hashing and a strict `@chitkara.edu.in` domain lock.
*   **Results**: Comprehensive user analytics showcasing a scrollable 20-run scorecard history and dynamic user profiles.
*   **Leaderboard**: Persistent global rankings hub with a real-time, visual 3D top-3 podium generation sorted per language.
*   **Session handling**: Rigid access control using a blend of `sessionStorage` and `localStorage` auth guards to stop unauthenticated page skipping.

### Design
*   **Cyberpunk look**: High-performance glassmorphism themes utilizing modern backdrop CSS blur filters and localized custom property skins.
*   **Animations**: Layout-relative animated gradient orbs, dynamic cursor-glow tracking, floating particles, and 3D component container tilt shifts.
*   **Responsive**: Fluid, modern layout systems optimized for seamless adaptive viewing across mobile, tablet, and desktop viewports.
*   **Accessible**: ARIA access standards, structural semantic element validation, and structured error handling.

---

## Built with

*   **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JS (ES6+), Web Audio API Oscillators
*   **Security/Data Engine**: Web Crypto API (`SubtleCrypto` SHA-256), LocalStorage / SessionStorage JSON Engines
*   **Fonts**: Space Grotesk & JetBrains Mono from Google Fonts
*   **Hosting**: Static Jamstack architecture completely ready for atomic deployment via Vercel or Netlify

---

## Relational LocalStorage Schema

The localized structural database manages state mechanics through five primary operational keys:

### 1. `codemaster_users`
Stores the global registry of all profile registrations local to the browser client. The unique `id` is generated instantly on the client side using the high-precision timestamp `Date.now().toString()`.
```json
[
  {
    "id": "1716381245000",
    "name": "Alex Singh",
    "email": "alex.singh@chitkara.edu.in",
    "passwordHash": "ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f",
    "gender": "male",
    "createdAt": "2026-05-21T13:54:05.000Z"
  }
]
```

## FILES 

# CodeMaster Gamified Logic Arena/
├── About.html          # Info page detailing rules, platform mechanics, and references.
├── CodeMaster Pro.jpeg # Branding identity asset used for layout images and favicons
├── Leaderboard.html    # Global rankings hub featuring the top-100 table and 3D top-3 podium
├── Learn.html          # Knowledge Matrix switcher hosting documentation and interview Q&As
├── Profile.html        # Analytics panel rendering user stats and a 20-run scorecard history
├── index.html          # Neural Registry UI gate handling login, signup, and domain lock
├── Main.html           # Main Dashboard displaying language selection grids and best score badges
├── Quiz.html           # Core Quiz Engine driving dynamic layout questions, timers, and reviews
├── auth.js             # Core Kernel managing singletons: AuthSystem, ThemeManager, AudioSystem, AIVisualEngine
└── style-new.css       # Style Matrix organizing glassmorphism, visual design layers, themes, and keyframes
