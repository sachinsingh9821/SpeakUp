# SpeakUp Backend

Python + FastAPI backend for SpeakUp.

## Setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

- Windows (PowerShell): `venv\Scripts\Activate.ps1`
- macOS / Linux: `source venv/bin/activate`

Install dependencies:

```bash
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and fill in your Supabase values.

## Run

```bash
uvicorn main:app --reload
```

- Health check: http://localhost:8000/health
- Interactive API docs: http://localhost:8000/docs
