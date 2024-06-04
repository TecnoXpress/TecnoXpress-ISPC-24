from rest_framework import serializers
from ..models import Usuario
from django.contrib.auth.models import Group, Permission

class PermisosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Permission
        fields = ["id", "name", ]

class GrupoSerializer(serializers.ModelSerializer):

    permissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Permission.objects.all())

    class Meta:
        model = Group
        fields = ["id","name","permissions"]


class GrupoResponseSerializer(GrupoSerializer):
    
    permissions = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
     )


class UsuarioSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = '__all__' 


class UsuarioResponseSerializer(UsuarioSerializer):

    group = GrupoSerializer(read_only=True)


class UsuarioCreateUpdateeSerializer(UsuarioSerializer):

    group = serializers.PrimaryKeyRelatedField(many=True,queryset=Group.objects.all())
