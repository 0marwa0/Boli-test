"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddPostMutation } from "../../store/blogSlice/api";
import { Container, Header, Button } from "./style-components";

export default function Create() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [addPost, { isLoading, isError, error }] = useAddPostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const result = await addPost({
        id: Date.now(),
        title: title.trim(),
        body: body.trim(),
        author: author.trim(),
      }).unwrap();

      try {
        const raw = localStorage.getItem("localPosts");
        const localPosts = raw ? JSON.parse(raw) : [];
        const stored = {
          id: result.id ?? Date.now(),
          title: result.title,
          body: result.body,
          author: result.author,
        };
        localStorage.setItem(
          "localPosts",
          JSON.stringify([stored, ...localPosts])
        );
        // notify other components in the same tab
        try {
          window.dispatchEvent(new Event("localPostsUpdated"));
        } catch {}
      } catch (err) {
        // ignore storage errors
      }

      router.push("/blogs");
    } catch (err) {
      console.error("Create failed", err);
    }
  };

  return (
    <Container>
      <Header>Create Blog</Header>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          required
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          rows={6}
          style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating…" : "Create"}
          </Button>
          <Button type="button" onClick={() => router.push("/blogs")}>
            Cancel
          </Button>
        </div>
        {isError && (
          <div style={{ color: "#b00020" }}>Failed to create blog.</div>
        )}
      </form>
    </Container>
  );
}
