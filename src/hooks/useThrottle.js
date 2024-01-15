import { useRef } from 'react';

// 인수로 throttle 적용할 함수와 시간 간격(gap) 전달
export const useThrottle = (func, gap = 500) => {
	const eventBlocker = useRef(null);
	return () => {
		if (eventBlocker.current) return; // eventBlocker.current가 true면 return으로 끊음.

		// setTimeout이 (동작이 멈추지 않게) 끊기지 않기 위해 이런 구조로 짠 것.
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, gap);
	};
};

/*
	useThrottle 훅 제작 배경
	- 단기간에 많이 발생하는 이벤트 설정시 불필요하게 많이 호출되는 핸들러함수의 호출 횟수를 줄여 성능을 높이기 위함
	- 단기간에 요청이 많은 이벤트 (resize, scroll, mousewheel, mousemove 등등)
	- useDebounce와는 다르게 이벤트가 연속해서 발생할때 핸들러의 호출을 무제한 지연시키는 것이 아닌 물리적인 반복횟수에 제한
	- 보통 시스템이벤트는 1초에 60번 반복 (화면 주사율에 따른 이벤트 횟수 60hz)
	- 해당 이벤트에 throttling을 걸어 1초에 3번 내지 원하는 횟수만큼 물리적인 반복횟수에 제한
	활용예시
	- 브라우저 리사이즈 핸들러함수 연결
	- 브라우저 스크롤시 핸들러함수 연결
*/
