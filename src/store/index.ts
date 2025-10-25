import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";

import * as slices from "./slices";

export const listener = createListenerMiddleware();

export const middleware = (getDefault) =>
  getDefault().prepend(listener.middleware);

export const reducer = Object.entries(slices).reduce(
  (stack, [key, slice]) => Object.assign(stack, { [key]: slice.reducer }),
  {}
);

export default configureStore({ middleware, reducer });
