from rest_framework import serializers
from Apps.Producto.models import Producto, Categoria,Carrito


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):

    categoria = serializers.PrimaryKeyRelatedField(queryset = Categoria.objects.all())

    class Meta:
        model = Producto
        fields = '__all__' 

class ProductoCategoriaSerializer(serializers.ModelSerializer):

    categoria = CategoriaSerializer(read_only=True)

    class Meta:
        model = Producto
        fields = '__all__' 


class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = '__all__'