from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.test import TestCase


class LoginTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_login(self):
        response = self.client.post('/api/login', {'username': 'testuser', 'password': 'testpass'}, format='json')
        self.assertEqual(response.status_code, 200)

        token = Token.objects.get(user__username='testuser')
        self.assertEqual(response.data, {'token': token.key})

class IsAuthedViewTest(TestCase):
    def setUp(self):
        # this needs to be testing tokens
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)


    def test_is_authed_view_authenticated(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/api/token')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {"message": "Authenticated"})

    def test_is_authed_view_unauthenticated(self):
        response = self.client.get('/api/token')
        self.assertEqual(response.status_code, 401)

