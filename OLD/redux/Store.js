import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';
import authReducer from './authReducer';
import userSlice from './userSlice';
import tribeSlice from './tribeSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    user: userSlice,
    tribe: tribeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
