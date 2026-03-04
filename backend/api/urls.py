from django.urls import path
from .views import (
    PostListView, PostDetailView, PostCreateView, PostUpdateView, PostDeleteView,
    LoginView, LogoutView, MeView, 
    AboutView, AboutUpdateView,
    CommentListView, CommentCreateView, CommentDeleteView,
    )

urlpatterns = [
    path('posts/', PostListView.as_view(), name="post-list"),
    path('posts/create/', PostCreateView.as_view(), name='post-create'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<slug:slug>/update/', PostUpdateView.as_view(), name='post-update'),
    path('posts/<slug:slug>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('posts/<slug:slug>/comments/', CommentListView.as_view(), name='comment=list'),
    path('posts/<slug:slug>/comments/create/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/delete/', CommentDeleteView.as_view(), name='comment-delete'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
    path('about/', AboutView.as_view(), name="about"),
    path('about/update/', AboutUpdateView.as_view(), name='about-update'),
]   

