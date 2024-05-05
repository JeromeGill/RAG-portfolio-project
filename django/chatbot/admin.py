from django.contrib import admin

# Register your models here.
from .models import MessageLog

admin.site.register(MessageLog)