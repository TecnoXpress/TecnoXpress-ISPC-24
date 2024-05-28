from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, CategoriaViewSet, CarritoViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'carritos', CarritoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
