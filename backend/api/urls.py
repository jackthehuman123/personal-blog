from django.urls import path
from .views import PostListView, PostDetailView, LoginView

urlpatterns = [
    path('posts/', PostListView.as_view(), name="post-list"),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('login/', LoginView.as_view(), name='login'),
]   

