"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Group,
  Text,
  Stack,
  Card,
  Title,
  Button,
} from "@mantine/core";
import Link from "next/link";

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

type User = {
  username: string;
  is_staff: boolean;
} | null;

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    // fetch posts
    fetch("http://localhost:8000/api/posts/")
      .then((res) => res.json())
      .then((data) => setPosts(data));

    // check if logged in
    fetch("http://localhost:8000/api/me/", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data));
  }, []);

  return (
    <Container py="xl">
      <Stack>
        {posts.map((post: Post) => (
          <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between">
              <Link
                href={`/blogs/${post.slug}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Title order={3}>{post.title}</Title>
                <Text c="dimmed" size="sm" mt="xs">
                  {formatDate(post.created_at)}
                </Text>
                <Text mt="sm">{post.content}</Text>
              </Link>
              {user?.is_staff && (
                <Group>
                  <Link href={`/admin/edit/${post.slug}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button color="red" variant="outline">
                    Delete
                  </Button>
                </Group>
              )}
            </Group>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
