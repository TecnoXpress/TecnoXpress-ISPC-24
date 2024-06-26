# Generated by Django 5.0.6 on 2024-05-13 13:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Envio', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='provincia',
            options={'verbose_name': 'Provincia', 'verbose_name_plural': 'Provincias'},
        ),
        migrations.AddField(
            model_name='envio',
            name='entregado',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='envio',
            name='fecha_envio',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='provincia',
            name='nombre',
            field=models.CharField(max_length=250),
        ),
        migrations.AlterModelTable(
            name='provincia',
            table='provincia',
        ),
        migrations.CreateModel(
            name='Localidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=250)),
                ('codigo_postal', models.CharField(max_length=50)),
                ('provincia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Envio.provincia')),
            ],
            options={
                'verbose_name': 'Localidad',
                'verbose_name_plural': 'Localidades',
                'db_table': 'localidad',
            },
        ),
        migrations.AlterField(
            model_name='envio',
            name='codigo_postal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Envio.localidad'),
        ),
        migrations.DeleteModel(
            name='CodigoPostal',
        ),
    ]
