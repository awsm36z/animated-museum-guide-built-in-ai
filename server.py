"""
Flask server for running LangChain planner and agents.

Author: Yassine El Yacoubi
"""

from flask import Flask, request, jsonify
from langchain.rag_retrieval import setup_retrievers
from langchain.agents import create_agents
from langchain.planner import create_planner

app = Flask(__name__)

# Setup retrievers and planner
retrievers = setup_retrievers()
tools = create_agents(retrievers)
planner = create_planner(tools)

@app.route("/query", methods=["POST"])
def handle_query():
    data = request.get_json()
    query = data.get("query", "")
    response = planner.run(query)
    return jsonify({"answer": response})

if __name__ == "__main__":
    app.run(debug=True)
