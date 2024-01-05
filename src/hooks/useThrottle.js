import { useEffect, useRef, useState } from 'react';

// 인수로 throttle 적용할 함수와 시간 간격(gap) 전달
export const useThrottle = (func, gap = 500) => {
	const [Mounted, setMounted] = useState(true);
	const eventBlocker = useRef(null);

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return () => {
		if (eventBlocker.current) return; // eventBlocker.current가 true면 return으로 끊음.

		// setTimeout이 (동작이 멈추지 않게) 끊기지 않기 위해 이런 구조로 짠 것.
		eventBlocker.current = setTimeout(() => {
			Mounted && func();
			eventBlocker.current = null;
		}, gap);
	};
};
