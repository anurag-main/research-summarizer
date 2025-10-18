from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import load_prompt
from langchain_community.documentloaders import TextLoader
from dotenv import load_dotenv
import tempfile

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
    # Step 1: Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".txt") as tmp_file:
        tmp_file.write(await file.read())
        tmp_path = tmp_file.name

    loader = TextLoader(tmp_path)
    docs = loader.load()
    text_content = docs[0].page_content

    chain = template | model
    result = chain.invoke({
        "paper_input": text_content,
        "style_input": style_input,
        "length_input": length_input
    })

    return {"summary": result.content}
