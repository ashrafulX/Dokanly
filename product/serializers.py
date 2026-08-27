from decimal import Decimal
from rest_framework import serializers
from product.models import Product, Category

class CategorySerializer(serializers.Serializer):
    id=serializers.IntegerField()
    name=serializers.CharField()
    description=serializers.CharField()


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    unit_price = serializers.DecimalField(max_digits=10,decimal_places=2,source='price')
    price_with_tax=serializers.SerializerMethodField(method_name='calculate_tax')

    def calculate_tax(self,product):
        return round(product.price * Decimal(0.1),2)

    # category=CategorySerializer()
    category=serializers.HyperlinkedRelatedField(
        queryset=Category.objects.all(),
        view_name='view-specific-category'
    )