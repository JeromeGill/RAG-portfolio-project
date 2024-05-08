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
Usage: python -m documentRAG [chat | index] [namespace]
```

In order to index, pass a file into a namespace.
It works best with less files per namespace 

```
python -m documentRAG index your-namespace ./some.pdf
```

or a directory
```
python -m documentRAG index your-namespace ~/Documents/pdfs
```

to Chat with the index, try

```
python -m documentRAG chat [namespace]
``` 

You should see
```
Ask question:
```

Type something and after a second or two you should see an answer