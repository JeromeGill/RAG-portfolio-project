"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import is_authed_view
from chatbot.views import ask_question_view
from workspaces.views import workspace_view, workspace_list_view

from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', views.obtain_auth_token),
    path('api/token', is_authed_view, name='is_authed'),
    path("api/question", ask_question_view, name="question"),
    path('api/workspace/<int:workspace_id>/', workspace_view, name='workspace-detail'),
    path('api/workspaces/', workspace_list_view, name='workspace-list'),
    # other paths...
]

