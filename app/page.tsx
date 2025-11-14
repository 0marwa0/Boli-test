"use client";

import React, { Suspense } from "react";
import ReduxProvider from "../store/Provider";

const Blogs = React.lazy(() => import("../features/Blogs/page"));

export default function Page() {
  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", padding: "1rem" }}>
      <ReduxProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Blogs />
        </Suspense>
      </ReduxProvider>
    </main>
  );
}
