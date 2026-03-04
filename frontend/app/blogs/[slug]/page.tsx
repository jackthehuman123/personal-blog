"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Textarea,
  Button,
  Stack,
  Card,
  Group,
} from "@mantine/core";
import { useAuth } from "@/app/context/AuthContext";

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type Comment = {
  id: number;
  name: string;
  content: string;
  created_at: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    async function load() {
      const { slug } = await params;

      const postRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/`,
      );
      const postData = await postRes.json();
      setPost(postData);

      const commentRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/comments/`,
      );
      const commentData = await commentRes.json();
      setComments(commentData);
    }
    load();
  }, []);

  async function handleComment() {
    const { slug } = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}/comments/create/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      },
    );

    if (res.ok) {
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setName("");
      setContent("");
    }
  }

  async function handleDeleteComment(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${id}/delete/`,
      {
        method: "DELETE",
        credentials: "include",
      },
    );

    if (res.ok) {
      setComments(comments.filter((c) => c.id !== id)); // filter out the deleted comment by id
    }
  }

  return (
    <Container py="xl" maw={800}>
      <Title>{post?.title}</Title>
      <Text c="dimmed" size="sm" mt="xs">
        {post ? formatDate(post.created_at) : ""}
      </Text>
      <Text mt="xl">{post?.content}</Text>

      {/* Comments list */}
      <Stack mt="xl">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
          >
            <Group justify="space-between">
              <div>
                <Text fw={600}>{comment.name}</Text>
                <Text c="dimmed" size="xs">
                  {formatDate(comment.created_at)}
                </Text>
                <Text mt="xs">{comment.content}</Text>
              </div>
              {user?.is_staff && (
                <Button
                  color="red"
                  variant="outline"
                  size="xs"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </Button>
              )}
            </Group>
          </Card>
        ))}
      </Stack>

      {/* Comment form */}
      <Title order={3} mt="xl" mb="md">
        Comments
      </Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleComment();
        }}
      >
        <Stack>
          <Textarea
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            rows={1}
          />
          <Textarea
            label="Comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <Button type="submit">Post Comment</Button>
        </Stack>
      </form>
    </Container>
  );
}
