import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('fasiondb_token');
  const userJson = localStorage.getItem('fasiondb_user');
  let user = null;
  if (userJson) {
    try {
      user = JSON.parse(userJson);
    } catch {
      // Ignore parsing errors
    }
  }

  return {
    token,
    user,
    isAuthenticated: !!token,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthState['user'] }>
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem('fasiondb_token', token);
      if (user) {
        localStorage.setItem('fasiondb_user', JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('fasiondb_token');
      localStorage.removeItem('fasiondb_user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
