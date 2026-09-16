from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from product.models import Product,Category
from product.serializers import ProductSerializer,CategorySerializer
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet


class ProductViewSet(ModelViewSet):
    queryset=Product.objects.select_related('category').all()
    serializer_class=ProductSerializer


class CategoryViewSet(ModelViewSet):
    queryset=Category.objects.annotate(product_count=Count('products')).all()
    serializer_class=CategorySerializer


#using Mixin-Less Code
class ProductList(ListCreateAPIView):
    queryset=Product.objects.select_related('category').all()
    serializer_class=ProductSerializer

class ProductDetails(RetrieveUpdateDestroyAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field='pk'

class CategoryList(ListCreateAPIView):
    queryset=Category.objects.annotate(product_count=Count('products')).all()
    serializer_class=CategorySerializer

class CategoryDetails(RetrieveUpdateDestroyAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
    lookup_field='pk'
















#class Based Api View
""" 
class View_specific_category(APIView):
    def get(self,request,pk):
        category=get_object_or_404(Category.objects.annotate(product_count=Count('products')).all(),pk=pk)
        serializer=CategorySerializer(category)
        return Response(serializer.data)

    def put(self,request,pk):
        category=get_object_or_404(Category,pk=pk)
        serializer=CategorySerializer(Category,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request,pk):
        category=get_object_or_404(Category,pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class View_category(APIView):
    def get(self,reqeust):
        category=Category.objects.annotate(product_count=Count('products')).all()
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class View_products(APIView):

    def get(self,request):
        product=Product.objects.select_related('category').all()
        serializer=ProductSerializer(product,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class View_specific_product(APIView):
    
    def get(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data)

    def put(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
"""

#Function Based Api View
""" 
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
"""


""" 
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
"""


""" 
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
"""

"""
@api_view()
def view_specific_category(request,pk):
    category=Category.objects.get(pk=pk)
    serializer=CategorySerializer(category)
    return Response(serializer.data)

"""