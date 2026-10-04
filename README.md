# SpeakUp

SpeakUp is an AI communication coach, built as an **ML engineering project**. Its core will be a filler-word detection model ("uh", "um") that I train and evaluate myself on the PodcastFillers dataset, by fine-tuning a pretrained speech model (wav2vec2 or WavLM). The app records the user speaking, the model measures their fillers, and a coach persona, **Mr. Combs**, turns those measurements into encouraging feedback. It is aimed at students preparing for placement interviews. Transcripts from speech recognition (Whisper) are used for grammar and vocabulary only, because ASR tends to drop non-lexical fillers.

## Status

**Built**
- Frontend prototype (React + Vite, plain CSS): Home and Practice session screens. All coach text and progress values are hard-coded.
- Practice modes defined in one list: Conversation, Storytelling, Confidence, Interview (active) and Humor (coming soon).
- Backend skeleton (FastAPI) with a single `GET /health` endpoint. The frontend does not call it yet.
- `.env.example` files for frontend and backend (not read by any code yet).

**Planned**
- Authentication and database (Supabase)
- ML pipeline in `ml/`: data download, baselines, evaluation, fine-tuning, error analysis
- Model inference endpoint in the backend (with Docker)
- Voice recording in the browser and the full record → analyze → feedback flow
- Mr. Combs feedback via an LLM, transcripts via Whisper, text-to-speech
- Dashboard and deployment

See [`docs/DECISIONS.md`](docs/DECISIONS.md) for why each choice was made and [`docs/DEVLOG.md`](docs/DEVLOG.md) for progress.

## Folder layout

```
frontend/   React app
backend/    FastAPI app
ml/         training, evaluation and reports (planned, not created yet)
docs/       DECISIONS.md, DEVLOG.md, audits
```

## Setup

- Frontend: see [`frontend/README.md`](frontend/README.md)
- Backend: see [`backend/README.md`](backend/README.md)

The backend was developed with **Python 3.14.6**.

## License

The code in this repository is released under the [MIT License](LICENSE). The PodcastFillers annotations are licensed for **non-commercial use only**, so any model trained on PodcastFillers is non-commercial too, and is not covered by the MIT License.
