"use client";

import { Container, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      credentials: "include",
    });
    router.push("/admin/login");
  }

  return (
    <Container py="xl">
      <Title>Admin Dashboard</Title>
      <Text c="dimmed" mt="md">
        Welcome back, Admin
      </Text>
      <Button color="red" variant="outline" mt="xl" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
