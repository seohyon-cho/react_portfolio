import { createSlice } from '@reduxjs/toolkit';

const darkSlice = createSlice({
	name: 'dark',
	initialState: { isDark: false },
	reducers: {
		darkToggle: state => {
			state.isDark = !state.isDark;
		}
	}
});

export const { darkToggle } = darkSlice.actions;
export default darkSlice.reducer;
