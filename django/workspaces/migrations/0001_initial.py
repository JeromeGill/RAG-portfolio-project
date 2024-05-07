# Generated by Django 5.0.4 on 2024-05-07 20:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Workspace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(blank=True, default='', max_length=100)),
                ('chatbot_introduction', models.TextField(blank=True, null=True)),
                ('index_name', models.CharField(blank=True, default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('title', models.TextField(blank=True, default='')),
                ('source', models.TextField(blank=True, default='')),
                ('workspace', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='workspaces.workspace')),
            ],
        ),
    ]