# Settings for the RAG chatbot
# We're hardcoding these for for this version ideally they will be configurable by an admin

PROMPT_TEMPLATE = """
Answer the questions based on the given context.

Context:
{% for document in documents %}
    {{ document.content }}
{% endfor %}

Question: {{ question }}
Answer:
"""


EMBEDDINNG_MODEL="sentence-transformers/all-MiniLM-L6-v2"
EMBEDDING_DIMENSIONS=384 # Check the embedding model doumentation to find this

LLM_MODEL="gpt-3.5-turbo"