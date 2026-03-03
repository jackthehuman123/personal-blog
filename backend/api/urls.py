from django.urls import path
from .views import PostListView, PostDetailView, LoginView, PostCreateView, PostUpdateView, PostDeleteView, LogoutView, MeView, AboutView, AboutUpdateView

urlpatterns = [
    path('posts/', PostListView.as_view(), name="post-list"),
    path('posts/create/', PostCreateView.as_view(), name='post-create'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
    path('posts/<slug:slug>/update/', PostUpdateView.as_view(), name='post-update'),
    path('posts/<slug:slug>/delete/', PostDeleteView.as_view(), name='post-delete'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),
    path('about/', AboutView.as_view(), name="about"),
    path('about/update/', AboutUpdateView.as_view(), name='about-update'),
]   

