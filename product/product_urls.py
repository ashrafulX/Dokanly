from django.urls import path,include
from product import views
urlpatterns = [
    path('<int:id>/',views.view_specific_product),
]