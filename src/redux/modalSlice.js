import { createSlice } from '@reduxjs/toolkit';

// Server Side Data 를 관리하지 않기 때문에 (모달은 클라이언트 사이드 데이터) createAsyncThunk 함수가 불필요함.

const modalSlice = createSlice({
	name: 'modal',
	// initialState는 무조건 객체 형태여야 함.
	initialState: { open: false },
	// extraReducers는, [pending, fulfilled, rejected] 와 같은 상태 관리를 위한 reducer이므로, 여기서는 정적인 데이터를 관리하는 것이기 때문에 해당하지 않음.
	reducers: {
		modalOpen: state => (state.open = true),
		modalClose: state => (state.open = false)
	}
});

// Slice 함수 호출 시, modalSlice라는 객체를 반환하게 되는데,
// 해당 객체 안에는 {reducer: 변경된 전역객체, actions: reducer에 등록된 action객체 생성 함수} 가 자동으로 생성되어 있음.
// 하단의 action객체 생성 함수는 추후 컴포넌트에서 호출해서 반환된 action객체를 dispatch로 전달
export const { modalOpen, modalClose } = modalSlice.actions;

// 하단의 reducer 객체는 index.js에서 store 에 담김.
export default modalSlice.reducer;
