/*
  Debounce 와 throttle 비교

  debounce는 특정 시간 내에 이벤트가 들어오면 진행되고 있던 특정 시간을 끊어버리고 다시 처음부터 set 하는 거고 
  throttle은 특정 시간 이후에 특정 함수 로직이 구현되는 것을 보장해주는 것. ?

  Debounce : 이벤트가 발생하는 간격 시간을 비교해서, 일정 간격의 시간 내에 이벤트가 계속 발생 중이면, 일정 간격 시간이 지나도 이벤트가 발생하지 않을 때까지 함수 호출을 무기한 연기시키는 것.
    debounce 적용 대표 사례 : 특정 input 요소 입력이 완전히 끝날 때까지 fetching 함수 호출 자체를 계속해서 미룰 때

  throttle : 물리적으로 이벤트의 반복 횟수 자체를 줄여버리는 것.
    throttle 적용 대표 사례 : window event (scroll, resize 등) 발생 시마다, 불필요하게 많이 호출되는 함수의 호출 횟수 자체를 줄이는 것.
*/

// setTimeout이 (동작이 멈추지 않게) 끊기지 않기 위해 이런 구조로 짠 것.

// setTimeout이 일단 실행되는 즉시 return 값을 내보내므로 그 순간 eventBlocker.current가 null이 아니게 됨.
// 이 return 값이 즉시 eventBlocker라는 useRef에 담기게 됨.
// 그리고 setTimeout 자체가 호출이 된 다음에, gap 시간 뒤에 그 내부에 있는 func()를 동작시키고,  이벤트블로커current를 null로 바꿈.

import { useRef } from 'react';

// setTimeout이 호출되면, delay 뒤에 return 값을 반환하는 게 아니고,
// setTimeout이 호출되는 순간 그 즉시 return을 반환함.
// setTimeout의 delay 값이 끝나기 전에 중복 호출 되면 기존 함수를 무시하고 다시 초기화해서 setTimeout이 또 호출되는 것.
// throttling의 주 개념은, 위의 개념을 막기 위해서 쓰는 것.

// 인수로 throttle 적용할 함수와 시간 간격(gap) 전달
export const useThrottle = (func, gap = 500) => {
	// 초기 eventBlocker는 false 상태임.
	// 초기에 Null 값을 eventBlocker에 담아서 초기 한 번은 온전히 setTimeout이 호출되게 처리.
	const eventBlocker = useRef(null);

	return () => {
		// eventBlocker이 담겨있으면, return으로 강제중지함으로써, setTimeout을 중복호출하지 않음.
		if (eventBlocker.current) return; // eventBlocker.current가 true면 return으로 끊음.

		// setTimeout이 실행됨과 동시에, return값 자체를 eventBlocker.current에 담아서, 중복 호출을 막음과 동시에, gap 시간 이후에 호출되는 특정 로직을 보장해주는 것.
		eventBlocker.current = setTimeout(() => {
			// gap 시간 이후에 인수로 전달된 함수를 호출하고,
			func();
			// eventBlocker.current 값을 다시 비움.
			eventBlocker.current = null;

			// 이러한 과정을 통해, gap 시간 이후에 다시 setTimeout을 호출할 수 있게 됨.
		}, gap);
	};
};
