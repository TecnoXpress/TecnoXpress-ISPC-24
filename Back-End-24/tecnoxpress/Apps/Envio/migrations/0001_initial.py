# Generated by Django 5.0.6 on 2024-05-24 13:51

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Producto', '0001_initial'),
        ('Usuario', '0002_alter_usuario_email'),
    ]

    operations = [
        migrations.CreateModel(
            name='Localidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=250)),
                ('codigo_postal', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Localidad',
                'verbose_name_plural': 'Localidades',
                'db_table': 'localidad',
            },
        ),
        migrations.CreateModel(
            name='Provincia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=250)),
            ],
            options={
                'verbose_name': 'Provincia',
                'verbose_name_plural': 'Provincias',
                'db_table': 'provincia',
            },
        ),
        migrations.CreateModel(
            name='Envio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('direccion', models.CharField(max_length=150)),
                ('descripcion', models.CharField(blank=True, max_length=250, null=True)),
                ('fecha_envio', models.DateTimeField(auto_now_add=True, null=True)),
                ('entregado', models.BooleanField(default=False)),
                ('carrito', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Producto.carrito')),
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='Usuario.usuario')),
                ('localidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Envio.localidad')),
            ],
            options={
                'verbose_name': 'Envío',
                'verbose_name_plural': 'Envíos',
                'db_table': 'envio',
            },
        ),
        migrations.AddField(
            model_name='localidad',
            name='provincia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Envio.provincia'),
        ),
    ]
