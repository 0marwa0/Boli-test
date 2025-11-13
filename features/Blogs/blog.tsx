"use client";

import React from "react";

import { Container, Header, Title, Body } from "./style-components";

type BlogData = { title: string; body: string; author?: string };

export default function Blog({ data }: { data: BlogData }) {
  return (
    <Container>
      <Header>Titel:{data.title}</Header>
      <Title style={{ fontSize: "0.95rem", color: "#666" }}>
        By: {data.author ?? "Unknown"}
      </Title>
      <Body style={{ marginTop: 12 }}>{data.body}</Body>
    </Container>
  );
}
