from django.db import models

# Create your models here.
# Each document should have been indexed in the vector store
# Once indexed, it can be created as a model here
# It's important not to create documents here that don't exist in the vector store
class Document(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    workspace = models.ForeignKey('Workspace', on_delete=models.DO_NOTHING)
    title = models.TextField(blank=True, default='')
    source = models.TextField(blank=True, default='')

# A workspace represents a collection of documents
# A document is an indexed part of the embedding the chatbot can derive information from
class Workspace(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    # The name of the workspace the user sees
    name = models.CharField(max_length=100, blank=True, default='')

    # This appears as the first message from the chatbot for this workspace
    chatbot_introduction = models.TextField(blank=True, null=True)
    
    # This is the namespace we send to pinecone/the document store.
    # It's the name of the vector index
    index_name = models.CharField(max_length=100, blank=True, default='')
