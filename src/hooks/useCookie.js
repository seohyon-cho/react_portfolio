export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let dueDate = now.getTime() + 1000 * time;
		now.setTime(dueDate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
		console.log(document.cookie);
	};

	const isCookie = cookieKey => {
		if (document.cookie.indexOf(cookieKey) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
}

/*
	useCookie()훅 제작 배경
	: 복수개의 컴포넌트에서 쿠키를 생성하거나 사용해야될때 동일한 쿠키생성로직 재활용을 위해 제작
	setCookie(쿠키이름, 쿠키값, 만료시간(초단위)) : 특정 쿠키를 원하는 시간만큼 생성 (쿠키삭제기능 가능)
	isCookie(쿠키이름) : 현재 브라우저에 해당 이름의 쿠키가 있는지 반환 (true있음, false없음)
	viewCookie() : 현재 브라우저 등록된 모든 쿠키값 확인
*/
