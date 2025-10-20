from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import load_prompt
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from dotenv import load_dotenv
import tempfile
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = ChatOpenAI()
template = load_prompt("template.json")


@app.post("/summarize")
async def summarize(
    file: UploadFile,
    style_input: str = Form(...),
    length_input: str = Form(...)
):
    file_ext = os.path.splitext(file.filename)[1].lower()
    with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp_file:
        tmp_file.write(await file.read())
        tmp_path = tmp_file.name

    if file_ext == ".txt":
        loader = TextLoader(tmp_path)
    elif file_ext == ".pdf":
        loader = PyPDFLoader(tmp_path)
    else:
        return {"error": "Unsupported file type. Please upload .txt or .pdf"}

    docs = loader.load()

    text_content = "\n".join([d.page_content for d in docs])

    chain = template | model
    result = chain.invoke({
        "paper_input": text_content,
        "style_input": style_input,
        "length_input": length_input
    })

    os.remove(tmp_path)

    return {"summary": result.content}
