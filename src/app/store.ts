import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/authApi';
import authReducer from '../features/authSlice';
import otherUsersReducer from '../features/userSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: otherUsersReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
