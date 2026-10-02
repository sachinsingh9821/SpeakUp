# Decision Log

Every significant technical or product choice, with the reasoning. Use this to answer "Why did you choose X?" in interviews.

Format: **Decision**, **Why**, **Alternatives considered**, **Date**.

---

### 1. Build an MVP first, not the full vision
- **Why:** A finished, polished, deployed MVP is worth more in interviews than a half-built "ultimate" app. Advanced features (video analysis, avatars, payments) are parked for v2.
- **Alternatives:** Building everything at once (high risk of never finishing).
- **Date:** Aug 2026

### 2. Use an existing LLM via API instead of training a model
- **Why:** Training a model needs large amounts of coaching data we don't have. An existing LLM plus our own prompts, scoring logic, and persona is faster and better quality. Fine-tuning is an option later, once real usage data exists.
- **Alternatives:** Training or fine-tuning an open-source model from the start.
- **Date:** Aug 2026

### 3. React + Vite for the frontend
- **Why:** React is the most common frontend library in industry. Vite gives a fast dev server and simple configuration.
- **Alternatives:** Create React App (deprecated), Next.js (more than we need for now).
- **Date:** Aug 2026

### 4. Plain CSS instead of Tailwind
- **Why:** The UI was already built and responsive in plain CSS. Migrating would cost time with no user-facing benefit.
- **Alternatives:** Tailwind CSS (originally planned).
- **Date:** Oct 2026

### 5. Python + FastAPI for the backend
- **Why:** The AI and speech parts are Python-friendly, and the developer is ML-focused, so Python keeps the backend in one language. FastAPI is modern, fast, and generates API docs automatically at `/docs`.
- **Alternatives:** Node.js + Express (would split the project across two backend-style languages).
- **Date:** Oct 2026

### 6. Supabase for database and authentication
- **Why:** One service gives a Postgres database, user authentication, and file storage. That means fewer services to set up and a free tier for development.
- **Alternatives:** Separate Postgres + Clerk or Firebase Auth.
- **Date:** Oct 2026

### 7. Two Supabase keys: publishable in frontend, secret in backend only
- **Why:** Frontend code is visible to anyone in the browser, so it only gets the publishable key, which is limited by security rules. The secret key bypasses all security rules, so it stays on the server.
- **Date:** Oct 2026

### 8. MediaRecorder + Whisper for voice, not the Web Speech API
- **Why:** The Web Speech API depends on the browser (not supported in Firefox, for example) and doesn't give us the audio itself. Recording with MediaRecorder and transcribing with Whisper works across browsers and gives reliable transcripts for filler-word detection.
- **Alternatives:** Web Speech API (free, but unreliable and browser-specific).
- **Date:** Oct 2026

### 9. Monorepo (frontend and backend in one repository)
- **Why:** One repo to maintain and one link for recruiters to see the whole project.
- **Alternatives:** Separate repos for frontend and backend.
- **Date:** Aug 2026

---

## Open decisions
- **Practice modes:** add Interview mode and move Humor to v2? (Proposed; waiting on decision.)
- **Text-to-Speech provider:** OpenAI TTS vs ElevenLabs. Decide when building Mr. Combs' voice.
