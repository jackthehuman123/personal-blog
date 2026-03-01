from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
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

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({'message': "Login successful"})
        response.set_cookie(
            key='access_token',
            value=access_token,
            httponly=True,      # JavaScript cannot access this
            secure=False,       # set to True in production (requires HTTPS)
            samesite='Lax'      # protects against CSRF attacks
        )

        return response