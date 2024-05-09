from rest_framework import serializers

class QuestionSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=1000)
    index_name = serializers.CharField(max_length=1000)
