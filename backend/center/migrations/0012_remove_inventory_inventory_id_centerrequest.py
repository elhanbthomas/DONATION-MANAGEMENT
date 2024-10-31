# Generated by Django 5.1.1 on 2024-10-31 15:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0011_alter_inventory_inventory_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='inventory',
            name='inventory_id',
        ),
        migrations.CreateModel(
            name='CenterRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=200)),
                ('quantity', models.IntegerField()),
                ('status', models.CharField(default='Pending', max_length=20)),
                ('Center_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='center.center')),
            ],
        ),
    ]
