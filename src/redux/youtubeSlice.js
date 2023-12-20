import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/*
  createAsyncThunk : 내부에 데이터 fetching 함수를 넣어서, 자동으로 데이터 상태에 따라서 action 객체 생성해주는 함수

  createSlice : AsyncThunk 함수가 내보내주는 action 객체를 자동으로 받아서, 해당 action 객체의 Type [pending, fulfilled, rejected] 에 따라서 자동으로 전역 데이터 변경해서 내보냄.
*/

// 비동기 서버 통신으로 데이터를 받아서, 내부적으로 promise 객체의 상태에 따라 자동으로 action 객체를 생성한 후 반환.
export const fetchYoutube = createAsyncThunk('youtube/requestYoutube', async () => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const pid = process.env.REACT_APP_YOUTUBE_LIST;
	const num = 10;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items;
});

// 위의 fetchYoutube 가 반환하는 action 객체의 promise 인스턴스 상태 값 (pending, fulfilled, rejected)에 따라 자동으로 action Type을 생성하고,
// 해당 actionType에 따른 전역 데이터 변경을 자동으로 처리함.
const youtubeSlice = createSlice({
	name: 'youtube',
	initialState: {
		data: [],
		isLoading: false
	},
	extraReducers: {
		[fetchYoutube.pending]: state => {
			state.isLoading = true;
		},
		[fetchYoutube.fulfilled]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		[fetchYoutube.rejected]: (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		}
	}
});

// youtubeSlice 라는 reducer가 변경한 전역 데이터 객체를 내보냄.
export default youtubeSlice.reducer;
