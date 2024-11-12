# Generated by Django 5.1.1 on 2024-10-31 04:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('center', '0010_remove_volounteer_house_no'),
        ('item', '0010_alter_itemreceive_timestamp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='itemreceive',
            name='Itemreceive_id',
        ),
        migrations.RemoveField(
            model_name='itemreceive',
            name='description',
        ),
        migrations.RemoveField(
            model_name='itemreceive',
            name='image',
        ),
        migrations.RemoveField(
            model_name='itemreceive',
            name='isReceived',
        ),
        migrations.RemoveField(
            model_name='itemreceive',
            name='quantity',
        ),
        migrations.RemoveField(
            model_name='itemreceive',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='itemreceive',
            name='center',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='center.center'),
        ),
        migrations.AddField(
            model_name='itemreceive',
            name='id',
            field=models.BigAutoField(auto_created=True, default=1, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='itemreceive',
            name='pickup',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='item.itempickup'),
        ),
        migrations.AddField(
            model_name='itemreceive',
            name='received_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='itemreceive',
            name='Volounteer_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='center.volounteer'),
        ),
    ]
