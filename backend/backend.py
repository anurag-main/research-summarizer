from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from langchain_core.prompts import load_prompt
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

model = ChatOpenAI()
template = load_prompt("template.json")

class RequestBody(BaseModel):
    paper_input: str
    style_input: str
    length_input: str

@app.post("/summarize")
def summarize(body: RequestBody):
    chain = template | model
    result = chain.invoke({
        "paper_input": body.paper_input,
        "style_input": body.style_input,
        "length_input": body.length_input
    })
    return {"summary": result.content}
