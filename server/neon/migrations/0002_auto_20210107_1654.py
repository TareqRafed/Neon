# Generated by Django 3.1.5 on 2021-01-07 14:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('neon', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='artwork',
            name='height',
            field=models.IntegerField(default=3),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='artwork',
            name='width',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='artwork',
            name='discription',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='artwork',
            name='image',
            field=models.ImageField(height_field='height', upload_to='images/<function user_directory_path at 0x000001E630195EE0>', width_field='width'),
        ),
    ]
