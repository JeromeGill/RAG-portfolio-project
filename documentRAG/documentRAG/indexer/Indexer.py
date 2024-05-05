from haystack.components.writers import DocumentWriter
from haystack.components.converters import PyPDFToDocument
from haystack.components.preprocessors import DocumentSplitter, DocumentCleaner
from haystack.components.routers import FileTypeRouter
from haystack.components.joiners import DocumentJoiner
from haystack.components.embedders import SentenceTransformersDocumentEmbedder
from haystack import Pipeline

from ..shared.documentStore import documentStore
from .. import settings

class Indexer():
    def __init__(
            self,
            embedder_model: str,
            document_store
        ) -> None:
        """Configure pipeline
        """

        file_type_router = FileTypeRouter(mime_types=["text/plain", "application/pdf", "text/markdown"])
        pdf_converter = PyPDFToDocument()
        document_joiner = DocumentJoiner()
        document_cleaner = DocumentCleaner()
        document_splitter = DocumentSplitter(split_by="word", split_length=150, split_overlap=50)
        document_embedder = SentenceTransformersDocumentEmbedder(model=embedder_model)
        document_writer = DocumentWriter(document_store)

        pipeline = Pipeline()
        pipeline.add_component(instance=file_type_router, name="file_type_router")
        pipeline.add_component(instance=pdf_converter, name="pypdf_converter")
        pipeline.add_component(instance=document_joiner, name="document_joiner")
        pipeline.add_component(instance=document_cleaner, name="document_cleaner")
        pipeline.add_component(instance=document_splitter, name="document_splitter")
        pipeline.add_component(instance=document_embedder, name="document_embedder")
        pipeline.add_component(instance=document_writer, name="document_writer")
        
        
        pipeline.connect("file_type_router.application/pdf", "pypdf_converter.sources")
        pipeline.connect("pypdf_converter", "document_joiner")
        pipeline.connect("document_joiner", "document_cleaner")
        pipeline.connect("document_cleaner", "document_splitter")
        pipeline.connect("document_splitter", "document_embedder")
        pipeline.connect("document_embedder", "document_writer")
        self.pipeline = pipeline
        
    def index(self, sources: list) -> str:
        self.pipeline.run({"file_type_router": {"sources": sources}})

def factory(namespace: str) -> Indexer:
    return Indexer(
        settings.EMBEDDINNG_MODEL,
        documentStore(
            settings.EMBEDDING_DIMENSIONS,
            index="default",
            namespace=namespace
        )
    )
