// store에 요청을 보내는 함수가 있는 곳
import { combineReducers } from 'redux';
// action.js에 있는 객체를 모두 (*) 가져온 뒤, type화 하겠다는 뜻.
import * as types from './action';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload };
		default:
			return state;
	}
};
const historyReducer = (state = { history: [] }, action) => {
	switch (action.type) {
		case types.HISTORY.success:
			return { ...state, history: action.payload };
		default:
			return state;
	}
};
const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

// state에 들어가는 값은 무조건 객체여야 함.
const modalReducer = (state = { modal: false }, action) => {
	switch (action.type) {
		case types.MODAL.start:
			return { ...state, modal: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer });
export default reducers;
