from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from product.models import Product,Category
from product.serializers import ProductSerializer,CategorySerializer

@api_view()
def view_specific_product(request,pk):
    product=get_object_or_404(Product,pk=pk)
    serializer=ProductSerializer(product)
    return Response(serializer.data)


@api_view()
def view_products(request):
    product=Product.objects.select_related('category').all()
    serializer=ProductSerializer(product,many=True,context={'request': request})
    return Response(serializer.data)


@api_view()
def view_specific_category(request,pk):
    category=Category.objects.get(pk=pk)
    serializer=CategorySerializer(category)
    return Response(serializer.data)