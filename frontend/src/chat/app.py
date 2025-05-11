import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from llm_integration import ChatbotQA

# Load environment variables
load_dotenv()

# Get OpenAI API key and PDF path from environment or fallback
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CTSE_PDF_PATH = 'data/CTSE_ALL.pdf'

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize chatbot once at startup
qa_system = ChatbotQA(pdf_path=CTSE_PDF_PATH, openai_api_key=OPENAI_API_KEY)

@app.route("/api/ask", methods=["POST"])
def ask():
    data = request.get_json()
    query = data.get("question", "").strip()
    history = data.get("history", [])

    if not query:
        return jsonify({"error": "Question cannot be empty"}), 400

    try:
        answer = qa_system.ask_question(query, history=history)
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
