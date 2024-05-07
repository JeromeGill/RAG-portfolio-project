from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Workspace
from .serializers import WorkspaceSerializer

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def workspace_view(request, workspace_id):
    try:
        workspace = Workspace.objects.get(pk=workspace_id)
    except Workspace.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = WorkspaceSerializer(workspace)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def workspace_list_view(request):
    workspaces = Workspace.objects.all()
    serializer = WorkspaceSerializer(workspaces, many=True)
    return Response(serializer.data)
