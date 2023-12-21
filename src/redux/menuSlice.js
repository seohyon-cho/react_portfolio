import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: 'menu',
	initialState: { open: false },
	reducers: {
		menuOpen: state => {
			state.open = true;
		},
		menuClose: state => {
			state.open = false;
		},
		menuToggle: state => {
			state.open = !state.open;
		}
	}
});

export const { menuOpen, menuClose, menuToggle } = menuSlice.actions;
export default menuSlice.reducer;
