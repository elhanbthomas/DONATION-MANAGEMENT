# Generated by Django 5.1.1 on 2024-11-01 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0017_centerreceive_iscomplete'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='centerreceive',
            name='isComplete',
        ),
        migrations.AddField(
            model_name='centershipping',
            name='isComplete',
            field=models.BooleanField(default=False),
        ),
    ]
