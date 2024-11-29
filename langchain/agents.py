"""
LangChain Agents for Museum Guide.

Author: Yassine El Yacoubi
"""

from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.agents import Tool

class ExhibitAgent:
    def __init__(self, retriever):
        self.chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(model="gpt-4", temperature=0),
            retriever=retriever
        )
    
    def run(self, query):
        return self.chain.run(query)

class NavigationAgent:
    def __init__(self, retriever):
        self.chain = RetrievalQA.from_chain_type(
            llm=ChatOpenAI(model="gpt-4", temperature=0),
            retriever=retriever
        )
    
    def run(self, query):
        return self.chain.run(query)

def create_agents(retrievers):
    """
    Create tools (agents) for LangChain planner.

    Args:
        retrievers: A dictionary with keys 'exhibit' and 'navigation' pointing to retrievers.

    Returns:
        List of LangChain tools.
    """
    exhibit_agent = ExhibitAgent(retrievers["exhibit"])
    navigation_agent = NavigationAgent(retrievers["navigation"])

    return [
        Tool(name="Exhibit Info Agent", func=exhibit_agent.run, description="Answers questions about exhibits."),
        Tool(name="Navigation Agent", func=navigation_agent.run, description="Helps with navigating the museum.")
    ]
