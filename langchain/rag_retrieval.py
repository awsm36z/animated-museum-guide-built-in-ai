"""
RAG Retrieval for Museum Guide.

Author: Yassine El Yacoubi
"""

from langchain.document_loaders import PyPDFLoader, UnstructuredImageLoader
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

def setup_retrievers():
    """
    Load documents and create retrievers for RAG.

    Returns:
        A dictionary with 'exhibit' and 'navigation' retrievers.
    """
    # Example cloud storage paths
    exhibit_pdf_path = "https://example-bucket.s3.amazonaws.com/museum_guide.pdf"
    navigation_image_path = "https://example-bucket.s3.amazonaws.com/museum_map.jpg"

    # Load documents
    exhibit_loader = PyPDFLoader(exhibit_pdf_path)
    navigation_loader = UnstructuredImageLoader(navigation_image_path)

    exhibit_docs = exhibit_loader.load()
    navigation_docs = navigation_loader.load()

    # Create vector stores
    embeddings = OpenAIEmbeddings()
    exhibit_store = FAISS.from_documents(exhibit_docs, embeddings)
    navigation_store = FAISS.from_documents(navigation_docs, embeddings)

    return {
        "exhibit": exhibit_store.as_retriever(),
        "navigation": navigation_store.as_retriever()
    }
