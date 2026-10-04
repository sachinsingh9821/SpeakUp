# SpeakUp — Project Context

SpeakUp is an AI communication coach app, built as an **ML engineering project**. Its core is a **trained filler-word detection model** that measures how a user speaks. The coach persona, **Mr. Combs**, turns those measurements into feedback: a warm, encouraging mentor (like an older brother or coach), never a generic chatbot. He gives honest feedback but frames it constructively ("Nice attempt. Let's make this sound more natural. Try this...").

This is a portfolio project built by a student for internship and placement interviews. Code must be clean, readable, and explainable. Prefer simple, standard solutions over clever ones. Every ML result must be reproducible and honestly reported.

## Current state
- `/frontend`: React 19 + Vite, **plain CSS** (`src/index.css`), ESLint. Two screens (Home, Practice session) switched by a `screen` state in `App.jsx`. All coach text and progress values are hard-coded.
- Practice modes are defined in one `PRACTICE_MODES` list in `App.jsx` (`id`, `label`, `emoji`, `description`, `status`). Conversation, Storytelling, Confidence and Interview are `active`; Humor is `planned` and renders as a disabled "Coming soon" card. Cards are `<button>` elements.
- `/backend`: FastAPI app (`main.py`) with a single `GET /health` endpoint. Pinned `requirements.txt`, venv in `backend/venv` (gitignored). The frontend does not call the backend yet.
- `.env.example` files exist for frontend and backend, but no code reads the env vars yet. Root `.gitignore` covers secrets, dependencies, build output, Python caches, and ML artifacts (`ml/data/`, audio files, model weights, `wandb/`, `mlruns/`, notebook checkpoints).
- Root `README.md` describes the project, lists what is built vs planned, and notes that any model trained on PodcastFillers is non-commercial (code is MIT). Latest audit: `docs/AUDIT-2026-10-04.md`.
- Not built yet: `/ml`, database tables, auth, voice recording, model, LLM integration, routing, tests.
- Do not recreate or restyle the existing frontend unless asked.

## Architecture (target)
```
Browser records audio (MediaRecorder)
  → FastAPI receives audio
  → FFmpeg converts to 16 kHz mono WAV
  → Silero VAD finds speech regions
  → filler model classifies short windows (uh / um / non-filler)
  → merge detections into events (timestamps + counts)
  → results saved in Supabase
  → LLM (Mr. Combs) turns results into coaching feedback
  → frontend shows scores and highlights
```
Whisper is used for the transcript (grammar/vocabulary feedback) only. It does **not** count fillers, because ASR systems tend to drop non-lexical fillers.

## Tech stack (locked)
**App**
- Frontend: React (Vite) + plain CSS (no Tailwind), in `/frontend`
- Routing: React Router, added together with auth (not before)
- Backend: Python + FastAPI, in `/backend`
- Database + Auth: Supabase (Postgres + Supabase Auth, email/password)
- Voice capture: MediaRecorder in the browser
- Transcript: Whisper API
- Coaching text: LLM via API (written feedback only; no Text-to-Speech in the MVP)
- Deployment: Vercel (frontend) + backend host TBD (Railway or Hugging Face Spaces; model memory needs decide)

**ML**
- PyTorch + torchaudio (check current torchaudio I/O docs; `soundfile` as fallback for loading audio)
- Hugging Face Transformers: wav2vec2-base vs WavLM-base-plus (compare with frozen embeddings, fine-tune the winner)
- Hugging Face Datasets for loading data
- FFmpeg for audio conversion; librosa only if torchaudio can't do something
- Silero VAD for speech detection
- scikit-learn for baselines
- Weights & Biases for experiment tracking, starting from the first fine-tuning run
- Training compute: Kaggle or Google Colab GPUs
- Model storage/versioning: Hugging Face Hub
- Docker: added at the model-serving milestone
- ONNX Runtime: optimization later, not now
- pytest for tests

## ML rules
- Dataset: **PodcastFillers**. Annotations are **non-commercial** licensed; fine for this portfolio project, not for selling the product.
- Never commit datasets, audio, or model weights to Git. `ml/data/` is gitignored; a script downloads the data.
- Respect the official episode-level train/validation/test splits. Never tune on the test set.
- Record any data subset in a manifest file (which episodes, how many clips).
- Fix random seeds. Put training settings in YAML configs under `ml/configs/`, not hard-coded.
- Primary metrics: event-level precision, recall and F1 per class. Product metric: filler count error per recording. Also report inference latency. Do **not** use accuracy as the main metric (classes are imbalanced).
- Always compare against a baseline: (1) counting fillers from Whisper transcripts, (2) logistic regression on frozen embeddings.
- Notebooks are for exploration only. Reusable code goes in `ml/src/`.
- Save evaluation results and error analysis in `ml/reports/`.

## Repository layout
```
frontend/   React app
backend/    FastAPI app; loads the trained model for inference
ml/         configs/, data/ (gitignored), notebooks/, src/, reports/
docs/       DECISIONS.md, DEVLOG.md
```
Training happens in `ml/` on a GPU. Serving happens in `backend/` on a CPU. Keep them separate.

## Roadmap
1. Auth (short): signup, login, backend `/me`
2. Data exploration + baselines + evaluation setup
3. Fine-tune the model (Kaggle/Colab, tracked in W&B)
4. Evaluation and error analysis
5. Serve the model behind a FastAPI endpoint (with Docker)
6. Record audio in the browser and connect the full flow
7. Mr. Combs feedback from model results
8. Dashboard and deployment

## Database schema (first pass)
```
users        id, name, email, created_at   (auth handled by Supabase Auth)
sessions     id, user_id, mode, started_at, ended_at
messages     id, session_id, role (user | mr_combs), content, audio_url (nullable), created_at
scores       id, session_id, filler_count, fillers_per_minute, words_per_minute, long_pause_count,
             grammar_feedback, vocabulary_feedback, tip, model_version, created_at
streaks      user_id, current_streak, longest_streak, last_practiced_at   (may be derived instead)
```

## Where each score comes from (be explicit about this everywhere)
| Score | Source | How |
|---|---|---|
| Filler count / fillers per minute | **Our trained model** | detected filler events ÷ speaking time |
| Words per minute | **Measured** | Whisper word timestamps |
| Long pauses | **Measured** | silences over ~2 s from Silero VAD |
| Grammar, vocabulary | **LLM-assessed** | shown as "Mr. Combs' assessment", never as a measurement |

There are **no numeric confidence or fluency scores** in the MVP. Mr. Combs may comment on them in words. Never present an LLM opinion as a measured number.
Likely addition at milestone 6: a `filler_events` table (session_id, type, start_time, end_time, confidence, model_version).
Conversation memory in v1 = last N messages of the current session only.

## Scope
**MVP practice modes:** Conversation, Storytelling, Confidence, Interview (new; the main use case for students preparing for placements).

**Humor is planned for v2. Do not delete it.** It currently exists only as a hard-coded card in `App.jsx`. Keep the card but show it as "Coming soon" and not clickable. When practice modes are next touched, define them in one list with a status field (e.g. `{ id: "humor", label: "Humor", status: "planned" }`), so adding or enabling a mode means editing data, not rewriting screens.

**v2:** Humor, Text-to-Speech voice for Mr. Combs, numeric confidence/fluency scores (only if they can be measured), community features, advanced coaching, personalized difficulty, video/body-language analysis, emotion detection, group discussions, debate mode, payments, AI avatars, multiplayer, cross-session long-term memory. Do not build these.

## Rules
- Never commit secrets. Keys live in `.env` files, which are gitignored. Provide `.env.example` files with placeholder values.
- The Supabase secret key is used **only** in the backend. The frontend uses only the publishable key, via `VITE_`-prefixed variables.
- Backend verifies the user's Supabase access token on every protected endpoint.
- Build one feature at a time. After each feature, explain what changed and why in plain language, so the developer can explain it in an interview.
- After each feature, propose a short entry for `docs/DEVLOG.md` (what was built, files touched, key concepts). Leave the "In my own words" and interview-answer sections for the developer to write. If a significant technical choice was made, propose an entry for `docs/DECISIONS.md`.
- Keep commits small, with conventional messages (`feat:`, `fix:`, `chore:`, `docs:`).
- Don't add features, libraries, or abstractions beyond what the current task needs.
