import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchMember = createAsyncThunk('member/requestMember', async () => {
	const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
	const json = await data.json();
	return json.members;
});

const memberSlice = createSlice({
	name: 'member',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchMember.pending]: state => {
			state.isLoading = true;
		},
		[fetchMember.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchMember.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

export default memberSlice.reducer;
