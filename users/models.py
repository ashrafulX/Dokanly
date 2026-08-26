from django.db import models
from django.contrib.auth.models import AbstractUser
from users.managers import CustomeUserManager
# Create your models here.

class User(AbstractUser):
    username=None
    email=models.EmailField(unique=True)
    address=models.TextField(blank=True,null=True)
    phone_number=models.CharField(max_length=15,blank=True,null=True)

    USERNAME_FIELD='email' #use email insted of username
    REQUIRED_FIELDS=[]
    objects=CustomeUserManager()

    def __str__(self):
        return f"First name: {self.first_name}, Email: {self.email}"
    
