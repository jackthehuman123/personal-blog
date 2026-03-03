"use client";

import Link from "next/link";
import { Group, Container, Title, Button } from "@mantine/core";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [hover, setHover] = useState(false);

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
            {user ? (
              <Button color="red" variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{ opacity: hover ? 1 : 0, transition: "opacity 0.2s" }}
              >
                <Link
                  href="/admin/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Admin Login
                </Link>
              </div>
            )}
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About
            </Link>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
