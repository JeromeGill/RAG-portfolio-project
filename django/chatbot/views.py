from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import QuestionSerializer


class QuestionViewSet(APIView):
    def get(self, request):
        return Response("Hello, world. You're at the chatbot index.")
    def post(self, request):
        print(request)
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return Response("Question submitted successfully")
        else:
            return Response(serializer.errors, 400)

