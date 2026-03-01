from django.urls import path
from .views import PostListView, PostDetailView, LoginView, PostCreateView

urlpatterns = [
    path('posts/', PostListView.as_view(), name="post-list"),
    path('posts/create/', PostCreateView.as_view(), name='post-create'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('login/', LoginView.as_view(), name='login'),
]   

