import Anime from '../asset/anime';
import { useState, useEffect, useRef, useCallback } from 'react';
export function useScroll(customHandler, baseLine = -window.innerHeight / 2) {
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	const getCurrentScroll = useCallback(() => {
		//기존 Btns컴포넌트에 baseLine적용시에는 기존 setction의 offsetTop값에 baseLine값을 빼서 기준점을 올리는 방식
		//해당 훅에서는 반대로 기준점은 그대로 놔두고 동적으로 변하는 scrollTop에 baseLine값을 더해서 기준점을 올리는 방식
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	}, [Frame, baseLine]);

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		customHandler(scroll);
	}, [getCurrentScroll, customHandler]);

	useEffect(() => {
		setFrame(document.querySelector('.wrap'));
	}, []);
	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
