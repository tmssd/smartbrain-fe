import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import { apiSlice } from './slices/api/apiSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
