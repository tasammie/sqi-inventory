import { configureStore } from '@reduxjs/toolkit';
import  currentUserSlice from './Redux/feature';


export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice
   
  },
});
