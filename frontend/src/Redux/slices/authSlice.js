// Redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the authentication slice
const initialState = {
  token: localStorage.getItem('token') || null, // Get token from localStorage if it exists
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true', // Check localStorage for isAuthenticated flag
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, // Initial state for user, which can be updated later
};

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action for successful login, setting token, user info, and authentication status
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // Set the user info
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token); // Store token in localStorage
      localStorage.setItem('isAuthenticated', 'true'); // Store isAuthenticated flag in localStorage
    },
    // Action for logging out
    logout: (state) => {
      state.token = null;
      state.user = null; // Reset the user info on logout
      state.isAuthenticated = false;
      localStorage.removeItem('token'); // Remove token from localStorage on logout
      localStorage.removeItem('isAuthenticated'); // Remove isAuthenticated flag from localStorage
    },
    // Set authentication manually, for example, when rehydrating from localStorage
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user; // Set the user info
      state.isAuthenticated = !!action.payload.token; // Check if there's a token to set authentication status
      localStorage.setItem('isAuthenticated', state.isAuthenticated ? 'true' : 'false'); // Update isAuthenticated in localStorage
    },
  },
});

// Export actions for login, logout, and manual setAuth
export const { loginSuccess, logout, setAuth } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
