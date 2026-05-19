# CodeMaster Gamified Logic Arena 🚀⚡

Cyberpunk-themed quiz app to practice programming basics. Made with HTML/CSS/JS on the frontend and Flask + SQLite for the backend.

**Live Frontend:** https://code-master-gamified-logic-arena.vercel.app

![CodeMaster Pro Logo](CodeMaster%20Pro.jpeg)

---

## What it does

### Gameplay
*   **5 Languages**: HTML5, CSS3, JavaScript, Python, and C. 62 questions total, each with explanations.
*   **Two modes**:
    *   **Easy**: No timer. Take your time.
    *   **Hard**: 20s per question, 10 min total match time. Auto-submits if time runs out.
*   **Login screen**: 3D cyber grid + rotating core. Only `@chitkara.edu.in` emails allowed.
*   **Results**: Canvas chart showing correct vs wrong. WebAudio API for sound feedback. Tracks your personal best.
*   **Leaderboard**: Flask backend saves your single best score per language using SQLite3.
*   **Session handling**: Client-side checks stop users from skipping pages. Handles login/logout.

### Design
*   **Cyberpunk look**: Glassmorphism, neon glows, `backdrop-filter` effects.
*   **Animations**: Hover effects, grid reveals, radar pings, loading bars.
*   **Responsive**: Works on mobile, tablet, desktop.
*   **Accessible**: ARIA labels, keyboard navigation, clear error messages.

---

## Built with

*   **Frontend**: HTML5, CSS3 Grid/Flexbox, Vanilla JS ES6+, WebAudio API, Canvas API
*   **Backend**: Python, Flask, SQLite3, Flask-CORS
*   **Fonts**: Space Grotesk & JetBrains Mono from Google Fonts
*   **Hosting**: Vercel for Frontend

---

## Files

```text
JS NEW/
├── backend/
│   ├── backend.py            # Flask API for /get-questions/<lang> & /save-score
│   └── quiz_scores.db        # SQLite DB, auto-creates on first run
├── About.html                # Info page about the platform
├── CodeMaster Pro.jpeg       # Logo / favicon
├── Leaderboard.html          # Top 10 scores table
├── index.html                # Login page with 3D effects + email validation
├── Main.html                 # Dashboard with language selection
├── questions.json            # All 62 quiz questions + answers
├── Quiz.html                 # Main quiz layout
├── script.js                 # Game logic, timers, scoring, audio
└── style.css                 # All styling, theme, animations