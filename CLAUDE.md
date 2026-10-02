# SpeakUp — Project Context

SpeakUp is an AI communication coach app. The coach persona is **Mr. Combs**: a warm, encouraging mentor (like an older brother or coach), never a generic chatbot. He gives honest feedback but frames it constructively ("Nice attempt. Let's make this sound more natural. Try this...").

This is a **portfolio-first MVP** built by a student to show in internship and placement interviews. Code must be clean, readable, and explainable. Prefer simple, standard solutions over clever ones.

## Current state
- `/frontend` already exists: React 19 + Vite, **plain CSS** (`src/index.css`), ESLint. Two screens (Home, Practice session) switched by a `screen` state in `App.jsx`. All coach text and progress values are hard-coded.
- Not built yet: backend, database, auth, AI, voice recording, routing, tests.
- Do not recreate or restyle the existing frontend unless asked.

## Tech stack (locked)
- **Frontend:** React (Vite) + **plain CSS** (no Tailwind), in `/frontend`
- **Routing:** React Router, to be added together with auth (not before)
- **Backend:** Python + FastAPI, in `/backend`
- **Database + Auth:** Supabase (Postgres + Supabase Auth, email/password)
- **AI:** LLM via API (OpenAI or equivalent)
- **Voice:** record in browser with **MediaRecorder**, transcribe on backend with **Whisper API** (not the Web Speech API)
- **Text-to-Speech:** OpenAI TTS or ElevenLabs (decide later)
- **Deployment:** Vercel (frontend) + Railway (backend)

## MVP scope
In scope: auth, Mr. Combs chat, voice input, AI feedback with scores, practice modes, progress dashboard, streaks, deployment.

Practice modes (current UI): Conversation, Storytelling, Confidence, Humor. Proposed change: add Interview, move Humor to v2. Pending decision; see docs/DECISIONS.md.

Out of scope (Version 2, do not build): video/body-language analysis, emotion detection, group discussions, debate mode, payments, AI avatars, multiplayer, cross-session long-term memory.

## Database schema (first pass)
```
users        id, name, email, created_at   (auth handled by Supabase Auth)
sessions     id, user_id, mode, started_at, ended_at
messages     id, session_id, role (user | mr_combs), content, audio_url (nullable), created_at
scores       id, session_id, confidence, fluency, grammar, vocabulary, filler_word_count, tip, created_at
streaks      user_id, current_streak, longest_streak, last_practiced_at   (may be derived instead)
```
Conversation memory in v1 = last N messages of the current session only.

## Rules
- Never commit secrets. Keys live in `.env` files, which are gitignored. Provide `.env.example` files with placeholder values.
- The Supabase secret/service_role key is used **only** in the backend. The frontend uses only the publishable/anon key.
- Backend verifies the user's Supabase access token on every protected endpoint.
- Build one feature at a time. After each feature, explain what changed and why in plain language, so the developer can explain it in an interview.
- After each feature, propose a short entry for `docs/DEVLOG.md` (what was built, files touched, key concepts). Leave the "In my own words" and interview-answer sections for the developer to write. If a significant technical choice was made, propose an entry for `docs/DECISIONS.md`.
- Keep commits small, with conventional messages (`feat:`, `fix:`, `chore:`, `docs:`).
- Don't add features, libraries, or abstractions beyond what the current task needs.
