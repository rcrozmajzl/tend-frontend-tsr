import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import authReducer from '../features/authSlice';
import otherUsersReducer from '../features/userSlice';
import needsReducer from '../features/needsSlice';
import userNeedsReducer from '../features/userNeedsSlice';
import { authMiddleware } from './authListenerMiddleware';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: otherUsersReducer,
    needs: needsReducer,
    userneeds: userNeedsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .prepend(authMiddleware.middleware)
  .concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
