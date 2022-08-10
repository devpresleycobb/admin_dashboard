import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface DrawerState {
    collapsed: boolean;
    toggled: boolean;
}
const initialState: DrawerState = {
    collapsed: false,
    toggled: false
}

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState,
    reducers: {
        setDrawerCollapsed: (state: DrawerState, action: PayloadAction<boolean>) => {
            state.collapsed = action.payload;
        },
        setDrawerToggled: (state: DrawerState, action: PayloadAction<boolean>) => {
            state.toggled = action.payload;
        },
    }
});

export const selectDrawerCollapsed = (state: RootState) => state.drawer.collapsed;
export const selectDrawerToggled = (state: RootState) => state.drawer.toggled;

export const { setDrawerCollapsed, setDrawerToggled } = drawerSlice.actions;
export default drawerSlice.reducer;