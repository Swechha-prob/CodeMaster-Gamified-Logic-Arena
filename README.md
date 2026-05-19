# CodeMaster Gamified Logic Arena 🚀⚡

A cyberpunk-themed interactive quiz platform designed for mastering programming fundamentals. Built using a lightweight vanilla HTML/CSS/JS frontend, a Flask backend, and an SQLite leaderboard.

![CodeMaster Pro Logo](CodeMaster%20Pro.jpeg)

---

## 🌟 Features

### Core Functionality
*   **5 Supported Languages**: HTML5, CSS3, JavaScript, Python, and C — featuring 62 total questions complete with detailed explanations.
*   **2 Game Modes**:
    *   **Easy**: No timers, learn at your own pace.
    *   **Hard**: 20-second question timer + 10-minute total match limit with automatic timeout submission.
*   **3D Neon Login**: Interactive cyber grid floor with a rotating core. Domain-restricted to `@chitkara.edu.in` emails.
*   **Live Performance Analytics**: HTML5 Canvas chart breaking down correct vs. wrong answers alongside your personal best. Includes interactive WebAudio API sound feedback.
*   **Persistent Leaderboard**: Flask + SQLite3 backend dynamically tracks and stores the single best score per user, per language.
*   **Secure Session Management**: Client-side auth guards prevent page bypassing, handles user profiles, and manages clean logouts.

### UI/UX & Design
*   **Cyberpunk Aesthetic**: Modern glassmorphism design featuring neon glows utilizing CSS `backdrop-filter`.
*   **Micro-interactions**: High-fidelity animated hover states, tech grid reveals, radar pings, and laser loading bars.
*   **Fully Responsive**: Seamless layout transitions across mobile, tablet, and desktop viewports.
*   **Accessibility**: Built with ARIA labels, semantic markup, full keyboard navigation compatibility, and clear error alerts.

---

## 🛠️ Tech Stack

*   **Frontend**: HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JavaScript (ES6+), WebAudio API, Canvas API.
*   **Backend**: Python, Flask, SQLite3, Flask-CORS.
*   **Fonts**: Space Grotesk & JetBrains Mono via Google Fonts.

---

## 📂 Project Structure

```text
JS NEW/
├── backend/
│   ├── backend.py            # Flask API: Handles /get-questions/<lang> & /save-score
│   └── quiz_scores.db        # SQLite leaderboard database (Auto-generated)
├── About.html                # Platform features and showcase info
├── CodeMaster Pro.jpeg       # Project logo / Favicon asset
├── Leaderboard.html          # Global top 10 scores ranking table
├── index.html                # 3D interactive login portal with domain validation
├── Main.html                 # Main dashboard layout with dynamic language cards
├── questions.json            # Base dataset of 62 quiz questions + explanations
├── Quiz.html                 # Core quiz container layout shell
├── script.js                 # Core engine: Game loops, timers, scoring, WebAudio
└── style.css                 # Master stylesheet: Cyberpunk theme & animations