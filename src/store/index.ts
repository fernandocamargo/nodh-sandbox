import {
  type ConfigureStoreOptions,
  configureStore,
  createListenerMiddleware,
} from '@reduxjs/toolkit'

import * as slices from './slices'

export type State = {
  [Slice in keyof typeof slices]: ReturnType<(typeof slices)[Slice]['reducer']>
}

export const listener = createListenerMiddleware()

export const middleware: ConfigureStoreOptions['middleware'] = (getDefault) =>
  getDefault().prepend(listener.middleware)

export const reducer = Object.entries(slices).reduce(
  (stack, [key, slice]) => Object.assign(stack, { [key]: slice.reducer }),
  {},
)

export default configureStore({ middleware, reducer })
