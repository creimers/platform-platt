# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-09 14:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='personal_description',
            field=models.TextField(null=True),
        ),
    ]
