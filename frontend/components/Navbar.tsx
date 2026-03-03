"use client";

import Link from "next/link";
import { Group, Container, Title, Button } from "@mantine/core";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
      <Container>
        <Group justify="space-between">
          <Link
            href="/blogs"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Title order={3}>My Blog</Title>
          </Link>
          <Group gap="lg">
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About
            </Link>
            {user ? (
              <Button color="red" variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Link
                href="/admin/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                Admin Login
              </Link>
            )}
          </Group>
        </Group>
      </Container>
    </header>
  );
}
