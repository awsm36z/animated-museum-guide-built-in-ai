"""
LangChain Planner for Museum Guide.

Author: Yassine El Yacoubi
"""

from langchain.agents import initialize_agent
from langchain.chat_models import ChatOpenAI

def create_planner(tools):
    """
    Create a LangChain planner.

    Args:
        tools: List of tools (agents) for the planner.

    Returns:
        A LangChain agent.
    """
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    return initialize_agent(tools, llm, agent="zero-shot-react-description")
