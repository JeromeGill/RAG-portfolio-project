from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import DocumentSerializer
from .models import Document


def index(request):
    return HttpResponse("Hello, world. You're at the document index.")


# Create your views here.

class DocumentView(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()