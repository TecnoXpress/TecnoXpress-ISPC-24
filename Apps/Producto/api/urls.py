from .views import ProductoViewSet, CategoriaViewSet


from rest_framework.routers import DefaultRouter
router = DefaultRouter()


router.register(r'productos', ProductoViewSet, basename='productos')
router.register(r'categorias', CategoriaViewSet, basename='categorias')
