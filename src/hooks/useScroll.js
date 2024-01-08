import { useState, useEffect, useRef, useCallback } from 'react';
import Anime from '../asset/anime';

// 순서 (3) 부모 컴포넌트로부터 커스텀스크롤 함수를 파라미터를 통해 내부로 전달 받음.
export function useScroll(customHandler) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(
		(baseLine = -window.innerHeight / 2) => {
			const scroll = Frame.scrollTop - baseLine;
			const modifiedScroll = scroll - refEl.current?.offsetTop;
			return modifiedScroll;
		},
		[Frame]
	);

	// 순서 (4) 전달받은 커스텀 스크롤 함수를, 내부에 있는 handleScroll 함수 안쪽에서 호출해서, 내부적으로 getCurrentScroll 값이 반환하고 있는 스크롤 값과 연동시켜줌.
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();

		if (scroll >= 0) customHandler(scroll);
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 순서 (5) 해당 커스텀 훅을 호출하고 있는 부모 컴포넌트가 마운트 시, handleScroll 함수에 scroll 이벤트를 연결.
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return { scrollTo, getCurrentScroll, Frame, refEl };
}
