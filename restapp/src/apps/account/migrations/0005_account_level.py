# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-19 13:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0004_auto_20160916_1801'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='level',
            field=models.CharField(choices=[('beginner', 'beginner'), ('intermediate', 'intermediate'), ('mothertongue', 'mothertongue')], default='beginner', max_length=12),
        ),
    ]