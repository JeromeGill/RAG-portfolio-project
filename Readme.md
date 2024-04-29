# Architecture

## High level

As a user 
    - I want to be able to know more about a deep topic without having to read and remember the contents of every highly detailed report. 
    - I want to be able to simply ask questions, and get answers.
    - I want to be able to source my facts.
    - I want the facts as they are in the reports, without caveat. I can use my own judgement regarding their quality.

As an admin
    - I want to be able to upload relevant reports as I find them
    - I want them to be indexed and added to the archive

To achieve this, this project is going to be using the Hackstack framework for LLM projects, with django for admin and entity management.

### Frameworks/librarys

- Django
    - Admin panel
    - Admins will be able to upload documents here
    - Chat session management
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
https://github.com/HackSoftware/Django-Styleguide
https://medium.com/@Mr_Pepe/setting-your-python-project-up-for-success-in-2024-365e53f7f31e
https://docs.djangoproject.com/en/5.0/intro/tutorial01/

Some toolage

https://github.com/astral-sh/ruff
https://github.com/microsoft/pyright
https://django-environ.readthedocs.io/en/latest/quickstart.html
