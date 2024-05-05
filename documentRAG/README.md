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
python -m documentRAG
```

You should see

```
Usage: python -m documentRAG [chat | index]
```

In order to index, pass a file in 

```
python -m documentRAG index ./some.pdf
```

or a directory
```
python -m documentRAG index ~/Documents/pdfs
```

to Chat with the index, try

```
python -m documentRAG chat
``` 

You should see
```
Ask question:
```

Type something and after a second or two you should see an answer