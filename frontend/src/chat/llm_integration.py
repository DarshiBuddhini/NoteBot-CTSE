from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import RetrievalQA
import os

class ChatbotQA:
    def __init__(self, pdf_path: str, openai_api_key: str):
        self.pdf_path = pdf_path
        self.openai_api_key = openai_api_key
        self.documents = None  # To store raw documents
        self.qa_chain = self._initialize_qa_chain()

    def _initialize_qa_chain(self):
        # Load PDF document
        loader = PyPDFLoader(self.pdf_path)
        self.documents = loader.load()

        # Print number of pages
        print(f"📄 PDF loaded: {len(self.documents)} pages")

        # Extract first 100 words from the whole document
        full_text = " ".join([doc.page_content for doc in self.documents])
        first_100_words = " ".join(full_text.split()[:100])
        print(f"📝 First 100 words:\n{first_100_words}\n")

        # Chunk into manageable pieces
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        texts = text_splitter.split_documents(self.documents)

        # Create vector embeddings and FAISS store
        embeddings = OpenAIEmbeddings(openai_api_key=self.openai_api_key)
        vector_store = FAISS.from_documents(texts, embeddings)

        # Set up LLM + Retrieval QA
        llm = ChatOpenAI(
            model_name="gpt-3.5-turbo",
            openai_api_key=self.openai_api_key
        )

        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vector_store.as_retriever()
        )
        return qa_chain

    def ask_question(self, question: str, history: list = None) -> str:
        try:
            if history:
                # Build conversational context
                history_text = "\n".join(
                    [f"{msg['role'].capitalize()}: {msg['content']}" for msg in history]
                )
                full_query = f"{history_text}\nUser: {question}\nAssistant:"
            else:
                full_query = question

            response = self.qa_chain.invoke({"query": full_query})
            return response['result']
        except Exception as e:
            print(f"❌ Error in QA chain: {str(e)}")
            raise RuntimeError("QA system failure") from e
