from rest_framework import serializers
from .models import Post, About, Comment

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'slug', 'created_at', 'updated_at']

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = ['id','bio', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'name', 'content', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']