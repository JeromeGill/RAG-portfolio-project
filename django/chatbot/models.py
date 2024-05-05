from django.db import models
from django.contrib.auth.models import User

class MessageLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(auto_now_add=True)
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    error = models.TextField(blank=True, null=True)
