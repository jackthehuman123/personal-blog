"use client";

import Link from "next/link";
import { Group, Container, Title } from "@mantine/core";

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
      <Container>
        <Group justify="space-between">
          <Link href="/blogs" style={{ textDecoration: "none" }}>
            <Title order={3}>My Blog</Title>
          </Link>
          <Group gap="lg">
            <Link href="/about" style={{ textDecoration: "none" }}>
              About
            </Link>
            <Link href="/blogs" style={{ textDecoration: "none" }}>
              Blog
            </Link>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
