import { Container, Title, Text } from "@mantine/core";

type Post = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`http://localhost:8000/api/posts/${slug}/`);
  const data = await res.json();
  return data;
}

export default async function PostPage({
  params,
}: {
  // params is also a promise object
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  console.log(post);
  return (
    <Container py="xl" maw={800}>
      <Title>{post.title}</Title>
      <Text c="dimmed" size="sm" mt="xs">
        {formatDate(post.created_at)}
      </Text>
      <Text mt="xl">{post.content}</Text>
    </Container>
  );
}
