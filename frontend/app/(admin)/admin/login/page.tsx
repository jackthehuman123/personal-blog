"use client";

import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
} from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // this sends and receives cookies
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/blogs");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <Container size="xs" py="xl">
      <Title mb="xl">Admin Login</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <Stack>
          {error && <Alert color="red">{error}</Alert>}
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </Container>
  );
}
