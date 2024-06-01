from .views import UsuarioViewSet, GrupoViewSet, PermisosViewSet


from rest_framework.routers import DefaultRouter
router = DefaultRouter()


router.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router.register(r'permisos', PermisosViewSet, basename='permisos')
router.register(r'grupos', GrupoViewSet, basename='grupos')
