"use client";
import { Container, Title, Text, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";

type About = {
  bio: string;
};

type User = {
  username: string;
  is_staff: boolean;
} | null;

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/about/`)
      .then((res) => res.json())
      .then((data) => setAbout(data));
  }, []);

  return (
    <Container py="xl" maw={800}>
      <Title>About Me</Title>
      <Text mt="md">{about?.bio || "No bio yet."}</Text>
      {user?.is_staff && (
        <Link href="/admin/edit-about">
          <Button mt="xl" variant="outline">
            Edit About
          </Button>
        </Link>
      )}
    </Container>
  );
}
