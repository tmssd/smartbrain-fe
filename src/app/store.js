import { configureStore } from '@reduxjs/toolkit';
// import signinReducer from '../components/signin/signinSlice';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
  reducer: {
    // signin: signinReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
