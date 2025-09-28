# Research Summarizer

A small project to summarize research papers using **OpenAI GPT + LangChain**.  
Frontend is **Next.js (React)**, backend is **Python + FastAPI**.

---

## How it works

1. Frontend lets you pick a paper, style, and length.  
2. It sends the selection to the FastAPI backend.  
3. Backend uses LangChain + GPT to create a summary.  
4. Summary is sent back and displayed in the frontend.  

---

## Run it locally
### Backend
```bash
cd backend
python -m venv venv
# Windows
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn backend:app --reload --port 8000
