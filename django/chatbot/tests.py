from django.test import TestCase
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token
from unittest.mock import patch
from .serializers import QuestionSerializer
from .models import MessageLog

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
        self.user = User.objects.create_user(username='test_user', password='test_password')
        # Create a token for the test user
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()

    def test_post_method_with_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post('/api/question', {'question/': 'a' * 1001})
        self.assertEqual(response.status_code, 400)


    @patch('chatbot.views.factory')
    def test_post_method_with_valid_data(self, mock_factory):
        mock_chatbot = mock_factory.return_value
        mock_chatbot.ask.return_value = 'Mock answer'
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post('/api/question', {'question': 'What is the meaning of life?'})
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, "Mock answer")
        mock_chatbot.ask.assert_called_once_with('What is the meaning of life?')

        message_log = MessageLog.objects.get(user=self.user)
        self.assertEqual(message_log.question, 'What is the meaning of life?')
        self.assertEqual(message_log.answer, 'Mock answer')

    @patch('chatbot.views.factory')
    def test_ask_question_view_logs_error(self, mock_factory):
        mock_chatbot = mock_factory.return_value
        mock_chatbot.ask.side_effect = Exception('Chatbot error')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post('/api/question', {'question': 'What is the meaning of life?'}, format='json')

        self.assertEqual(response.status_code, 500)

        message_log = MessageLog.objects.get(user=self.user)
        self.assertEqual(message_log.question, 'What is the meaning of life?')
        self.assertEqual(message_log.error, 'Chatbot error')

    def test_post_method_without_validtoken(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'invalid token')
        response = self.client.post('/api/question', {'question/': 'a' * 1001})
        self.assertEqual(response.status_code, 401)
