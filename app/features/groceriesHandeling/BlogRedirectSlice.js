import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  routerUrl: "",
  BlogIsReady: false,
};

export const BlogRedirectSlice = createSlice({
  name: "BlogRedirectSlice",
  initialState,
  reducers: {
    setBlogReady: (state, action) => {
      state.BlogIsReady = action.payload; // true or false
    },
    setrouterUrl: (state, action) => {
      state.routerUrl = action.payload;
    },
  },
});

export const { setBlogReady, setrouterUrl } = BlogRedirectSlice.actions;

export default BlogRedirectSlice.reducer;
