import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Theme {
  class: string;
}

const initialState: Theme = {
  class: localStorage?.theme ? localStorage.theme : "light",
};

export const themeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>): void => {
      state.class = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
