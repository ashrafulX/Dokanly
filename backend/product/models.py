from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator,MaxValueValidator
from .validators import validate_file_size

import os
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile

# Create your models here.
class Category(models.Model):
    name=models.CharField(max_length=30)
    description=models.TextField(blank=True,null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name=models.CharField(max_length=30)
    description=models.TextField(blank=True,null=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    stock=models.PositiveIntegerField()
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name='products')
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        ordering=['-id',]

    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='images')
    image=models.ImageField(upload_to='products/images/',validators=[validate_file_size])
    # file=models.FileField(upload_to='products/files/',validators=FileExtensionValidator('pdf'))


    def save(self, *args, **kwargs):
        # Convert only when a new image is uploaded
        if self.image and not self.image.name.lower().endswith('.webp'):

            # Keep old image name for deletion later
            old_image = None

            if self.pk:
                try:
                    old_instance = ProductImage.objects.get(pk=self.pk)
                    if old_instance.image:
                        old_image = old_instance.image.name
                except ProductImage.DoesNotExist:
                    pass

            # Open uploaded image
            img = Image.open(self.image)

            # Handle transparency
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')

            # Save as WebP in memory
            buffer = BytesIO()

            img.save(
                buffer,
                format='WEBP',
                quality=85,
                method=6
            )

            # Generate WebP filename
            original_name = os.path.splitext(
                os.path.basename(self.image.name)
            )[0]

            new_filename = f'{original_name}.webp'

            # Replace image with WebP
            self.image.save(
                new_filename,
                ContentFile(buffer.getvalue()),
                save=False
            )

            # Save model
            super().save(*args, **kwargs)

            # Delete old image from storage
            if old_image and old_image != self.image.name:
                try:
                    self.image.storage.delete(old_image)
                except Exception:
                    pass

            return

        super().save(*args, **kwargs)

class Review(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    # name=models.CharField(max_length=255)
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    ratings=models.PositiveIntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    comment=models.TextField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.first_name} on {self.product.name}"