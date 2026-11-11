import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Dokanly.settings')
django.setup()

import cloudinary.uploader
from product.models import Product, ProductImage

PRODUCT_IMAGES = {
    1: ("smartphone", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=85&auto=format&fit=crop"),
    2: ("laptop", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85&auto=format&fit=crop"),
    3: ("wireless_headphones", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85&auto=format&fit=crop"),
    4: ("smartwatch", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85&auto=format&fit=crop"),
    5: ("tablet", "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85&auto=format&fit=crop"),
    6: ("bluetooth_speaker", "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=85&auto=format&fit=crop"),
    7: ("digital_camera", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85&auto=format&fit=crop"),
    8: ("gaming_console", "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=85&auto=format&fit=crop"),
    9: ("monitor", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=85&auto=format&fit=crop"),
    10: ("external_hard_drive", "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=85&auto=format&fit=crop"),

    11: ("t_shirt", "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&q=85&auto=format&fit=crop"),
    12: ("jeans", "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85&auto=format&fit=crop"),
    13: ("sneakers", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=85&auto=format&fit=crop"),
    14: ("jacket", "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=85&auto=format&fit=crop"),
    15: ("scarf", "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=85&auto=format&fit=crop"),
    16: ("wrist_watch", "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=85&auto=format&fit=crop"),
    17: ("sunglasses", "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=85&auto=format&fit=crop"),
    18: ("handbag", "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85&auto=format&fit=crop"),
    19: ("belt", "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=85&auto=format&fit=crop"),
    20: ("sports_shoes", "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=85&auto=format&fit=crop"),

    21: ("microwave_oven", "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=85&auto=format&fit=crop"),
    22: ("refrigerator", "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&q=85&auto=format&fit=crop"),
    23: ("washing_machine", "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=85&auto=format&fit=crop"),
    24: ("vacuum_cleaner", "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=85&auto=format&fit=crop"),
    25: ("air_conditioner", "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=85&auto=format&fit=crop"),
    26: ("toaster", "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=85&auto=format&fit=crop"),
    27: ("coffee_maker", "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=85&auto=format&fit=crop"),
    28: ("blender", "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=85&auto=format&fit=crop"),
    29: ("water_heater", "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=85&auto=format&fit=crop"),
    30: ("dishwasher", "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=85&auto=format&fit=crop"),

    31: ("fiction_novel", "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=85&auto=format&fit=crop"),
    32: ("science_textbook", "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=85&auto=format&fit=crop"),
    33: ("history_book", "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=85&auto=format&fit=crop"),
    34: ("biography", "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=85&auto=format&fit=crop"),
    35: ("self_help_book", "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=85&auto=format&fit=crop"),
    36: ("cookbook", "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=85&auto=format&fit=crop"),
    37: ("childrens_storybook", "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=85&auto=format&fit=crop"),
    38: ("travel_guide", "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=85&auto=format&fit=crop"),
    39: ("mystery_novel", "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=85&auto=format&fit=crop"),
    40: ("fantasy_novel", "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85&auto=format&fit=crop"),
}

def populate():
    print(f"Starting upload & sync for {len(PRODUCT_IMAGES)} products...")
    success_count = 0

    for prod_id, (slug, img_url) in PRODUCT_IMAGES.items():
        try:
            prod = Product.objects.filter(id=prod_id).first()
            if not prod:
                print(f"Skipping product ID {prod_id}: not found in DB")
                continue

            public_id = f"dokanly/products/prod_{prod_id}_{slug}"
            print(f"[{prod_id}/40] Uploading image for: {prod.name} ({prod.category.name})...")

            res = cloudinary.uploader.upload(
                img_url,
                folder="dokanly/products",
                public_id=f"prod_{prod_id}_{slug}",
                overwrite=True,
                resource_type="image"
            )

            # Update or create the ProductImage
            # Delete any old empty/broken images for this product
            ProductImage.objects.filter(product=prod).delete()
            ProductImage.objects.create(product=prod, image=res['public_id'])

            print(f" -> OK: {res['secure_url']}")
            success_count += 1
        except Exception as e:
            print(f" -> ERROR on product {prod_id}: {e}")

    print(f"\nDone! Successfully synchronized {success_count}/{len(PRODUCT_IMAGES)} product images to Cloudinary and database.")

if __name__ == '__main__':
    populate()
