# Generated by Django 5.0.6 on 2024-05-28 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Usuario', '0002_alter_usuario_email'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AlterField(
            model_name='usuario',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
