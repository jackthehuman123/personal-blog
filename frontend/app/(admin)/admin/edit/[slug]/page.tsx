"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export default function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function loadPost() {
      const { slug: postSlug } = await params;
      const res = await fetch(`http://localhost:8000/api/posts/${postSlug}/`);
      const post: Post = await res.json();
      setTitle(post.title);
      setContent(post.content);
      setSlug(post.slug);
    }
    loadPost();
  }, []);

  async function handleSubmit() {
    const { slug: postSlug } = await params;
    const res = await fetch(
      `http://localhost:8000/api/posts/${postSlug}/update/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content, slug }),
      },
    );

    if (res.ok) {
      router.push("/blogs");
    }
  }
  return (
    <Container py="xl" maw={800}>
      <Title mb="xl">Edit Post</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack>
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            description="URL friendly version of title e.g. my-first-post"
          />
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
          />
          <Button type="submit">Save Changes</Button>
        </Stack>
      </form>
    </Container>
  );
}
