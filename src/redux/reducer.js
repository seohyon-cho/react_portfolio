// store에 요청을 보내는 함수가 있는 곳
import { combineReducers } from 'redux';

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
