"use client";

import { useEffect, useState } from "react";
import { Container, Title, Textarea, Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function EditAboutPage() {
  const [bio, setBio] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/`)
      .then((res) => res.json())
      .then((data) => {
        setBio(data.bio || "");
      });
  }, []);

  async function handleSubmit() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/about/update/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ bio }),
      },
    );

    if (res.ok) {
      router.push("/about");
    }
  }
  return (
    <Container py="xl" maw={800}>
      <Title mb="xl">Edit About</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack>
          <Textarea
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={8}
          />
          <Button type="submit">Save Changes</Button>
        </Stack>
      </form>
    </Container>
  );
}
