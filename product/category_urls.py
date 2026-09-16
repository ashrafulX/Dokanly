from django.urls import path,include
from product import views
urlpatterns = [
    path('<int:pk>/',views.CategoryDetails.as_view(),name='view-specific-category'),
    path('',views.CategoryList.as_view(),name='view-category'),
]