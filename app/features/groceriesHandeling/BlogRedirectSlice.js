import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    routerUrl:"",
    BlogIsReady:false
};

export const BlogRedirectSlice = createSlice({
  name: "BlogRedirectSlice",
  initialState,
  reducers: {
    toggleBlogIsReady: (state) => {
      state.BlogIsReady = !state.BlogIsReady; 
    },
    
    setrouterUrl: (state, action) => {
      state.routerUrl = action.payload;
    },
    
    
  },
});


export const { toggleBlogIsReady, setrouterUrl } = BlogRedirectSlice.actions;

export default BlogRedirectSlice.reducer;