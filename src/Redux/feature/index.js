import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  
};

 export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, actions) => {
        console.log(actions.payload);
        state.user = actions.payload
    },
  },
});

export const {setUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;
