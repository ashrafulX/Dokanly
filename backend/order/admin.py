from django.contrib import admin
from order.models import Cart,Cartitem,Order,OrderItem
# Register your models here.

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display=['id','user']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display=['id','user','status']

admin.site.register(Cartitem)
admin.site.register(OrderItem)
