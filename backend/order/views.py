from django.shortcuts import render
from order.models import Cart,Cartitem,Order,OrderItem
from order.serializers import CartSerializers,CartItemSerializers,AddCartItemSerializers,UpdateCartItemSerializer,OrderSerializer,CreateOrderSerializer,UpdateOrderSerializer,EmptySerializer
from rest_framework.mixins import CreateModelMixin,RetrieveModelMixin,DestroyModelMixin
from rest_framework.viewsets import GenericViewSet,ModelViewSet
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.decorators import action
from .services import OrderService
from rest_framework.response import Response

# Create your views here.


class CartViewset(CreateModelMixin,RetrieveModelMixin,DestroyModelMixin,GenericViewSet):
    
    serializer_class=CartSerializers
    permission_classes=[IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if getattr(self,'swagger_fake_view',False):
            return Cart.objects.none()
        return Cart.objects.prefetch_related('items__product').filter(user=self.request.user)

  
    

class CartItemViewset(ModelViewSet):
    http_method_names=['get','post','patch','delete']
    def get_serializer_class(self):
        if self.request.method=='POST':
            return AddCartItemSerializers
        elif self.request.method=='PATCH':
            return UpdateCartItemSerializer
        
        return CartItemSerializers

    def get_queryset(self):
        return Cartitem.objects.select_related('product').filter(cart_id=self.kwargs.get('cart_pk'))

    def get_serializer_context(self):
        return {'cart_id':self.kwargs.get('cart_pk')}



class OrderViewSet(ModelViewSet):
    http_method_names=['get','post','delete','patch','head','options']


    @action(detail=True,methods=['post'])
    def cancel(self,request,pk=None):
        order=self.get_object()
        OrderService.cancel_order(order=order,user=request.user)
        return Response({'status': 'Order Canceld'})
    
    @action(detail=True,methods=['patch'])
    def update_status(self,request,pk=None):
        order=self.get_object()
        serializer=UpdateOrderSerializer(order,data=request.data,partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status':f'order status update to {request.data['status']}'})

    def get_serializer_class(self):
        if self.action=='cancel':
            return EmptySerializer
        if self.action=='create':
            return CreateOrderSerializer
        if self.action=='update_status':
            return UpdateOrderSerializer
        return OrderSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]
        return [IsAuthenticated()]
    
    def get_serializer_context(self):
        return {'user_id':self.request.user.id , 'user':self.request.user}
    
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return Order.objects.none()
        if self.request.user.is_staff:
            return Order.objects.prefetch_related('items__product').all()
        return Order.objects.prefetch_related('items__product').filter(user=self.request.user)