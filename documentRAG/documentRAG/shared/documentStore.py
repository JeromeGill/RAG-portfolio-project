from haystack_integrations.document_stores.pinecone import PineconeDocumentStore

def documentStore(
    dimension:int,
    index:str="default",
    namespace:str="default"
    ):

    # An envrionment is a collection of indexes hosted _somewhere_ on pinecone
    #   - gcp-starter is the only free one as far as I can tell
    #   - It's in the US I think. This can't be changed without paying either
    # An index is a collection of documents
    #   - you only get one on the free tier
    # A namespace exists within that index
    # dimensions are determined by the EMBEDDINNG_MODEL used
    return PineconeDocumentStore(
		environment="gcp-starter",
		index=index,
		namespace=namespace,
		dimension=dimension
    )
