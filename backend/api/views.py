from rest_framework import generics
from .models import Post
#? serializer turn Python object into JSON
from .serializers import PostSerializer

# Create your views here.
#? ListAPIView fetches a list
class PostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

#? RetrieveAPIView fetches a single object instead of a list
class PostDetailView(generics.RetrieveAPIView):
    serializer_class = PostSerializer
    lookup_field = 'slug'
    queryset = Post.objects.all()