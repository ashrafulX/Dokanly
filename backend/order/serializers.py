from rest_framework import serializers
from order.models import Cart,Cartitem,Order,OrderItem
from product.models import Product
from .services import OrderService

class MinimalProductSerializers(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=['id','name','price']

class CartItemSerializers(serializers.ModelSerializer):
    product=MinimalProductSerializers()
    total_price=serializers.SerializerMethodField('get_total_price')
    class Meta:
        model=Cartitem
        fields=['id','product','quantity','product','total_price']

    def get_total_price(self,cart_item:Cartitem):
        return cart_item.product.price * cart_item.quantity

class CartSerializers(serializers.ModelSerializer):
    items=CartItemSerializers(many=True,read_only=True)
    total_price=serializers.SerializerMethodField('get_total_price')
    class Meta:
        model=Cart
        fields=['id','user','items','total_price']
        read_only_fields=['user']

    def get_total_price(self,cart:Cart):
        return sum([item.product.price * item.quantity for item in  cart.items.all()])

class AddCartItemSerializers(serializers.ModelSerializer):
    product_id=serializers.IntegerField()
    class Meta:
        model=Cartitem
        fields=['id','product_id','quantity']

    def save(self,**kwargs):
        cart_id=self.context['cart_id']
        product_id=self.validated_data['product_id']
        quantity=self.validated_data['quantity']
        try:
            cart_item=Cartitem.objects.get(cart_id=cart_id,product_id=product_id)
            cart_item.quantity+=quantity
            self.instance = cart_item.save()
        except Cartitem.DoesNotExist:
            self.instance=Cartitem.objects.create(cart_id=cart_id,**self.validated_data)

        return self.instance


    def validate_product_id(self,value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError(f"Product with id {value} Doest not Exists")
        return value


class UpdateCartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cartitem
        fields=['quantity']


class OrderItemSerializer(serializers.ModelSerializer):
    product=MinimalProductSerializers()
    class Meta:
        model=OrderItem
        fields=['id','product','quantity','price','total_price']


class CreateOrderSerializer(serializers.Serializer):
    cart_id=serializers.UUIDField()

    def validate_cart_id(self,cart_id):
        if not Cart.objects.filter(pk=cart_id).exists():
            raise serializers.ValidationError('No Cart Fount with this id!')
        if not Cartitem.objects.filter(cart_id=cart_id).exists():
            raise serializers.ValidationError('Cart is Empty!')
        return cart_id

    def create(self,validated_data):
        user_id=self.context['user_id']
        cart_id=validated_data['cart_id']

        try:
            order=OrderService.create_order(user_id=user_id,cart_id=cart_id)
            return order
        except ValueError as e:
            raise serializers.ValidationError(str(e))

    def to_representation(self, instance):
        return OrderSerializer(instance).data


class UpdateOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=['status']
""" 
#doing it by using actions
    def update(self, instance, validated_data):
        user=self.context['user']
        new_status = validated_data['status']

        if new_status == Order.CANCELED:
            return OrderService.cancel_order(user=user,order=instance)

        if not user.is_staff:
            raise serializers.ValidationError('You are not allowed to update an Order!')

        return super().update(instance,validated_data)
"""


class OrderSerializer(serializers.ModelSerializer):
    items=OrderItemSerializer(many=True)
    class Meta:
        model=Order
        fields=['id','user','status','total_price','created_at','items']


class EmptySerializer(serializers.Serializer):
    pass