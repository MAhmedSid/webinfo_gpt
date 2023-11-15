from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.document_loaders import SeleniumURLLoader
from langchain.chat_models import ChatOpenAI
# from dotenv import load_dotenv
from langchain.document_loaders import SeleniumURLLoader
from langchain.chat_models import ChatOpenAI
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.summarize import load_summarize_chain


app = Flask(__name__)
CORS(app)

def get_summary(url,apiKey):
    if apiKey is None:
        return "Please provide your OpenAI API key"
    
    embeddings= OpenAIEmbeddings(openai_api_key=apiKey)
    loader = SeleniumURLLoader(urls=[url,])
    data = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    # print(f'''Data: {data}''')
    
    chunks = splitter.split_documents(data)
    # print(f'''Chunks: {chunks}''')
    try:
         llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo-16k",api_key=apiKey)
         chain = load_summarize_chain(llm, chain_type="stuff")
         res = chain.run(chunks)
         return res    
    except:
        return "Please provide the correct API key"    

@app.route("/api/summary", methods=["POST"])
def getSummary():
    data = request.get_json()
    url = data.get("url")
    apiKey = data.get("apiKey")
    res = get_summary(url,apiKey)
    return jsonify({"summary": res})


if __name__ == "__main__":
    app.run()