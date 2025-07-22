import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageLoading: false,
  DishName: "",
  servings: 1,
};

export const groceryNameSlice = createSlice({
  name: "groceryName",
  initialState,
  reducers: {
      togglepageLoading: (state, action) => {
      state.pageLoading = action.payload; 
    },
    
    setDishName: (state, action) => {
      state.DishName = action.payload;
    },
    
    setServings: (state, action) => {
      state.servings = action.payload;
    },
  },
});


export const { togglepageLoading, setDishName, setServings } = groceryNameSlice.actions;

export default groceryNameSlice.reducer;