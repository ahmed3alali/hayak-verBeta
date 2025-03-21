import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage
import userReducer from './features/userSlice';
import { productApi } from './api/productsApi';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import authReducer from './slices/authSlice'; 
// Config for Redux Persist
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap your reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer, // Apply persistence to auth
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Important for redux-persist
    }).concat(productApi.middleware, authApi.middleware, userApi.middleware),
});

export const persistor = persistStore(store);
export default store;
