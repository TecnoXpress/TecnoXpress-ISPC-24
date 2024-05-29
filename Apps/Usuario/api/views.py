from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import DjangoModelPermissions
from Apps.Usuario.api.serializers import GrupoResponseSerializer, GrupoSerializer, PermisosSerializer, UsuarioCreateUpdateeSerializer, UsuarioResponseSerializer, UsuarioSerializer
from Apps.Usuario.models import Usuario
from drf_spectacular.utils import extend_schema, OpenApiParameter
from django.contrib.auth.models import Group, Permission


class UsuarioViewSet(ModelViewSet):
 
    queryset = Usuario.objects.all()
    serializer_class = UsuarioCreateUpdateeSerializer
    permission_classes = [DjangoModelPermissions]

    def list(self, request, *args, **kwargs):
        self.serializer_class = UsuarioResponseSerializer
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = UsuarioResponseSerializer
        return super().retrieve(request, *args, **kwargs)
    

class PermisosViewSet(mixins.ListModelMixin,GenericViewSet):
    queryset = Permission.objects.all()
    permission_classes = [DjangoModelPermissions]
    serializer_class = PermisosSerializer

    @extend_schema(
        parameters=[OpenApiParameter(name='name', description='Buscar por nombre de permiso', required=False, type=str)],
    )
    def list(self, request, *args, **kwargs):
        
        nombre = request.GET.get('name')

        if nombre:
            self.queryset = self.queryset.filter(name__icontains=nombre)

        return super().list(request, *args, **kwargs)

class GrupoViewSet(ModelViewSet):
    queryset = Group.objects.all()
    permission_classes = [DjangoModelPermissions]
    serializer_class = GrupoSerializer

    @extend_schema(
        parameters=[OpenApiParameter(name='name', description='Buscar por nombre de grupo', required=False, type=str)],)
    def list(self, request, *args, **kwargs):

        self.serializer_class = GrupoResponseSerializer
        nombre = request.GET.get('name')

        if nombre:
            self.queryset = self.queryset.filter(name__icontains=nombre)
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = GrupoResponseSerializer
        return super().retrieve(request, *args, **kwargs)