from .models import Order,OrderItem,Cart
from django.db import transaction
from rest_framework.exceptions import PermissionDenied,ValidationError

class OrderService:
    @staticmethod
    def create_order(user_id,cart_id):
        with transaction.atomic():
            cart=Cart.objects.get(pk=cart_id)
            cart_items=cart.items.select_related('product').all()

            total_price=sum([item.product.price *
                            item.quantity for item in cart_items])
            #order create kore felbe
            order=Order.objects.create(user_id=user_id,total_price=total_price)

            #order item gula dekhabe & databse e save korbe
            order_items=[
                OrderItem(
                    order=order,
                    product=item.product,
                    price=item.product.price,
                    quantity=item.quantity,
                    total_price=item.product.price * item.quantity
                )
                for item in cart_items
            ]

            OrderItem.objects.bulk_create(order_items)

            cart.delete()
            return order

    @staticmethod
    def cancel_order(user,order):
        if user.is_staff:
            order.status = Order.CANCELED
            order.save()
            return order
        
        if order.user != user:
            raise PermissionDenied({'detail': 'You can only Cancel Your Own Order'})
        
        if order.status == Order.DELIVERED:
            raise ValidationError({'detail':'You cannot cancel order after Delivered'})

        order.status=Order.CANCELED
        order.save()
        return order