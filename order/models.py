from django.db import models
from users.models import User
from product.models import Product
# Create your models here.
class Cart(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name='cart')
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"cart of {self.user.first_name}{self.user.last_name}"


class Cartitem(models.Model):
    cart=models.ForeignKey(Cart,on_delete=models.CASCADE,related_name='items')
    Product=models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.Product.name}"


class Order(models.Model):
    PENDING='Pending'
    SHIPPED='Shipped'
    DELIVERED='Delivered'
    STATUS_CHOICES=[
        (PENDING,'Pending'),
        (SHIPPED,'Shipped'),
        (DELIVERED,'Delivered'),
    ]
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='orders')
    status=models.CharField(max_length=20,choices=STATUS_CHOICES,default=PENDING)
    total_price=models.DecimalField(max_digits=10,decimal_places=2)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.first_name}"

class OrderItem(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='orderitems')
    quantity=models.PositiveIntegerField()
    price=models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"