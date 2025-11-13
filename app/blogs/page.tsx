import BlogsPage from "../../features/Blogs/page";
import { makeStore } from "../../store/createStore";
import { blogApi } from "../../store/blogSlice/api";
import ReduxProvider from "../../store/Provider";

export default async function Page() {
  // create a fresh server-side store and prefetch posts into the RTK Query cache
  const store = makeStore();
  // dispatch the query initiation and await its result so the server store contains the cached response

  await (store.dispatch(
    blogApi.endpoints.getPosts.initiate() as any
  ) as Promise<any>);
  const preloadedState = store.getState();

  return (
    // ReduxProvider is a client component that will create a client store using the server preloaded state
    <ReduxProvider initialState={preloadedState}>
      <BlogsPage />
    </ReduxProvider>
  );
}
