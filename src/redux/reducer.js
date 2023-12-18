import { combineReducers } from 'redux';
import * as types from './actionType';

const membersReducer = (state = { members: [] }, action) => {
	if (action.type === types.MEMBERS.start) return state;
	else if (action.type === types.MEMBERS.success) return { ...state, members: action.payload };
	else if (action.type === types.MEMBERS.fail) return { ...state, members: action.payload };
	else return state;
};

const reducers = combineReducers({ membersReducer });
export default reducers;
