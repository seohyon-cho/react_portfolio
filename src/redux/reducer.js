// store에 요청을 보내는 함수가 있는 곳
import { combineReducers } from 'redux';

// 순서 (1) - reducer 함수가 호출 되면서, 빈 배열 [] 로, 멤버 데이터가 저장될 state 값 초기화.

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer });
export default reducers;
