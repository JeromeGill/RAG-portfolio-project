# DocumentRAG

The project exists primarily for the author to get more familiar with the python (specifically django) ecosystem.

It will consist of a standalone python library for RAG operations, a django instance for authentication and REST API and a react frontend.

# Getting Started

This project is being developed using [pipenv](https://pipenv.pypa.io/en/latest/).

To get started, navigate to the root of the repo and run
```
pipenv shell
```

This opens a venv for the repo using pipenv. You will see the name of the repo in brackets prefixing your CLI if it has worked.

From here install dependencies with
```
pipenv install
```

Once that has completed, you can experiment with the documentRAG chatbot from the CLI by following the instructions in the [documentRAG readme](documentRAG/README.md)

# Running the Django backend

From the root cd into the django subdirectory `cd django`

Link the documentRAG library `pip install -e ../documentRAG`

Here you can run the tests with `./manage.py test`

Or boot up the server with `./manage.py runserver`

Create a user in the admin backend

With the server running on port 8000, you'll be able to make a request to the chatbot with curl

`curl -d '{"question":"Your question...."}' -H 'Authorization: Token {{Your token}}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/question`

If this has worked, you should see the response `"Question submitted successfully"`

# Architecture

## High level

- As a user
    - I want to be able to know more about a deep topic without having to read and remember the contents of every highly detailed report. 
    - I want to be able to simply ask questions, and get answers.
    - I want to be able to source my facts.
    - I want the facts as they are in the reports, without caveat. I can use my own judgement regarding their quality.

- As an admin
    - I want to be able to upload relevant reports as I find them
    - I want them to be indexed and added to the archive

To achieve this, this project is going to be using the Hackstack framework for LLM projects, with django for admin, authetication and user management.

### Frameworks/librarys

- Django
    - Admin panel
    - Admins will be able to upload documents here
    - REST Api with djangorestframework
    - Authentication/CORS etc
- Haystack
    - LLM pipelines
    - Haystack will index uploaded documents into pinecone
    - Haystack will also provide the LLM connection for the chat session
- Pinecone
    - Vector database
    - Indexed documents will be stored and retrieved as individual vectors
- React
    - React will provide a chatgpt style interface for interacting with documents
    - React will make an API call to Django to see what documents are available in the index
    - The user will select one, which will open a chat session via the django backend

## MVP/Improvements

### useful links for the author

Some guidelines
- https://github.com/HackSoftware/Django-Styleguide
- https://medium.com/@Mr_Pepe/setting-your-python-project-up-for-success-in-2024-365e53f7f31e
- https://docs.djangoproject.com/en/5.0/intro/tutorial01/
- https://medium.com/analytics-vidhya/how-to-create-a-python-library-7d5aea80cc3f

Some toolage

- https://github.com/astral-sh/ruff
- https://github.com/microsoft/pyright

