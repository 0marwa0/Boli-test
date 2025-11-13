"use client";

import React, { useEffect, useState, Suspense } from "react";

const Blogs = React.lazy(() => import("../features/Blogs/page"));
export default function Page() {
  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Blogs />
      </Suspense>
    </main>
  );
}
