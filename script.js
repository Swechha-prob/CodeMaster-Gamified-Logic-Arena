// ========== CODEMASTER QUIZ SYSTEM ==========
// Pure client-side quiz with localStorage persistence

// Language definitions
const languages = [
  { id: "html", name: "HTML5", icon: "🌐", color: "#e34c26" },
  { id: "css", name: "CSS3", icon: "🎨", color: "#264de4" },
  { id: "js", name: "JavaScript", icon: "🟨", color: "#f7df1e" },
  { id: "py", name: "Python", icon: "🐍", color: "#3776ab" },
  { id: "c", name: "C Programming", icon: "🔵", color: "#a8b9cc" }
];

// Local question bank
const QUESTIONS_DB = {
  html: [
    { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], a: 0, explanation: "HTML = HyperText Markup Language. It's the standard for creating web pages." },
    { q: "Which tag creates a hyperlink?", o: ["<link>", "<a>", "<href>", "<url>"], a: 1, explanation: "The <a> anchor tag with href attribute creates links." },
    { q: "Which tag is for largest heading?", o: ["<h6>", "<head>", "<h1>", "<header>"], a: 2, explanation: "<h1> is largest, <h6> is smallest." },
    { q: "Which HTML element is used to define an unordered list?", o: ["<ol>", "<list>", "<ul>", "<li>"], a: 2, explanation: "<ul> defines an unordered (bulleted) list in HTML." },
    { q: "What is the correct HTML element for inserting a line break?", o: ["<break>", "<lb>", "<br>", "<newline>"], a: 2, explanation: "<br> is the correct self-closing tag for inserting a line break." },
    { q: "Which HTML5 semantic tag should be used for the main content of the page?", o: ["<section>", "<main>", "<article>", "<aside>"], a: 1, explanation: "<main> tag specifies the main content of an HTML document." },
    { q: "What attribute is used to provide alternative text for an image?", o: ["title", "alt", "src", "desc"], a: 1, explanation: "The alt attribute provides alternative text for an image if it cannot be displayed." },
    { q: "Which tag defines a form in HTML?", o: ["<input>", "<form>", "<button>", "<label>"], a: 1, explanation: "<form> is used to collect user input through various form elements." },
    { q: "What does the <meta> tag define?", o: ["Metadata", "Main content", "Navigation", "Footer"], a: 0, explanation: "<meta> tags define metadata about an HTML document." },
    { q: "Which attribute specifies a unique identifier for an element?", o: ["class", "id", "name", "type"], a: 1, explanation: "The id attribute specifies a unique identifier for an element." },
    { q: "What is the difference between <div> and <span>?", o: ["Both are same", "<div> is block, <span> is inline", "<span> is block, <div> is inline", "No difference"], a: 1, explanation: "<div> is a block-level element, while <span> is an inline element." },
    { q: "Which tag is used to create a table in HTML?", o: ["<table>", "<tab>", "<tbl>", "<t>"], a: 0, explanation: "<table> tag defines a table in HTML." },
    { q: "What does the <iframe> tag do?", o: ["Creates italic", "Embeds external page", "Creates image frame", "None"], a: 1, explanation: "<iframe> is used to embed another HTML page within the current page." }
  ],
  css: [
    { q: "What does CSS stand for?", o: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], a: 1, explanation: "CSS = Cascading Style Sheets." },
    { q: "Which property changes text color?", o: ["font-color", "text-color", "color", "fgcolor"], a: 2, explanation: "The 'color' property sets text color in CSS." },
    { q: "How do you select an element with id='demo'?", o: [".demo", "#demo", "*demo", "demo"], a: 1, explanation: "# is used for ID selectors in CSS." },
    { q: "Which property is used for background color?", o: ["bg-color", "background-color", "color-bg", "bgcolor"], a: 1, explanation: "background-color sets the background color of an element." },
    { q: "What is the correct syntax for a comment in CSS?", o: ["// comment", "# comment", "/* comment */", "<!-- comment -->"], a: 2, explanation: "CSS comments use /* and */ syntax." },
    { q: "Which property controls the text size?", o: ["text-size", "font-size", "size", "text-height"], a: 1, explanation: "font-size property controls the size of text in CSS." },
    { q: "How many times can you declare the same class selector?", o: ["Only once", "Twice", "Multiple times", "Never"], a: 2, explanation: "You can declare the same class selector multiple times." },
    { q: "What does CSS Box Model include?", o: ["Margin only", "Margin, Border, Padding, Content", "Content only", "Border and Content"], a: 1, explanation: "The CSS Box Model consists of Margin, Border, Padding, and Content." },
    { q: "Which property is used to create space inside an element's border?", o: ["margin", "padding", "spacing", "border-space"], a: 1, explanation: "padding creates space inside an element's border." },
    { q: "What does 'position: absolute' do?", o: ["Positions relative to document", "Positions relative to nearest positioned ancestor", "Fixed position", "None of above"], a: 1, explanation: "position: absolute positions relative to the nearest positioned ancestor." },
    { q: "How do you make text bold in CSS?", o: ["text-bold", "font-weight: bold", "bold-text", "weight: bold"], a: 1, explanation: "font-weight: bold makes text bold in CSS." },
    { q: "Which CSS property controls the stacking order of elements?", o: ["order", "z-index", "stack", "layer"], a: 1, explanation: "z-index property controls the stacking order of elements." },
    { q: "What is the default value of position property?", o: ["fixed", "absolute", "static", "relative"], a: 2, explanation: "The default value of position property is static." }
  ],
  js: [
    { q: "Which keyword declares a variable?", o: ["var", "int", "string", "dim"], a: 0, explanation: "var, let, and const declare variables in JavaScript." },
    { q: "What does '===' do?", o: ["Assigns value", "Compares value only", "Compares value and type", "Not an operator"], a: 2, explanation: "=== checks both value and type, unlike ==." },
    { q: "How do you write a comment?", o: ["<!-- comment -->", "// comment", "/* comment */", "Both // and /* */"], a: 3, explanation: "JavaScript supports // for single line and /* */ for multi-line comments." },
    { q: "What does JSON stand for?", o: ["JavaScript Object Notation", "Java System Object Notation", "JavaScript Online Notation", "None"], a: 0, explanation: "JSON = JavaScript Object Notation." },
    { q: "Which method is used to access HTML elements using JavaScript?", o: ["getElementById", "getElementByClass", "Both", "querySelector"], a: 0, explanation: "getElementById is used to access elements by their ID." },
    { q: "What is the output of typeof NaN?", o: ["NaN", "undefined", "number", "string"], a: 2, explanation: "typeof NaN returns 'number'." },
    { q: "Which of the following is NOT a JavaScript data type?", o: ["String", "Number", "Array", "None"], a: 2, explanation: "Array is an object type, not a primitive data type." },
    { q: "What does the 'this' keyword refer to?", o: ["The window object", "The current object", "The global object", "Depends on context"], a: 3, explanation: "'this' refers to the object that invoked the function (context-dependent)." },
    { q: "How do you create a function in JavaScript?", o: ["function myFunc() {}", "def myFunc():", "function: myFunc()", "func myFunc() {}"], a: 0, explanation: "JavaScript functions are created with 'function' keyword." },
    { q: "What does forEach do?", o: ["Loops through array", "Returns new array", "Creates copy", "Modifies original"], a: 0, explanation: "forEach iterates through each element of an array." },
    { q: "Which method converts JSON to JavaScript object?", o: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"], a: 0, explanation: "JSON.parse() converts JSON string to JavaScript object." },
    { q: "What is the purpose of 'async' keyword?", o: ["Creates asynchronous function", "Creates variable", "Creates loop", "Caches data"], a: 0, explanation: "'async' keyword is used to create asynchronous functions that return a Promise." },
    { q: "What does Promise.all() do?", o: ["Runs promises sequentially", "Waits for all promises", "Cancels promises", "None"], a: 1, explanation: "Promise.all() waits for all promises in an array to resolve." },
    { q: "Which array method returns a new filtered array?", o: ["forEach", "map", "filter", "reduce"], a: 2, explanation: "filter() returns a new array with elements that pass the test." }
  ],
  py: [
    { q: "How do you print in Python?", o: ["echo()", "print()", "console.log()", "printf()"], a: 1, explanation: "print() is the built-in function for output in Python." },
    { q: "Which symbol starts a comment?", o: ["//", "#", "/*", "--"], a: 1, explanation: "# starts single line comments in Python." },
    { q: "What is the file extension for Python?", o: [".py", ".python", ".pt", ".p"], a: 0, explanation: "Python files use .py extension." },
    { q: "How do you create a list in Python?", o: ["list = []", "list = {}", "list = ()", "list = <>"], a: 0, explanation: "Lists in Python are created using square brackets []." },
    { q: "Which keyword is used to create a function?", o: ["function", "def", "func", "define"], a: 1, explanation: "'def' keyword is used to define a function in Python." },
    { q: "What does len() do?", o: ["Creates length", "Gets length", "Sets length", "Compares length"], a: 1, explanation: "len() returns the length (number of items) of an object." },
    { q: "How do you check data type in Python?", o: ["type()", "datatype()", "check_type()", "get_type()"], a: 0, explanation: "type() function returns the data type of an object." },
    { q: "What is the correct indentation in Python?", o: ["Optional", "Required", "Depends on coder", "Never used"], a: 1, explanation: "Indentation is required in Python to define code blocks." },
    { q: "Which method is used to join strings?", o: ["concat()", "join()", "merge()", "combine()"], a: 1, explanation: "join() method joins string elements of an iterable." },
    { q: "What does None represent in Python?", o: ["Zero", "Null/Empty value", "False", "Empty string"], a: 1, explanation: "None represents a null or empty value in Python." },
    { q: "How do you import a module in Python?", o: ["include module", "import module", "use module", "load module"], a: 1, explanation: "'import' keyword is used to import modules in Python." },
    { q: "What is a Python dictionary?", o: ["Ordered list", "Key-value pair collection", "String array", "Number array"], a: 1, explanation: "A dictionary is an unordered collection of key-value pairs." }
  ],
  c: [
    { q: "Which function is the entry point of a C program?", o: ["start()", "main()", "run()", "execute()"], a: 1, explanation: "Every C program starts execution from main() function." },
    { q: "How do you include stdio.h?", o: ["import stdio.h", "#include <stdio.h>", "using stdio", "#import stdio"], a: 1, explanation: "#include <stdio.h> adds standard I/O library in C." },
    { q: "What symbol ends a statement in C?", o: [".", ":", ";", ","], a: 2, explanation: "Semicolon (;) terminates statements in C." },
    { q: "How do you declare an integer variable?", o: ["int x;", "integer x;", "var x;", "x int;"], a: 0, explanation: "'int x;' is the correct way to declare an integer in C." },
    { q: "What does printf() do?", o: ["Reads input", "Prints output", "Creates variable", "Loops"], a: 1, explanation: "printf() is used to print formatted output in C." },
    { q: "Which header file is needed for string functions?", o: ["cstring.h", "string.h", "text.h", "str.h"], a: 1, explanation: "string.h header file contains string manipulation functions in C." },
    { q: "What is the size of int in C?", o: ["1 byte", "2 bytes", "4 bytes (typically)", "8 bytes"], a: 2, explanation: "int is typically 4 bytes on modern systems." },
    { q: "How do you create a pointer in C?", o: ["*ptr;", "ptr*;", "ptr &;", "&ptr;"], a: 0, explanation: "'*ptr;' is the correct syntax to declare a pointer." },
    { q: "What does & operator do?", o: ["AND operation", "Reference address", "Dereference", "None"], a: 1, explanation: "& operator returns the address of a variable." },
    { q: "What is a structure in C?", o: ["Function", "Collection of variables", "Array", "Loop"], a: 1, explanation: "A structure is a collection of variables of different data types." }
  ]
};

// Quiz state
let user = null;
let langId = localStorage.getItem('selectedLang') || 'html';
let lang = languages.find(l => l.id === langId) || languages[0];

let phase = 'difficulty';
let mode = 'easy';
let questions = [];
let currentQ = 0;
let score = 0;
let answered = false;
let selectedIdx = -1;
let answerResults = [];

// Timer variables
let totalTimeLeft = 600;
let questionTimeLeft = 20;
let totalTimerInterval = null;
let questionTimerInterval = null;

// Auth guard
document.addEventListener('DOMContentLoaded', () => {
  if (!auth || !auth.isAuthenticated()) {
    window.location.href = 'index.html';
    return;
  }

  user = auth.getCurrentUser();

  // Set body data-lang for dynamic background
  document.body.setAttribute('data-lang', lang.id);

  initializeQuiz();
});

function initializeQuiz() {
  const app = document.getElementById('app');
  if (!app) return;

  // Add navbar
  if (!document.querySelector('.navbar')) {
    const navbar = document.createElement('header');
    navbar.className = 'navbar';
    navbar.innerHTML = `
      <div class="inner">
        <div class="logo" onclick="window.location.href='Main.html'" role="link" aria-label="CodeMaster Pro Home" style="cursor:pointer;">
          <span aria-hidden="true">⌨️</span> CodeMaster <span class="dot">Quiz</span>
        </div>
        <nav class="nav-links" aria-label="Main Navigation">
          <button class="nav-link-btn" onclick="window.location.href='Main.html'">
            <span aria-hidden="true">🏠</span> <span class="label">Home</span>
          </button>
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">☀️</button>
          <button class="nav-link-btn" onclick="logout()" style="color:var(--danger);">
            <span aria-hidden="true">🚪</span>
          </button>
        </nav>
      </div>
    `;
    document.body.insertBefore(navbar, app);

    // Init theme toggle after inserting
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.textContent = themeManager.getCurrentTheme() === 'light' ? '🌙' : '☀️';
      themeToggle.addEventListener('click', () => {
        themeManager.toggle();
        themeToggle.textContent = themeManager.getCurrentTheme() === 'light' ? '🌙' : '☀️';
      });
    }
  }

  phase = 'difficulty';
  render();
}

function logout() {
  auth.logout();
  window.location.href = 'index.html';
}

function getBestScoreKey() {
  return `codemaster_best_${user.email}_${lang.id}`;
}

function getBestScore() {
  return parseInt(localStorage.getItem(getBestScoreKey()) || '0', 10);
}

function saveBestScore(s) {
  if (s > getBestScore()) localStorage.setItem(getBestScoreKey(), s);
}

function getLeaderboardKey() {
  return `codemaster_leaderboard_${lang.id}`;
}

function saveToLocalLeaderboard(scoreData) {
  const key = getLeaderboardKey();
  const board = JSON.parse(localStorage.getItem(key) || '[]');
  board.push({ ...scoreData, date: new Date().toISOString() });
  board.sort((a, b) => b.scorePercentage - a.scorePercentage);
  localStorage.setItem(key, JSON.stringify(board.slice(0, 100)));
}

function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function startTotalTimer() {
  totalTimerInterval = setInterval(() => {
    totalTimeLeft--;
    updateTimerDisplay();
    if (totalTimeLeft <= 0) finishQuiz();
  }, 1000);
}

function startQuestionTimer() {
  questionTimeLeft = 20;
  if (questionTimerInterval) clearInterval(questionTimerInterval);
  questionTimerInterval = setInterval(() => {
    questionTimeLeft--;
    updateTimerDisplay();
    if (questionTimeLeft <= 0) handleAnswer(-1, true);
  }, 1000);
}

function updateTimerDisplay() {
  const totalEl = document.getElementById('totalTimer');
  const qEl = document.getElementById('questionTimer');
  if (totalEl) totalEl.textContent = formatTime(totalTimeLeft);
  if (qEl) {
    qEl.textContent = formatTime(Math.max(0, questionTimeLeft));
    const fillEl = document.getElementById('questionTimerFill');
    if (fillEl) {
      const percent = (questionTimeLeft / 20) * 100;
      fillEl.style.width = percent + '%';
      fillEl.className = 'timer-fill ' + (questionTimeLeft <= 5 ? 'warning' : 'ok');
    }
  }
}

function initQuiz(selectedMode) {
  if (totalTimerInterval) clearInterval(totalTimerInterval);
  if (questionTimerInterval) clearInterval(questionTimerInterval);

  mode = selectedMode;
  phase = 'quiz';
  const sourceData = QUESTIONS_DB[lang.id] || [];

  if (sourceData.length === 0) {
    alert('No questions available');
    window.location.href = 'Main.html';
    return;
  }

  questions = shuffleArray(sourceData);
  currentQ = 0;
  score = 0;
  answered = false;
  selectedIdx = -1;
  answerResults = [];

  if (mode === 'hard') {
    totalTimeLeft = 600;
    startTotalTimer();
    startQuestionTimer();
  }

  render();
}

function handleAnswer(idx, isTimeout = false) {
  if (answered) return;
  answered = true;

  if (questionTimerInterval) clearInterval(questionTimerInterval);

  const current = questions[currentQ];
  const isCorrect = idx === current.a;

  if (isCorrect) {
    score++;
    audio.playCorrectSound();
  } else {
    audio.playWrongSound();
  }

  answerResults.push({
    question: current.q,
    userAnswer: idx,
    correctAnswer: current.a,
    correct: isCorrect
  });

  selectedIdx = idx;
  render();
}

function nextQuestion() {
  if (currentQ < questions.length - 1) {
    currentQ++;
    answered = false;
    selectedIdx = -1;
    if (mode === 'hard') startQuestionTimer();
    render();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  if (totalTimerInterval) clearInterval(totalTimerInterval);
  if (questionTimerInterval) clearInterval(questionTimerInterval);

  const scorePercent = Math.round((score / questions.length) * 100);
  const scoreData = {
    name: user.name,
    email: user.email,
    lang: lang.id,
    score: score,
    total: questions.length,
    scorePercentage: scorePercent,
    mode: mode
  };

  saveToLocalLeaderboard(scoreData);
  saveBestScore(scorePercent);

  phase = 'results';
  render();
}

function render() {
  const app = document.getElementById('app');
  if (!app) return;

  if (phase === 'difficulty') renderDifficulty();
  else if (phase === 'quiz') renderQuiz();
  else if (phase === 'results') renderResults();
}

function renderDifficulty() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="animate-slide-up" style="text-align:center; max-width:600px; margin:0 auto;">
      <h1 style="font-size:2.5rem; margin-bottom:1rem; color:var(--primary);">${lang.name} Challenge</h1>
      <p style="color:var(--fg-muted); margin-bottom:3rem; font-size:1.125rem;">Select your difficulty level</p>
      
      <div class="diff-grid">
        <article class="diff-card easy" onclick="initQuiz('easy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter') initQuiz('easy')">
          <h3 style="margin-bottom:0.5rem; font-size:1.25rem;">🟢 Easy</h3>
          <p style="color:var(--fg-muted); margin-bottom:1rem;">Unlimited time, test your knowledge</p>
          <p style="font-size:0.875rem; font-family:var(--font-mono);">${QUESTIONS_DB[lang.id].length} questions</p>
        </article>
        
        <article class="diff-card hard" onclick="initQuiz('hard')" role="button" tabindex="0" onkeydown="if(event.key==='Enter') initQuiz('hard')">
          <h3 style="margin-bottom:0.5rem; font-size:1.25rem;">🔴 Hard</h3>
          <p style="color:var(--fg-muted); margin-bottom:1rem;">20s per question, 10min total</p>
          <p style="font-size:0.875rem; font-family:var(--font-mono);">Against the clock</p>
        </article>
      </div>
    </div>
  `;
}

function renderQuiz() {
  const app = document.getElementById('app');
  const current = questions[currentQ];
  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  const timersHTML = mode === 'hard'
    ? `
      <div style="display:flex; gap:2rem; justify-content:center; margin-bottom:1.5rem; text-align:center;">
        <div>
          <p style="font-size:0.75rem; color:var(--fg-muted); margin-bottom:0.25rem;">TOTAL TIME</p>
          <p id="totalTimer" style="font-size:1.5rem; font-family:var(--font-mono); color:var(--primary); font-weight:700;">10:00</p>
        </div>
        <div style="flex:1;">
          <p style="font-size:0.75rem; color:var(--fg-muted); margin-bottom:0.25rem;">QUESTION TIME</p>
          <div id="questionTimerFill" class="timer-fill ok" style="height:4px; margin:0.5rem 0;"></div>
          <p id="questionTimer" style="font-size:1.5rem; font-family:var(--font-mono); color:var(--primary); font-weight:700;">0:20</p>
        </div>
      </div>
    `
    : '';

  app.innerHTML = `
    <div style="max-width:700px; margin:0 auto;">
      ${timersHTML}
      
      <div class="progress-bar">
        <div class="progress-fill" style="width:${progressPercent}%"></div>
      </div>
      
      <div class="glass-card" style="padding:2rem; border-radius:var(--radius); margin-bottom:1.5rem;">
        <p style="font-size:0.875rem; color:var(--fg-muted); margin-bottom:1rem;">Question ${currentQ + 1} of ${questions.length}</p>
        <h2 style="font-size:1.25rem; margin-bottom:2rem; line-height:1.5;">${escapeHtml(current.q)}</h2>
        
        <div style="display:flex; flex-direction:column; gap:1rem;">
          ${current.o.map((opt, i) => `
            <button class="option-btn ${answered ? (i === current.a ? 'correct' : i === selectedIdx ? 'wrong' : 'dimmed') : ''} ${answered ? 'answered' : ''}"
                    onclick="handleAnswer(${i})"
                    aria-label="Option ${String.fromCharCode(65+i)}: ${escapeHtml(opt)}">
              <span style="display:flex; align-items:center; justify-content:center; min-width:1.75rem; height:1.75rem; border-radius:50%; background:rgba(56,189,248,0.1); border:1px solid var(--primary); font-weight:700; font-size:0.8rem;">${String.fromCharCode(65 + i)}</span>
              ${escapeHtml(opt)}
            </button>
          `).join('')}
        </div>
        
        ${answered ? `
          <div style="margin-top:2rem; padding:1rem; border-radius:var(--radius); background:rgba(56,189,248,0.08); border-left:3px solid var(--primary);">
            <p style="font-size:0.875rem; color:var(--primary); font-weight:600; margin-bottom:0.5rem;">💡 Explanation</p>
            <p style="color:var(--fg-muted); font-size:0.9rem; line-height:1.6;">${escapeHtml(current.explanation)}</p>
          </div>
        ` : ''}
      </div>
      
      ${answered ? `
        <button onclick="nextQuestion()" class="btn-primary" style="width:auto; min-width:180px; float:right;">
          ${currentQ === questions.length - 1 ? 'Finish Quiz 🏁' : 'Next Question →'}
        </button>
        <div style="clear:both;"></div>
      ` : ''}
    </div>
  `;

  if (mode === 'hard') updateTimerDisplay();
}

// ========== PREMIUM SVG RESULT CHART ==========
function buildResultChart(correct, wrong, skipped, total) {
  const W = 340, H = 260;
  const cx = W / 2, cy = H / 2 - 10;
  const R = 90, strokeW = 22;

  const segments = [
    { label: 'Correct', value: correct, color: '#22c55e', dash: '#16a34a' },
    { label: 'Wrong', value: wrong, color: '#ef4444', dash: '#dc2626' },
    { label: 'Skipped', value: skipped, color: '#f59e0b', dash: '#d97706' }
  ].filter(s => s.value > 0);

  const circ = 2 * Math.PI * R;
  let offset = 0;
  // Start at top (-90 deg)
  let startAngle = -90;

  const arcs = segments.map(seg => {
    const frac = seg.value / total;
    const dash = frac * circ;
    const gap = circ - dash;
    const arc = {
      ...seg,
      frac,
      dasharray: `${dash.toFixed(2)} ${gap.toFixed(2)}`,
      dashoffset: -offset,
      angle: startAngle + frac * 180
    };
    offset += dash;
    startAngle += frac * 360;
    return arc;
  });

  const arcsSVG = arcs.map((seg, i) => `
    <circle
      class="result-arc-segment"
      cx="${cx}" cy="${cy}" r="${R}"
      fill="none"
      stroke="${seg.color}"
      stroke-width="${strokeW}"
      stroke-dasharray="${seg.dasharray}"
      stroke-dashoffset="${(circ * 0.25 + seg.dashoffset).toFixed(2)}"
      stroke-linecap="round"
      style="animation: arcDraw 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.18}s both; filter:drop-shadow(0 0 6px ${seg.color}88);"
    />
  `).join('');

  const legendItems = [
    { label: 'Correct', value: correct, color: '#22c55e' },
    { label: 'Wrong', value: wrong, color: '#ef4444' },
    { label: 'Skipped', value: skipped, color: '#f59e0b' }
  ].map((item, i) => `
    <div style="display:flex; align-items:center; gap:0.6rem; animation:slideUp 0.5s ease ${0.8 + i*0.12}s both;">
      <span style="width:12px; height:12px; border-radius:50%; background:${item.color}; box-shadow:0 0 8px ${item.color}88; flex-shrink:0;"></span>
      <span style="font-size:0.85rem; color:var(--fg-muted);">${item.label}</span>
      <span style="font-size:0.9rem; font-weight:700; color:var(--fg); margin-left:auto; font-family:var(--font-mono);">${item.value}</span>
    </div>
  `).join('');

  const scorePercent = Math.round((correct / total) * 100);

  return `
    <div class="result-chart-wrapper" style="animation:fadeIn 0.5s ease both;">
      <svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%; max-width:${W}px; overflow:visible;">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- Track ring -->
        <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(56,189,248,0.08)" stroke-width="${strokeW}"/>
        <!-- Arc segments -->
        ${arcsSVG}
        <!-- Center score -->
        <text x="${cx}" y="${cy - 10}" text-anchor="middle" font-size="28" font-weight="700"
          fill="${scorePercent >= 80 ? '#22c55e' : scorePercent >= 60 ? '#38bdf8' : '#f59e0b'}"
          font-family="'JetBrains Mono', monospace"
          style="filter:drop-shadow(0 0 8px currentColor)">
          ${scorePercent}%
        </text>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="rgba(148,163,184,0.9)"
          font-family="'Space Grotesk', sans-serif" letter-spacing="1">
          ACCURACY
        </text>
      </svg>

      <div style="display:flex; flex-direction:column; gap:0.75rem; justify-content:center; min-width:140px; padding:1rem;">
        ${legendItems}
        <div style="margin-top:0.5rem; padding-top:0.75rem; border-top:1px solid var(--border);">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:0.85rem; color:var(--fg-muted);">Total</span>
            <span style="font-size:0.9rem; font-weight:700; color:var(--fg); margin-left:auto; font-family:var(--font-mono);">${total}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderResults() {
  const app = document.getElementById('app');
  const scorePercent = Math.round((score / questions.length) * 100);
  const bestScore = getBestScore();
  const wrong = answerResults.filter(r => !r.correct && r.userAnswer !== -1).length;
  const skipped = answerResults.filter(r => r.userAnswer === -1).length;

  const gradeEmoji = scorePercent >= 90 ? '🌟' : scorePercent >= 70 ? '⭐' : scorePercent >= 50 ? '👍' : '📚';
  const gradeMsg = scorePercent >= 90 ? 'Outstanding!' : scorePercent >= 70 ? 'Great work!' : scorePercent >= 50 ? 'Good effort!' : 'Keep practicing!';

  app.innerHTML = `
    <div class="result-page animate-slide-up" style="max-width:700px; margin:0 auto; text-align:center;">

      <div style="margin-bottom:1.5rem;">
        <p style="font-size:3rem; margin-bottom:0.5rem;">${gradeEmoji}</p>
        <p style="font-size:0.8rem; color:var(--fg-muted); text-transform:uppercase; letter-spacing:2px; margin-bottom:0.25rem;">Quiz Complete</p>
        <h2 style="font-size:1.75rem; font-weight:700; color:var(--primary);">${gradeMsg}</h2>
      </div>

      <!-- Premium SVG Chart -->
      <div class="glass-card" style="padding:1.5rem 2rem; margin-bottom:1.5rem; border-radius:var(--radius);">
        <p style="font-size:0.75rem; color:var(--fg-muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:1rem;">Performance Breakdown</p>
        ${buildResultChart(score, wrong, skipped, questions.length)}
      </div>

      <!-- Stats row -->
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-bottom:1.5rem;">
        <div class="stat-card">
          <p style="color:var(--success); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">Correct</p>
          <p style="font-size:1.75rem; font-weight:700; color:var(--success);">${score}</p>
        </div>
        <div class="stat-card">
          <p style="color:var(--danger); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">Wrong</p>
          <p style="font-size:1.75rem; font-weight:700; color:var(--danger);">${wrong}</p>
        </div>
        <div class="stat-card">
          <p style="color:var(--primary); font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">Best</p>
          <p style="font-size:1.75rem; font-weight:700; color:var(--primary);">${bestScore}%</p>
        </div>
      </div>

      <!-- Timeline -->
      <div class="glass-card" style="padding:1.5rem; margin-bottom:1.5rem; border-radius:var(--radius);">
        <p style="font-size:0.75rem; color:var(--fg-muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:1rem;">Answer Timeline</p>
        <div style="display:flex; gap:0.4rem; justify-content:center; flex-wrap:wrap;">
          ${answerResults.map((result, i) => `
            <div class="timeline-item ${result.correct ? 'correct' : result.userAnswer === -1 ? 'skipped' : 'wrong'}"
                 title="Q${i+1}: ${result.correct ? '✓ Correct' : result.userAnswer === -1 ? '⏭ Skipped' : '✗ Wrong'}"
                 style="animation:slideUp 0.3s ease ${i * 0.04}s both;">
              ${i + 1}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div style="display:flex; gap:1rem; flex-wrap:wrap;">
        <button onclick="window.location.href='Main.html'" class="btn-primary" style="flex:1; min-width:140px;">
          🏠 Dashboard
        </button>
        <button onclick="window.location.href='Quiz.html'" class="btn-primary" style="flex:1; min-width:140px; background:linear-gradient(90deg,#7c3aed,#a855f7);">
          🔄 Retake
        </button>
        <button onclick="window.location.href='Leaderboard.html'" class="btn-primary" style="flex:1; min-width:140px; background:linear-gradient(90deg,#d97706,#f59e0b);">
          🏆 Rankings
        </button>
      </div>
    </div>
  `;
}