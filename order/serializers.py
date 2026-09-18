from rest_framework import serializers
from order.models import Cart,Cartitem
from product.models import Product

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
        