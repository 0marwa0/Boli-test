"use client";

import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./createStore";

export default function ReduxProvider({
  children,
  initialState,
}: {
  children: React.ReactNode;
  initialState?: any;
}) {
  const store = useMemo(() => makeStore(initialState), [initialState]);
  return <Provider store={store}>{children}</Provider>;
}
