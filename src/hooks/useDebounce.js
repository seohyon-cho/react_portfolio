import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, gap = 500) => {
	const [Mounted, setMounted] = useState(true);

	const [DebouncedVal, setDebouncedVal] = useState(value);

	const eventBlocker = useRef(null); // setTimeout의 리턴 값을 받을 참조 객체

	// 인수로 받은 state 값이 변경될 때마다, setTimeout 구문의 호출을 계속해서 초기화함. (clearTimeout을 사용해서.)

	clearTimeout(eventBlocker.current);

	// 아래의 setTimeout에 의해서 원래의 state값이 0.5초 뒤에 무조건 변경되는 구조임.
	// 그러나, 만약 0.5초 내에 이벤트 값이 들어오면, 다시 value로 전달된 state값이 전달되면, setTimeout의 리턴 값을 초기화함.
	// setTimeout의 리턴값을 clearTimeout으로 초기화 시킴. (지연시간 0.5초를 무시하고 다시 처음부터 또 0.5초를 기다리게 하는 것임. )
	eventBlocker.current = setTimeout(() => {
		Mounted && setDebouncedVal(value);
	}, gap);

	useEffect(() => {
		return () => setMounted(false);
	}, []);
	return DebouncedVal;
};

/*
	useDebounce 훅 제작 배경
	- input요소의 입력값으로 State를 변경할때마다 너무 잦은 State변경을 줄여서 특정 핸들러함수의 과한 반복 호출을 막기위해 state값이 일정시간안에 연속적으로 변경될때 State의 변경을 계속 미룸
	useDebounce 활용예시
	- Members에서 onChnage발생시 특정 state값의 변경을 미루면서 불필요한 check함수의 호출 지연
*/
