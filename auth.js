/* ========== AUTH SYSTEM ========== */
/* Client-side password hashing with SubtleCrypto */

class AuthSystem {
  constructor() {
    this.storageKey = 'codemaster_users';
    this.sessionKey = 'codemaster_user';
    this.initUsers();
  }

  initUsers() {
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  async hashPassword(password) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return this.simpleHash(password);
    }
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || [];
    } catch (e) {
      console.error('Error reading users:', e);
      return [];
    }
  }

  saveUsers(users) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users:', e);
      throw new Error('Failed to save user data. Please check storage permissions.');
    }
  }

  async signup(name, email, password, gender) {
    if (!name || !email || !password || !gender) {
      throw new Error('All fields are required');
    }

    if (!email.endsWith('@chitkara.edu.in')) {
      throw new Error('Only @chitkara.edu.in emails are allowed');
    }

    const users = this.getUsers();
    if (users.some(u => u.email === email.toLowerCase())) {
      throw new Error('Email already registered');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const passwordHash = await this.hashPassword(password);
    const newUser = {
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      gender,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);
    return newUser;
  }

  async login(name, email, password) {
    // Validation
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail.endsWith('@chitkara.edu.in')) {
      throw new Error('Only @chitkara.edu.in emails are allowed');
    }

    const users = this.getUsers();

    // FIX: Match by email only first, then verify name case-insensitively
    const user = users.find(u => u.email === normalizedEmail);

    if (!user) {
      throw new Error('Email not found. Please sign up first.');
    }

    // Case-insensitive name check
    if (user.name.toLowerCase() !== name.toLowerCase()) {
      throw new Error('Name does not match the registered account.');
    }

    const passwordHash = await this.hashPassword(password);

    if (user.passwordHash !== passwordHash) {
      throw new Error('Incorrect password');
    }

    // Create session (exclude password hash)
    const session = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      loginTime: new Date().toISOString()
    };

    sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
    return session;
  }

  getCurrentUser() {
    try {
      const session = sessionStorage.getItem(this.sessionKey);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  logout() {
    sessionStorage.removeItem(this.sessionKey);
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }
}

// Global instance
const auth = new AuthSystem();

// ========== THEME MANAGER ==========
class ThemeManager {
  constructor() {
    this.storageKey = 'codemaster_theme';
    this.loadTheme();
  }

  loadTheme() {
    const saved = localStorage.getItem(this.storageKey);
    const theme = saved || this.getSystemPreference();
    this.setTheme(theme);
  }

  getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem(this.storageKey, theme);
  }

  toggle() {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }

  getCurrentTheme() {
    return document.body.classList.contains('light-mode') ? 'light' : 'dark';
  }
}

const themeManager = new ThemeManager();

// ========== AUDIO SYSTEM ==========
class AudioSystem {
  constructor() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Audio context not available:', e);
      this.audioCtx = null;
    }
  }

  ensureRunning() {
    if (!this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playInteractionSound() {
    if (!this.audioCtx) return;
    this.ensureRunning();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.04);
  }

  playCorrectSound() {
    if (!this.audioCtx) return;
    this.ensureRunning();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523, this.audioCtx.currentTime);
    osc.frequency.setValueAtTime(659, this.audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(784, this.audioCtx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.4);
  }

  playWrongSound() {
    if (!this.audioCtx) return;
    this.ensureRunning();
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.3);
  }
}

const audio = new AudioSystem();

// Attach audio + theme toggle on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const interactiveElements = document.querySelectorAll(
    '.lang-card, .diff-card, .btn-login, .btn-primary, .option-btn, .nav-link-btn, .gender-chip, .btn-toggle'
  );
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => audio.playInteractionSound());
  });

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      themeManager.toggle();
      themeToggle.textContent = themeManager.getCurrentTheme() === 'light' ? '🌙' : '☀️';
    });
    themeToggle.textContent = themeManager.getCurrentTheme() === 'light' ? '🌙' : '☀️';
  }
});

/* ========================================================
   ADVANCED AI INTERACTION ENGINE
   ======================================================== */

class AIVisualEngine {

  constructor() {
    this.createOrbs();
    this.createParticles();
    this.createCursorGlow();
    this.enableRevealAnimations();
    this.enable3DTilt();
    this.enableMagneticButtons();
  }

  createOrbs() {

    const orb1 = document.createElement('div');
    orb1.className = 'ai-orb one';

    const orb2 = document.createElement('div');
    orb2.className = 'ai-orb two';

    document.body.appendChild(orb1);
    document.body.appendChild(orb2);
  }

  createParticles() {

    const particles = document.createElement('div');
    particles.className = 'ai-particles';

    for (let i = 0; i < 40; i++) {

      const p = document.createElement('span');

      p.style.left = Math.random() * 100 + '%';

      p.style.animationDuration =
        (10 + Math.random() * 15) + 's';

      p.style.animationDelay =
        Math.random() * 10 + 's';

      p.style.width =
      p.style.height =
        (2 + Math.random() * 8) + 'px';

      particles.appendChild(p);
    }

    document.body.appendChild(particles);
  }

  createCursorGlow() {

    if (window.innerWidth < 768) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';

    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {

      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  enableRevealAnimations() {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });

    }, {
      threshold: 0.1
    });

    document.querySelectorAll(
      '.glass-card, section, header, .podium-item'
    ).forEach(el => {

      el.classList.add('reveal-up');

      observer.observe(el);
    });
  }

  enable3DTilt() {

    document.querySelectorAll('.glass-card').forEach(card => {

      card.addEventListener('mousemove', (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY =
          ((x / rect.width) - 0.5) * 12;

        const rotateX =
          ((y / rect.height) - 0.5) * -12;

        card.style.transform = `
          perspective(1200px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-10px)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  enableMagneticButtons() {

    document.querySelectorAll('button').forEach(btn => {

      btn.addEventListener('mousemove', (e) => {

        const rect = btn.getBoundingClientRect();

        const x =
          e.clientX - rect.left - rect.width / 2;

        const y =
          e.clientY - rect.top - rect.height / 2;

        btn.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {

  new AIVisualEngine();
});