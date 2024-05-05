from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import QuestionSerializer
from .models import MessageLog
from documentRAG.chatbot.Chatbot import factory


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ask_question_view(request):
    chatbot = factory()
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        question = serializer.data['question']
        user = request.user
        
        try:
            answer = chatbot.ask(question)
        except Exception as e:
            MessageLog.objects.create(user=user, question=question, error=str(e))
            return Response('Something went wrong, please ask for help', 500)

        MessageLog.objects.create(user=user, question=question, answer=answer)
        return Response(answer)
    else:
            return Response(serializer.errors, 400)

