from django.urls import path,include
from product import views
urlpatterns = [
    path('<int:pk>/',views.view_specific_category,name='view-specific-category'),
]