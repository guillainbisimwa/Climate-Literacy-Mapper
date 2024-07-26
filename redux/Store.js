import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import authReducer from './authReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
