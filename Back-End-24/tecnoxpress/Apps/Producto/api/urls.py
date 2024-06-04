from .views import ProductoViewSet, CategoriaViewSet, CarritoViewSet


from rest_framework.routers import DefaultRouter
router = DefaultRouter()


router.register(r'productos', ProductoViewSet, basename='productos')
router.register(r'categorias', CategoriaViewSet, basename='categorias')
router.register(r'carritos', CarritoViewSet, basename='carritos') 

urlpatterns = router.urls