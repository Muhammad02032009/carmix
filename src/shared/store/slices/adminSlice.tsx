import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { boolean } from 'zod';

interface AdminState {
  loggedUser: boolean | null;
}

const initialState: AdminState = {
  loggedUser: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<boolean>) => {
      state.loggedUser = action.payload;
    },
    
  },
});

export const { setLoggedUser } = adminSlice.actions;
export default adminSlice.reducer;
