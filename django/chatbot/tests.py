from django.test import TestCase
from rest_framework.test import APITestCase
from .serializers import QuestionSerializer
from rest_framework.test import APIClient

class TestQuestionSerializer(APITestCase):
    def test_serializer_with_valid_data(self):
        serializer = QuestionSerializer(data={'question': 'What is the meaning of life?'})
        self.assertTrue(serializer.is_valid())

    def test_serializer_with_invalid_data(self):
        # This question is over 1000 characters
        question = 'a' * 1001
        serializer = QuestionSerializer(data={'question': question})
        self.assertFalse(serializer.is_valid())

class TestQuestionViewSet(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get_method(self):
        response = self.client.get('/api')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, "Hello, world. You're at the chatbot index.")

    def test_post_method_with_invalid_data(self):
        response = self.client.post('/api', {'question': 'a' * 1001})
        self.assertEqual(response.status_code, 400)

    def test_post_method_with_valid_data(self):
        response = self.client.post('/api', {'question': 'What is the meaning of life?'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, "Question submitted successfully")
