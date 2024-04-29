from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import QuestionSerializer
from documentRAG.chatbot.Chatbot import factory



class QuestionViewSet(APIView):
    def get(self, request):
        return Response("Hello, world. You're at the chatbot index.")
    def post(self, request):

        chatbot = factory()
        print(request)
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            answer = chatbot.ask(serializer.data['question'])
            return Response(answer)
        else:
            return Response(serializer.errors, 400)
