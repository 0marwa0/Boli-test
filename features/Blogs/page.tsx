"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Actions,
  Body,
  Container,
  Header,
  Item,
  List,
  Title,
  ButtonNav,
} from "./style-components";
import {
  useGetPostsQuery,
  useAddPostMutation,
} from "../../store/blogSlice/api";
import { Blogs } from "./types/blog";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [localPosts, setLocalPosts] = useState<Blogs[]>([]);

  useEffect(() => {
    const readLocal = () => {
      try {
        if (typeof window === "undefined") return;
        const raw = localStorage.getItem("localPosts");
        setLocalPosts(raw ? JSON.parse(raw) : []);
      } catch {
        setLocalPosts([]);
      }
    };

    readLocal();
    const onLocalUpdated = () => readLocal();
    window.addEventListener("storage", readLocal);
    window.addEventListener("localPostsUpdated", onLocalUpdated);
    return () => {
      window.removeEventListener("storage", readLocal);
      window.removeEventListener("localPostsUpdated", onLocalUpdated);
    };
  }, [posts]);

  const merged = useMemo(() => {
    const map = new Map<number, Blogs>();
    for (const p of localPosts || []) map.set(p.id, p);
    for (const p of posts || []) if (!map.has(p.id)) map.set(p.id, p);
    return Array.from(map.values());
  }, [localPosts, posts]);

  const showDetailsPage = (id: number) => {
    router.push(`/blogs/${id}`);
  };
  const showNewBlog = () => {
    router.push(`/blogs/create`);
  };
  return (
    <Container>
      <Header>Blog List</Header>
      <ButtonNav onClick={() => showNewBlog()}>Add new blog</ButtonNav>
      {isLoading || isFetching ? (
        <div>Loading posts…</div>
      ) : isError ? (
        <div>
          <div>Failed to load posts.</div>
          <ButtonNav onClick={() => refetch()}>Retry</ButtonNav>
        </div>
      ) : (
        <List>
          {(merged || []).map((post: Blogs) => (
            <Item key={post.id}>
              <Title>{post.title}</Title>
              <Body>{post.body}</Body>
              <Actions>
                <Button onClick={() => showDetailsPage(post.id)}>
                  Show More
                </Button>
              </Actions>
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
}
