/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';


type TAuthState = {
  user: null | any;
  token: null | string;
  refresh_token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, refresh_token } = action.payload;
      state.user = user;
      state.token = token;
      state.refresh_token = refresh_token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refresh_token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
