# Generated by Django 5.1.1 on 2024-10-12 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item', '0006_rename_center_id_itempickup_center_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itempickup',
            name='description',
        ),
        migrations.AddField(
            model_name='donorrequest',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='donorrequest',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
