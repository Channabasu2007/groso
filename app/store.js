
import { configureStore } from '@reduxjs/toolkit'
import groceriesSlice from './features/groceriesHandeling/groceriesSlice'
import groceryNameSlice from './features/groceriesHandeling/groceryNameSlice'
import BlogRedirectSlice from './features/groceriesHandeling/BlogRedirectSlice'
export const store = configureStore({
  reducer: {
    groceries : groceriesSlice,
    groceryName : groceryNameSlice,
    BlogRedirect : BlogRedirectSlice
  },
})