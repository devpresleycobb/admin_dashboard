import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

interface DrawerState {
    toggled: boolean;
    locked: boolean;
}
const initialState: DrawerState = {
    toggled: true,
    locked: true,
}

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setDrawerToggled: (state: DrawerState, action: PayloadAction<boolean>) => {
            state.toggled = action.payload;
        },
        setDrawerLocked: (state: DrawerState, action: PayloadAction<boolean>) => {
            state.locked = action.payload;
        }
    }
});

export const selectDrawerToggled = (state: RootState) => state.drawer.toggled;

export const selectDrawerLocked = (state: RootState) => state.drawer.locked;

export const { setDrawerToggled, setDrawerLocked } = drawerSlice.actions;
export default drawerSlice.reducer;