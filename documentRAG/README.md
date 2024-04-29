A small library to perform RAG operations on an indexed document.

Currently this exists as part of a monorepo.

Dependencies are handled by Pipfile in the root of the repo. See the main readme for how to install them.

requirements
 - OpenAPI account  -   https://platform.openai.com/playground
 - Pinecone account -   https://www.pinecone.io/

```
cp env.example .env
```
Fill in both keys
 - OPENAI_API_KEY
 - PINECONE_API_KEY

Then run

```
python documentRAG/__main__.py
```

You should see

```
Ask question: 
```

Type something and after a second or two you should see an answer