import React from "react";

import Blog from "../../../features/Blogs/blog";
import { API_BASE } from "../../../lib/config";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function Page({ params }: Params) {
  const { id } = await params;

  // If no id provided, show 404
  if (!id) notFound();

  const res = await fetch(`${API_BASE}/posts/${id}`, {
    cache: "no-store",
  });

  // If API returns 404, we'll render the client Blog component with null data
  // so the client can check localStorage for a locally-created post.
  if (res.status === 404) {
    return <Blog data={null} id={id} />;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch post (status: ${res.status})`);
  }

  const data = await res.json();

  // If the payload is empty or malformed, let the client attempt a local lookup
  if (!data || Object.keys(data).length === 0) {
    return <Blog data={null} id={id} />;
  }

  return <Blog data={data} id={id} />;
}

// Inline client component to check localStorage for a post when the API has no data.
function ClientLocalCheck({ id }: { id: string }) {
  "use client";
  const ReactClient = React as unknown as typeof React;
  const { useEffect, useState } = ReactClient;

  const [post, setPost] = useState<any | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    try {
      const raw = localStorage.getItem("localPosts");
      if (!raw) {
        if (mounted) setPost(null);
        return;
      }
      const arr = JSON.parse(raw);
      const found = arr.find(
        (p: any) =>
          String(p.id) === String(id) || String(p.serverId) === String(id)
      );
      if (mounted) setPost(found ?? null);
    } catch (err) {
      if (mounted) setPost(null);
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  if (post === undefined) return <div style={{ padding: 16 }}>Loading…</div>;
  if (post === null) return <div style={{ padding: 16 }}>Post not found.</div>;

  return <Blog data={post} />;
}
