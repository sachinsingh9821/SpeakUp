# Decision Log

Every significant technical or product choice, with the reasoning. Use this to answer "Why did you choose X?" in interviews.

Format: **Decision**, **Why**, **Alternatives considered**, **Date**.

---

### 1. Build an MVP first, not the full vision
- **Why:** A finished, polished, deployed MVP is worth more in interviews than a half-built "ultimate" app. Advanced features (video analysis, avatars, payments) are parked for v2.
- **Alternatives:** Building everything at once (high risk of never finishing).
- **Date:** Aug 2026

### 2. Use an existing LLM via API for coaching text
- **Why:** Writing natural, encouraging feedback is what LLMs are good at, and training one is out of scope. The LLM only turns measurements into words; the measuring is done by our own model (see decision 10).
- **Alternatives:** Training or fine-tuning a language model.
- **Date:** Aug 2026 (scope narrowed Oct 2026)

### 3. React + Vite for the frontend
- **Why:** React is the most common frontend library in industry. Vite gives a fast dev server and simple configuration.
- **Alternatives:** Create React App (deprecated), Next.js (more than we need for now).
- **Date:** Aug 2026

### 4. Plain CSS instead of Tailwind
- **Why:** The UI was already built and responsive in plain CSS. Migrating would cost time with no user-facing benefit.
- **Alternatives:** Tailwind CSS (originally planned).
- **Date:** Oct 2026

### 5. Python + FastAPI for the backend
- **Why:** The ML model is Python (PyTorch), so a Python backend can load and run it directly. FastAPI is modern, fast, and generates API docs automatically at `/docs`.
- **Alternatives:** Node.js + Express (would need a separate Python service for the model).
- **Date:** Oct 2026

### 6. Supabase for database and authentication
- **Why:** One service gives a Postgres database, user authentication, and file storage. That means fewer services to set up and a free tier for development.
- **Alternatives:** Separate Postgres + Clerk or Firebase Auth.
- **Date:** Oct 2026

### 7. Two Supabase keys: publishable in frontend, secret in backend only
- **Why:** Frontend code is visible to anyone in the browser, so it only gets the publishable key, which is limited by security rules. The secret key bypasses all security rules, so it stays on the server.
- **Date:** Oct 2026

### 8. MediaRecorder for voice capture, Whisper for transcripts only
- **Why:** MediaRecorder works across browsers and gives us the actual audio, which our model needs. Whisper provides the transcript for grammar and vocabulary feedback. Whisper is **not** used to count fillers, because ASR systems tend to drop non-lexical fillers like "uh" and "um".
- **Alternatives:** Web Speech API (browser-specific, no access to audio).
- **Date:** Oct 2026 (updated after decision 10)

### 9. Monorepo (frontend, backend and ML in one repository)
- **Why:** One repo to maintain and one link for recruiters to see the whole project.
- **Alternatives:** Separate repos.
- **Date:** Aug 2026

### 10. Reposition SpeakUp as an ML engineering project around a trained filler-detection model
- **Why:** Calling LLM and speech APIs is application engineering, not ML engineering. A model we train and evaluate ourselves gives the project a real ML pipeline (data, preprocessing, training, evaluation, inference). Filler detection is a genuine need: transcript-based counting undercounts fillers.
- **Alternatives:** Keep the API-only design and present it as a full-stack AI application.
- **Date:** Oct 2026

### 11. PodcastFillers as the training dataset
- **Why:** 145 hours of real spontaneous speech with about 35,000 labeled filler events ("uh", "um") plus other sounds, and official episode-level train/validation/test splits.
- **Trade-off:** Annotations are under a non-commercial license. Fine for a portfolio; a commercial version would need our own consented data. Free GPUs mean we'll likely train on a documented subset.
- **Alternatives:** Collecting our own recordings (too slow to label at the start).
- **Date:** Oct 2026

### 12. Fine-tune a pretrained speech model instead of training from scratch
- **Why:** wav2vec2 and WavLM already learned speech representations from thousands of hours of audio. Fine-tuning needs far less data and compute.
- **How we choose:** compare wav2vec2-base and WavLM-base-plus using frozen embeddings and the same simple classifier, then fine-tune only the winner, to avoid doubling GPU time.
- **Alternatives:** Training a CNN on spectrograms from scratch.
- **Date:** Oct 2026

### 13. Evaluation: event-level precision, recall and F1, plus filler count error
- **Why:** Fillers are rare compared to normal speech, so accuracy would look high even for a model that never detects anything. Event-level F1 per class measures detection quality; count error per recording matches what users actually see. We also report inference latency.
- **Baselines:** (1) counting fillers from Whisper transcripts, (2) logistic regression on frozen embeddings.
- **Date:** Oct 2026

### 14. Separate `ml/` (training) from `backend/` (serving)
- **Why:** Training runs occasionally on a GPU; serving runs constantly on a CPU. Keeping them apart keeps heavy training dependencies out of the server and makes each easier to reason about.
- **Date:** Oct 2026

### 15. Supporting tools: Silero VAD, Hugging Face Hub, W&B, Docker
- **Silero VAD:** finds speech regions, so the model only analyzes speech.
- **Hugging Face Hub:** stores versioned model weights; the backend loads a specific version.
- **Weights & Biases:** tracks training runs from the first fine-tuning run (the baseline just writes JSON results).
- **Docker:** added at the serving milestone, mainly because the backend needs FFmpeg, a system dependency pip can't install.
- **Later:** ONNX Runtime for faster CPU inference.
- **Date:** Oct 2026

### 16. Reproducibility rules
- **Why:** An ML result is only credible if it can be reproduced.
- **How:** fixed random seeds, training settings in YAML configs, a manifest of the exact data subset, never tuning on the test set.
- **Date:** Oct 2026

### 17. MVP practice modes: Conversation, Storytelling, Confidence, Interview; Humor moves to v2
- **Why:** Interview practice is the clearest reason the target users (students preparing for placements) would open the app. Humor is fun but hard to measure and score reliably, so it's weaker for an MVP demo.
- **How:** Humor stays in the UI as "Coming soon" rather than being deleted. Modes will be defined in one data list with a status (`active` / `planned`), so a mode can be enabled later without rewriting screens.
- **Alternatives:** Keep the original four modes; drop Humor entirely.
- **Date:** Oct 2026

---

## Open decisions
- **Text-to-Speech provider:** OpenAI TTS vs ElevenLabs. Decide when building Mr. Combs' voice.
- **Backend hosting:** Railway vs Hugging Face Spaces, depending on model memory needs.
