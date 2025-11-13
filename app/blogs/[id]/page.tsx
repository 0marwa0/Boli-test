import React from "react";

import Blog from "../../../features/Blogs/blog";
import { API_BASE } from "../../../lib/config";
type Params = { params: { id: string } };

export default async function Page({ params }: Params) {
  const { id } = await params;
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  console.log("Response:", data);
  return <Blog data={data} />;
}
