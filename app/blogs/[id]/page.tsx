import React from "react";

import Blog from "../../../features/Blogs/blog";
import { API_BASE } from "../../../lib/config";
import { notFound } from "next/navigation";

type Params = { params: { id: string } };

export default async function Page({ params }: Params) {
  const { id } = params;

  // If no id provided, show 404
  if (!id) notFound();

  const res = await fetch(`${API_BASE}/posts/${id}`, {
    cache: "no-store",
  });

  // Handle 404 explicitly
  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch post (status: ${res.status})`);
  }

  const data = await res.json();

  // If the payload is empty or malformed, treat as not found
  if (!data || Object.keys(data).length === 0) {
    notFound();
  }

  return <Blog data={data} />;
}
