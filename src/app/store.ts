import { configureStore, ThunkAction, Action, createListenerMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import drawerReducer from '@/features/drawer/drawerSlice';
import userReducer from '@/features/user/userSlice';
import { usersApi } from '@/services/users';
import { authApi } from '@/services/auth';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat([
    authApi.middleware,
    usersApi.middleware,
  ])
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
