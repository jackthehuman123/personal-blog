from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import authenticate
from .models import Post
#? serializer turn Python object into JSON
from .serializers import PostSerializer

# Create your views here.
#? ListAPIView fetches a list
class PostListView(generics.ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('-created_at')

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
            secure=True,       # set to True in production (requires HTTPS)
            samesite='None'      # protects against CSRF attacks
        )

        return response
    
class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Logout successful'})
        response.delete_cookie('access_token')
        return response

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        validated_token = self.get_validated_token(access_token)
        return self.get_user(validated_token), validated_token

class PostCreateView(generics.CreateAPIView):
    serializer_class = PostSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()

class PostUpdateView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    queryset = Post.objects.all()

class PostDeleteView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'
    queryset = Post.objects.all()

class MeView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'username': request.user.username,
            'is_staff': request.user.is_staff
        })
    