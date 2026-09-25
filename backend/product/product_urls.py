from django.urls import path,include
from product import views
urlpatterns = [
    path('',views.ProductList.as_view(),name='products-list'),
    path('<int:pk>/',views.ProductDetails.as_view()),
]