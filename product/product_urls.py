from django.urls import path,include
from product import views
urlpatterns = [
    path('<int:pk>/',views.view_specific_product),
    path('',views.view_products,name='products-list'),
]