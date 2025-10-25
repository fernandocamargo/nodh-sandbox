import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type State = {
  skin: string;
};

export default createSlice({
  initialState: { skin: "default" } satisfies State,
  name: "theming",
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.skin = action.payload;
    },
  },
  selectors: {
    get: ({ skin }) => skin,
  },
});
