import { makeStore } from "./createStore";

// default client store (singleton)
export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
