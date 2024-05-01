from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import QuestionSerializer
from documentRAG.chatbot.Chatbot import factory


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ask_question_view(request):
    chatbot = factory()
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        answer = chatbot.ask(serializer.data['question'])
        return Response(answer)
    else:
            return Response(serializer.errors, 400)

