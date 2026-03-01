"use client";

import Link from "next/link";
import { Group, Container, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
  is_staff: boolean;
} | null;

export default function Navbar() {
  const [hover, setHover] = useState(false);
  const [user, setUser] = useState<User>(null);

  const router = useRouter();

  async function handleLogout() {
    await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
  }

  useEffect(() => {
    // check if logged in
    fetch("http://localhost:8000/api/me/", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data));
  }, []);

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
              href={"/admin/login"}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                textDecoration: "none",
                color: hover ? "lightblue" : "white",
              }}
            >
              Admin Login
            </Link>
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "black" }}
            >
              About
            </Link>
            <Link
              href="/blogs"
              style={{ textDecoration: "none", color: "black" }}
            >
              Blog
            </Link>
            {user?.is_staff && <Link href=""></Link>}
          </Group>
        </Group>
      </Container>
    </header>
  );
}
