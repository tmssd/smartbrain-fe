import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/userSlice';
import { apiSlice } from './reducers/api/apiSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
