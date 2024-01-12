import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory, fetchYoutube, fetchFlickr } from './api';
import * as types from './actionType';

// Department Server Data
function* callMembers() {
	yield takeLatest(types.MEMBERS.start, function* () {
		try {
			const response = yield call(fetchDepartment);
			yield put({ type: types.MEMBERS.success, payload: response.members });
		} catch (err) {
			yield put({ type: types.MEMBERS.fail, payload: err });
		}
	});
}

// History Server Data
function* callHistory() {
	yield takeLatest(types.HISTORY.start, returnHistory);
}

function* returnHistory() {
	try {
		const response = yield call(fetchHistory);
		yield put({ type: types.HISTORY.success, payload: response.history });
	} catch (err) {
		yield put({ type: types.HISTORY.fail, payload: err });
	}
}
// youtube server Data
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, function* () {
		try {
			const response = yield call(fetchYoutube);
			yield put({ type: types.YOUTUBE.success, payload: response.items });
		} catch (err) {
			yield put({ type: types.YOUTUBE.fail, payload: err });
		}
	});
}

// flickr Server Data
// 얘는 action 통해서 opt 값도 인수로 전달해야 함.
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, function* (action) {
		try {
			const response = yield call(fetchFlickr, action.opt);
			yield put({ type: types.FLICKR.success, payload: response.photos.photo });
		} catch (err) {
			yield put({ type: types.FLICKR.fail, payload: err });
		}
	});
}

// 순서 (3) : saga 메서드를 비동기적으로 호출해주는 함수를 정의 후 rootSaga라는 이름으로 export(추후 미들웨어로 reducer에 적용됨)
export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube), fork(callFlickr)]);
}
