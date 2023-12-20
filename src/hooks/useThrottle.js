/*
  Debounce 와 throttle 비교

  Debounce : 이벤트가 발생하는 간격 시간을 비교해서, 일정 간격의 시간 내에 이벤트가 계속 발생 중이면, 일정 간격 시간이 지나도 이벤트가 발생하지 않을 때까지 함수 호출을 무기한 연기시키는 것.
    debounce 적용 대표 사례 : 특정 input 요소 입력이 완전히 끝날 때까지 fetching 함수 호출 자체를 계속해서 미룰 때

  throttle : 물리적으로 이벤트의 반복 횟수 자체를 줄여버리는 것.
    throttle 적용 대표 사례 : window event (scroll, resize 등) 발생 시마다, 불필요하게 많이 호출되는 함수의 호출 횟수 자체를 줄이는 것.
*/

import { useRef } from 'react';

// 인수로 throttle 적용할 함수와 시간 간격(gap) 전달
export const useThrottle = (func, gap = 500) => {
	// 초기 eventBlocker는 false 상태임.
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
