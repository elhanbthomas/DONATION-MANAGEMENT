# Generated by Django 5.1.1 on 2024-10-29 17:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0006_alter_volounteerpickup_volunteer'),
    ]

    operations = [
        migrations.AddField(
            model_name='volounteerpickup',
            name='isReceived',
            field=models.BooleanField(default=False),
        ),
    ]
