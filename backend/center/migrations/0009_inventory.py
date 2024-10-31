# Generated by Django 5.1.1 on 2024-10-30 14:34

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0008_volounteer_address'),
        ('item', '0010_alter_itemreceive_timestamp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inventory_id', models.CharField(max_length=5)),
                ('quantity', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('center', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='center.center')),
                ('item_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='item.itemtype')),
            ],
        ),
    ]
