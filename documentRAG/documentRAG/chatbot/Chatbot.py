from haystack import Pipeline
from haystack.components.embedders import SentenceTransformersTextEmbedder
from haystack.components.builders import PromptBuilder
from haystack.components.generators import OpenAIGenerator

from ..shared.retriever import retriever
from .. import settings


class Chatbot():
    def __init__(
            self,
            prompt_template: str,
            embedder_model: str,
            open_ai_model: str, 
            document_retriever
        ) -> None:
        """Configure pipeline
        """

        pipeline = Pipeline()
        pipeline.add_component("embedder", SentenceTransformersTextEmbedder(model=embedder_model))
        pipeline.add_component("prompt_builder", PromptBuilder(template=prompt_template))
        
        pipeline.add_component("retriever", document_retriever)
        
        # In this version, we're just using the OpenAI LLM
        # @todo inject LLM generator, and ask handler methods
        text_generator = OpenAIGenerator(model=open_ai_model)

        pipeline.add_component("llm", text_generator)
        
        pipeline.connect("embedder.embedding", "retriever.query_embedding")
        pipeline.connect("retriever", "prompt_builder.documents")
        pipeline.connect("prompt_builder", "llm")
        self.pipeline = pipeline
        
    def ask(self, question: str) -> str:
        # These are the embedder arguments and text response for the OpenAI LLM specifically
        # This method will need strategy pattern to support other LLMs
        response = self.pipeline.run({"embedder": {"text": question}, "prompt_builder": {"question": question}}, False)
        return response["llm"]["replies"][0]


def factory(document_namespace: str = "default"):
    return Chatbot(
        settings.PROMPT_TEMPLATE,
        settings.EMBEDDINNG_MODEL,
        settings.LLM_MODEL,
        retriever(
            settings.EMBEDDING_DIMENSIONS,
            namespace=document_namespace
        )
    )
