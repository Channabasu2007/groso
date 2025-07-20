import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    addGroceries: (state, action) => {
         if (Array.isArray(action.payload)) {
        state.push(...action.payload); // <<< THIS IS THE KEY FIX HERE
      } else {
        state.push(action.payload);
      }
    },
    updateGroceries: (state, action) => {
      return action.payload; 
    },
    removeGrocery: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    deleteGroceries: (state) => {
      return [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addGroceries, removeGrocery, deleteGroceries, updateGroceries } = groceriesSlice.actions;

export default groceriesSlice.reducer;
