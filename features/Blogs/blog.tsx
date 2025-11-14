"use client";

import React, { useEffect, useState } from "react";

import { Container, Header, Title, Body } from "./style-components";

type BlogData = { title: string; body: string; author?: string };

export default function Blog({
  data,
  id,
}: {
  data: BlogData | null;
  id?: string;
}) {
  const [local, setLocal] = useState<BlogData | null | undefined>(
    data ?? undefined
  );

  useEffect(() => {
    // If server provided data, nothing to do.
    if (data) return;
    // If no id, show not found.
    if (!id) {
      setLocal(null);
      return;
    }

    try {
      const raw = localStorage.getItem("localPosts");
      if (!raw) {
        setLocal(null);
        return;
      }
      const arr = JSON.parse(raw);
      const found = arr.find(
        (p: any) =>
          String(p.id) === String(id) || String(p.serverId) === String(id)
      );
      if (found) {
        setLocal({
          title: found.title,
          body: found.body,
          author: found.author,
        });
      } else {
        setLocal(null);
      }
    } catch (err) {
      setLocal(null);
    }
  }, [data, id]);

  if (local === undefined) return <div style={{ padding: 16 }}>Loading…</div>;
  if (local === null) return <div style={{ padding: 16 }}>Post not found.</div>;

  return (
    <Container>
      <Header>{local.title}</Header>
      <Title style={{ fontSize: "0.95rem", color: "#666" }}>
        By: {local.author ?? "Unknown"}
      </Title>
      <Body style={{ marginTop: 12 }}>{local.body}</Body>
    </Container>
  );
}
