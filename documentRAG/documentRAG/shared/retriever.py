from haystack_integrations.document_stores.pinecone import PineconeDocumentStore
from haystack_integrations.components.retrievers.pinecone import PineconeEmbeddingRetriever

def documentStore(
    dimension:int
):
    return PineconeDocumentStore(
		environment="gcp-starter",
		index="default",
		namespace="default",
		dimension=dimension
)

def retriever(
    dimension: int
):
    document_store = documentStore(dimension=dimension)
    return PineconeEmbeddingRetriever(document_store=document_store)
