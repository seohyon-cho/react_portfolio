// reducer에 요청을 보내는 함수가 있는 곳
// 각 데이터 카테고리별 사용될 action의 type명을 변수처럼 모아놓은 객체

export const MEMBER = {
	start: 'MEMBER_START',
	success: 'MEMBER_SUCCESS',
	fail: 'MEMBER_FAIL'
};
export const HISTORY = {
	start: 'HISTORY_START',
	success: 'HISTORY_SUCCESS',
	fail: 'HISTORY_FAIL'
};
export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	fail: 'YOUTUBE_FAIL'
};
// modal은 클라이언트 side data라 전송받고 어쩌고 실패하고 하는 데이터가 아니므로 start, success, fail 세 가지로 나눌 필요 없음.
export const MODAL = {
	start: 'MODAL_START'
};
export const MENU = {
	start: 'MENU_START'
};
