import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type State = {
  locale: string;
};

export default createSlice({
  initialState: { locale: "en-US" } satisfies State,
  name: "locale",
  reducers: {
    set(state, action: PayloadAction<string>) {
      state.locale = action.payload;
    },
  },
  selectors: {
    get: ({ locale }) => skin,
  },
});
