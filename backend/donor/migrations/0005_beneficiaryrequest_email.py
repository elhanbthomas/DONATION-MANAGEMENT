# Generated by Django 5.1.1 on 2024-10-14 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donor', '0004_remove_beneficiary_center_id_remove_beneficiary_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='beneficiaryrequest',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
