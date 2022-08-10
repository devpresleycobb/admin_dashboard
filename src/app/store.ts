import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import drawerReducer from '../features/drawer/drawerSlice';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
