import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appReducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
