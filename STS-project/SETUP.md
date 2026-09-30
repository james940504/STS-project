# STS Web Backend Setup

## 1. Python environment
Recommended project environment: Python 3.9.x (keep the same version used by the current STS environment).

```bash
python -m pip install -r requirements.txt
```

After confirming the project works on the main development machine, save exact versions for reproducibility:

```bash
python -m pip freeze > requirements-lock.txt
```

## 2. FFmpeg
FFmpeg is a system executable, not a normal pip dependency, so it is intentionally not listed in `requirements.txt`.
Verify it is available from the same terminal used to start Flask:

```bash
ffmpeg -version
```

## 3. Optional Gemini advice for Heavy PDF
Copy `.env.example` to `.env` and fill in your own key:

```text
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.6-flash
```

If the key is missing, the Heavy PDF still works and automatically uses local rule-based posture advice.

## 4. Start the server

```bash
python server.py
```
