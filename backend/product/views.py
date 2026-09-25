from product.models import Product,Category,Review,ProductImage
from product.serializers import ProductSerializer,CategorySerializer,ReviewSerializer,ProductImageSerilizer
from django.db.models import Count
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from product.filters import ProductFilter
from rest_framework.filters import SearchFilter,OrderingFilter
from product.pagination import DefaultPagination
from api.permissions import IsAdminOrReadOnly
from .permissions import IsReviewAuthorOrReadonly
from drf_yasg.utils import swagger_auto_schema

class ProductViewSet(ModelViewSet):
    """
    API endpoint for managing products in the e-commerce store
     - Allow authenticated admin to create, update,and delete products
     - Allows users to browse and filter product
     - Support searching by name,descritipn,category
     - Support ordering by price and updated_at

    """
    queryset=Product.objects.select_related('category').all()
    serializer_class=ProductSerializer
    filter_backends=[DjangoFilterBackend,SearchFilter,OrderingFilter]
    # filterset_fields=['category_id','price']
    pagination_class=DefaultPagination
    filterset_class=ProductFilter
    search_fields=['name','description','category__name']
    ordering_fields=['price']
    # permission_classes=[DjangoModelPermissions]
    # permission_classes=[FullDjangoModelPermission]
    permission_classes=[IsAdminOrReadOnly]

    @swagger_auto_schema(
            operation_summary="Create a product by admin",
            operation_description='This Allow an Admin to create a product ',
            request_body=ProductSerializer,
            responses={
               201:ProductSerializer,
               400:'Bad Request' 
            }
    )
    def create(self, request, *args, **kwargs):
        """Only authenticated admin can create product"""
        return super().create(request, *args, **kwargs)

    """ 
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsAdminUser()]


    def get_queryset(self):
        queryset=Product.objects.select_related('category').all()
        category_id=self.request.query_params.get('category_id')

        if category_id is not None:
            queryset=Product.objects.select_related('category').filter(category_id=category_id)
        return queryset
        
    """

class ProductImageViewSet(ModelViewSet):
    serializer_class=ProductImageSerilizer
    permission_classes=[IsAdminOrReadOnly]

    def get_queryset(self):
        return ProductImage.objects.filter(product_id=self.kwargs.get('product_pk'))

    def perform_create(self,serializer):
        serializer.save(product_id=self.kwargs.get('product_pk'))
                       

class CategoryViewSet(ModelViewSet):
    queryset=Category.objects.annotate(product_count=Count('products')).all()
    serializer_class=CategorySerializer
    pagination_class=DefaultPagination
    permission_classes=[IsAdminOrReadOnly]

class ReviewViewSet(ModelViewSet):
    serializer_class=ReviewSerializer
    permission_classes=[IsReviewAuthorOrReadonly]
    def get_queryset(self):
        return Review.objects.filter(product_id=self.kwargs.get('product_pk'))

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_serializer_context(self):
        return {'product_id':self.kwargs.get('product_pk')}


















#using Mixin-Less Code
class ProductList(ListCreateAPIView):
    queryset=Product.objects.select_related('category').all()
    serializer_class=ProductSerializer

class ProductDetails(RetrieveUpdateDestroyAPIView):
    queryset=Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field='pk'

class CategoryList(ListCreateAPIView):
    queryset=Category.objects.annotate(product_count=Count('products')).all()
    serializer_class=CategorySerializer

class CategoryDetails(RetrieveUpdateDestroyAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer
    lookup_field='pk'





#class Based Api View
""" 
class View_specific_category(APIView):
    def get(self,request,pk):
        category=get_object_or_404(Category.objects.annotate(product_count=Count('products')).all(),pk=pk)
        serializer=CategorySerializer(category)
        return Response(serializer.data)

    def put(self,request,pk):
        category=get_object_or_404(Category,pk=pk)
        serializer=CategorySerializer(Category,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request,pk):
        category=get_object_or_404(Category,pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class View_category(APIView):
    def get(self,reqeust):
        category=Category.objects.annotate(product_count=Count('products')).all()
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class View_products(APIView):

    def get(self,request):
        product=Product.objects.select_related('category').all()
        serializer=ProductSerializer(product,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer=ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class View_specific_product(APIView):
    
    def get(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data)

    def put(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self,request,pk):
        product=get_object_or_404(Product,pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
"""

#Function Based Api View
""" 
@api_view(['GET','POST'])
def view_category(request):
    if request.method == 'GET':
        category=Category.objects.annotate(product_count=Count('products')).all()
        serializer=CategorySerializer(category,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer=CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
"""


""" 
@api_view(['GET','POST'])
def view_products(request):
    if request.method == 'GET':
        product=Product.objects.select_related('category').all()
        serializer=ProductSerializer(product,many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer=ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)
"""


""" 
@api_view(['GET','PUT','DELETE'])
def view_specific_product(request,pk):
    if request.method == 'GET':
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        product=get_object_or_404(Product,pk=pk)
        serializer=ProductSerializer(product,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        product=get_object_or_404(Product,pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
"""

"""
@api_view()
def view_specific_category(request,pk):
    category=Category.objects.get(pk=pk)
    serializer=CategorySerializer(category)
    return Response(serializer.data)

"""