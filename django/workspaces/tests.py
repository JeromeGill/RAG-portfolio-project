from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.test import APIClient
from .models import Workspace

class WorkspaceViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(username='test_user', password='test_password')
        # Create a token for the test user
        self.token = Token.objects.create(user=self.user)
        self.workspace1 = Workspace.objects.create(
            name='Test Workspace 1 ',
            chatbot_introduction='Welcome to the 1st Test Workspace!',
            index_name='test_workspace'
        )

        self.workspace1 = Workspace.objects.create(
            name='Test Workspace 2',
            chatbot_introduction='Welcome to the 2nd Test Workspace!',
            index_name='test_workspace'
        )

    def test_workspace_view(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(f'/api/workspace/{self.workspace1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.workspace1.name)

    def test_workspace_list_view(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/api/workspaces/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], self.workspace1.name)
        self.assertEqual(response.data[1]['name'], self.workspace2.name)

    def test_workspace_view_without_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'invalid token')
        response = self.client.get(f'/api/workspace/{self.workspace1.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_workspace_list_view_without_token(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'invalid token')
        response = self.client.get('/api/workspaces/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)