import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchHistory = createAsyncThunk('history/requestHistory', async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/history.json`);
	const json = await data.json();
	return json.history;
});

const historySlice = createSlice({
	name: 'history',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchHistory.pending]: state => {
			state.isLoading = true;
		},
		[fetchHistory.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchHistory.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default historySlice.reducer;
