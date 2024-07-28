import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import authReducer from './authReducer';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
