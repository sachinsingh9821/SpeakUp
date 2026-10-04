# SpeakUp Learning Plan

I'm building SpeakUp as my flagship ML engineering project and learning what it needs **while building it**. The goal is not to finish courses or playlists. The goal is to understand and implement what SpeakUp actually requires, and to explain it in ML engineering interviews.

**Cycle for every milestone:** Understand → Plan → Implement → Test → Debug → Reflect → Improve

**Rule:** learning is attached to the milestone that needs it. Learn just before or during that milestone, never weeks in advance. Never finish a playlist just because it exists.

Video numbers refer to:
- **CampusX**: "100 Days of Machine Learning"
- **IITM**: IIT Madras "Speech Technology"

---

## Final standard

> "I can explain what enters my model, what happens inside it, how I trained it, how I evaluated it, where it fails, and how I deployed it."

A topic is **learned** when I can explain it and use it, not when I've watched a video about it.

---

## The six-question rule (major concepts only)

For **major concepts** (listed per milestone below), Claude explains:

1. What is it?
2. Why does SpeakUp need it?
3. Where does it appear in the pipeline?
4. How deeply do I need to learn it?
5. What can I skip?
6. How will we implement it?

For small details (a function argument, a config option, a library quirk), a short explanation is enough. Don't apply all six questions to everything.

Anything academically interesting but low-relevance to SpeakUp gets labeled **OPTIONAL — DO NOT STUDY NOW**.

---

## Milestone 1: Auth

**Major concepts:** HTTP requests and JSON, CORS, environment variables, authentication tokens (JWT), protected routes.

**Learn:**
- How the browser talks to an API (fetch, status codes, JSON)
- CORS: why the browser blocks requests between `localhost:5173` and `localhost:8000`, and how the backend allows them
- Environment variables in Vite (`import.meta.env`, the `VITE_` prefix) and in FastAPI (loading `.env`)
- What a JWT access token is and how the backend verifies it
- React Router basics and protected pages

**No playlists.** Use spare time in this milestone to start milestone 2's CampusX videos (logistic regression and evaluation).

---

## Milestone 2: Dataset + baselines

**Major concepts:** framing an ML problem, logistic regression, precision/recall/F1, class imbalance, train/validation/test splits, episode/speaker leakage, waveforms and spectrograms, pretrained embeddings.

### CampusX: must watch
- **Foundations:** 1 (What is ML), 3 (Types of ML), 7 (Challenges in ML), 9 (ML development life cycle), 14 (Framing an ML problem), 19 (Understanding your data), 23 (Feature engineering)
- **Optimization:** 57 (Gradient descent from scratch), 60 (Mini-batch gradient descent), 62 (Bias-variance trade-off)
- **Logistic regression:** 70, 71, 72, 73, 75. Focus on sigmoid, binary cross-entropy, gradient descent, decision boundaries.
- **Evaluation:** 76 (Accuracy and confusion matrix), 77 (Precision, recall, F1), 133 (Imbalanced data)

### CampusX: recommended
2 (AI vs ML vs DL), 11 (Tensors), 13 (End-to-end toy project), 29 (ML pipelines), 58 (Batch GD), 59 (Stochastic GD), 78 (ROC-AUC), 81 (Logistic regression hyperparameters)

### IITM: must watch (lighter DSP rule applies)
2 (DSP fundamentals), 7 (Waveforms, spectrograms), 9 (MFCC, mel scale), 12 (Feature extraction for speech)

**Lighter DSP/MFCC rule:** wav2vec2 and WavLM take the raw waveform, so we never compute MFCCs ourselves. Learn waveforms, sampling rate and spectrograms well enough to explain them and use spectrograms in error analysis. The source-filter model and MFCC details are **explain-level only**: know what they are and why classical systems used them, no math.

### IITM: recommended
3 (Speech production, Fourier, filters), 4 (Fourier series, phoneme representation)

### SpeakUp-specific (no playlist)
- PyTorch tensors (shape, dtype, device)
- Audio basics in code: sampling rate, WAV, resampling to 16 kHz, torchaudio
- Hugging Face Datasets: loading and inspecting PodcastFillers
- **Episode/speaker leakage:** why clips from the same episode must never be in both training and test data, and why we use the official episode-level splits
- Extracting frozen embeddings from WavLM/wav2vec2 (no training yet; treat the model as a feature extractor)
- Binary vs multi-class: the logistic regression baseline can be binary (filler vs non-filler) or one-vs-rest; the final model is multi-class

### Build
- Data exploration notebook
- Basic evaluation script (precision, recall, F1 per class, confusion matrix), written **before** any model
- Baseline 1: counting fillers from Whisper transcripts (tests the core assumption that transcripts undercount fillers)
- Baseline 2: logistic regression on frozen embeddings, wav2vec2 vs WavLM compared fairly

---

## Milestone 3: Fine-tuning

**Major concepts:** neural networks and backpropagation, softmax and cross-entropy, the PyTorch training loop, transformers and self-attention, self-supervised learning, WavLM architecture, fine-tuning and transfer learning.

### IITM: must watch
- **Deep learning:** 38 (Intro to DNN), 44 (Artificial neurons/perceptrons), 45 (Activation functions), 47 (Feed-forward networks, backpropagation, softmax, gradient descent)
- **Transformers and modern speech:** 61 (Transformer intro, self-attention, Q/K/V), 63 (Multi-head attention, encoder-decoder), 64 (Self-supervised learning), 65 (Transformer training / SSL for speech), 66 (Transformers for speech)

### IITM: recommended
48 (RNN), 54 (RNN disadvantages), 56 (Seq-to-seq, attention), 60 (CNN for speech), 67 (BERT)

### CampusX: recommended
134 (Optuna), only if we do hyperparameter search

### SpeakUp-specific (no playlist)
- **Multi-class classification:** softmax and cross-entropy for uh / um / non-filler (extends binary logistic regression from milestone 2)
- PyTorch: Dataset/DataLoader, model, loss, optimizer, training loop, GPU
- **Fine-tuning and transfer learning:** freezing vs unfreezing layers, small learning rates, overfitting on limited data, early stopping using the validation set
- WavLM: what pretraining learned, what we change when fine-tuning
- Hugging Face: processors, model loading, saving and loading checkpoints
- Experiment tracking with W&B, fixed seeds, YAML configs

### Build
- Fine-tune the winner from milestone 2 on Kaggle/Colab
- Compare against both baselines on the validation set

---

## Milestone 4: Evaluation

**Major concepts:** event-level evaluation, error analysis, inference latency.

### Learn
- **Event-level evaluation:** a detection counts as correct only if it matches a real filler in time (overlap/tolerance), not just if a clip is classified correctly. Learned from the PodcastFillers paper, not a playlist.
- Filler count error per recording (the product metric)
- Error analysis: listening to failures, grouping them (laughter, breaths, short words, noise), using spectrograms to explain them
- Recheck episode/speaker leakage before trusting the final numbers
- Measuring inference latency

### Build
- Event-level evaluation added to the evaluation script; rerun baselines with it
- Final test-set evaluation, run **once**
- Error analysis report in `ml/reports/`

---

## Milestone 5: Serving

**Major concepts:** model inference in an API, Docker.

### Learn
- Loading a model once at server startup (not per request)
- The inference pipeline: FFmpeg → 16 kHz WAV → Silero VAD → model → event merging
- Docker: images, containers, why FFmpeg needs it
- ONNX Runtime: **OPTIONAL — DO NOT STUDY NOW**

---

## Milestone 6: Full SpeakUp flow

**Major concepts:** recording audio in the browser, uploading files to an API, prompting the LLM with model results.

### Learn
- MediaRecorder: recording and sending audio
- File uploads in FastAPI, size limits and validation
- Whisper word timestamps (for words per minute)
- Prompting the LLM with measured results so Mr. Combs explains them without inventing numbers

---

## Milestones 7–8: Dashboard and deployment
Learn as needed: charts for progress over time, deploying the frontend (Vercel) and the backend with the model, production CORS and environment variables.

---

## Skip for now

### CampusX
Linear/polynomial regression, ridge/lasso, Naive Bayes, KNN, SVM, decision trees, random forests, ensembles, clustering. Useful ML knowledge, but not needed for a speech-transformer project.

### IITM: high-level awareness only
Detailed GMM math, HMM math, the Viterbi algorithm, classical HMM-GMM ASR, CTC math, TTS/speech synthesis, speaker verification, speaker diarization. Only know, at a high level, how classical speech systems differ from modern neural/transformer approaches.

IITM 30, 34, 36, 37 (pattern classification, limited-vocabulary ASR, HMM-GMM ASR): **OPTIONAL — DO NOT STUDY NOW**, unless I want that historical context.

---

## The system we're building

```
Browser audio
→ FFmpeg / preprocessing
→ Silero VAD
→ WavLM / wav2vec2
→ filler classifier
→ filler events
→ evaluation
→ FastAPI
→ coaching feedback (Mr. Combs)
```
Whisper provides transcript-based information (words per minute, grammar and vocabulary feedback). It is **not** the filler detector. The trained filler model is the central ML component.
