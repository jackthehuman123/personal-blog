import { Container, Title, Text, Stack, Card } from "@mantine/core";

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:8000/api/posts/");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  return (
    <Container py="xl">
      <Title mb="xl">My Blog</Title>
      <Stack>
        {posts.map((post: Post) => (
          <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3}>{post.title}</Title>
            <Text c="dimmed" size="sm" mt="xs">
              {post.created_at}
            </Text>
            <Text mt="sm">{post.content}</Text>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
