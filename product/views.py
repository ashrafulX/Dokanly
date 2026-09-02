from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from product.models import Product,Category
from product.serializers import ProductSerializer,CategorySerializer
from django.db.models import Count

@api_view(['GET','PUT','DELETE'])
def view_specific_product(request,pk):
    if request.method == 'GET':
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        product=get_object_or_404(Product,pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET','POST'])
def view_products(request):
    if request.method == 'GET':
        product=Product.objects.select_related('category').all()
        serializer=ProductSerializer(product,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer=ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
       

@api_view()
def view_specific_category(request,pk):
    category=Category.objects.get(pk=pk)
    serializer=CategorySerializer(category)
    return Response(serializer.data)

@api_view(['GET','POST'])
def view_category(request):
    if request.method == 'GET':
        category=Category.objects.annotate(product_count=Count('products')).all()
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

