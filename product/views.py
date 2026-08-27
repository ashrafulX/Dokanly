from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from product.models import Product,Category

@api_view()
def view_specific_product(request,id):
    product=get_object_or_404(Product,pk=id)
    product_dict={'id':product.id,'name':product.name,'price':product.price}
    return Response(product_dict)
