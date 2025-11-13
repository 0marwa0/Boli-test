import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./blogSlice/api";

export function makeStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogApi.middleware),
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
