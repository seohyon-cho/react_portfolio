import { useState, useEffect, useRef, useCallback } from 'react';
import Anime from '../asset/anime';

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

	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll();
		if (scroll >= 0) customHandler(scroll);
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
