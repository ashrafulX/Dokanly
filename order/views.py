from django.shortcuts import render
from order.models import Cart,Cartitem
from order.serializers import CartSerializers,CartItemSerializers,AddCartItemSerializers,UpdateCartItemSerializer
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,DestroyModelMixin
from rest_framework.viewsets import GenericViewSet,ModelViewSet
# Create your views here.

class CartViewset(CreateModelMixin,RetrieveModelMixin,DestroyModelMixin,GenericViewSet):
    queryset=Cart.objects.all()
    serializer_class=CartSerializers

class CartItemViewset(ModelViewSet):
    http_method_names=['get','post','patch','delete']
    def get_serializer_class(self):
        if self.request.method=='POST':
            return AddCartItemSerializers
        elif self.request.method=='PATCH':
            return UpdateCartItemSerializer
        
        return CartItemSerializers

    def get_queryset(self):
        return Cartitem.objects.filter(cart_id=self.kwargs['cart_pk'])

    def get_serializer_context(self):
        return {'cart_id':self.kwargs['cart_pk']}

