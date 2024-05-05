from haystack_integrations.components.retrievers.pinecone import PineconeEmbeddingRetriever
from .documentStore import documentStore

def retriever(
    dimension: int,
    namespace:str="default"
):
    document_store = documentStore(dimension=dimension, namespace=namespace)
    return PineconeEmbeddingRetriever(document_store=document_store)
