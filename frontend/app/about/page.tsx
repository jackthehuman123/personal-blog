import { Container, Title, Text } from "@mantine/core";

export default function AboutPage() {
  return (
    <Container py="xl" maw={800}>
      <Title>About Me</Title>
      <Text mt="md">
        Hi, I'm building this blog to document by building journey.
      </Text>
    </Container>
  );
}
