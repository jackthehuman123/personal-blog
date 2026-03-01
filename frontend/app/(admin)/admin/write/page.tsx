"use client";

import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/create/`,
      {
        method: "POST",
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Title mb="xl">Write a Post</Title>
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
          />
          <Textarea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
          />
          <Button onClick={handleSubmit}>Publish</Button>
        </Stack>
      </form>
    </Container>
  );
}
