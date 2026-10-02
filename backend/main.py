from fastapi import FastAPI

app = FastAPI(title="SpeakUp API")


@app.get("/health")
def health():
    """Simple check that the server is running."""
    return {"status": "ok"}
