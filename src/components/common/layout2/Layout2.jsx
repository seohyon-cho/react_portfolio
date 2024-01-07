import { useCallback, useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();
	const { scrollTo, getCurrentScroll, scrollFrame } = useScroll();

	const handleScroll = useCallback(
		num => {
			getCurrentScroll() >= num ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
		},
		[getCurrentScroll]
	);

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title, scrollTo]);

	useEffect(() => {
		scrollFrame.current.addEventListener('scroll', () => handleScroll(300));
	}, [getCurrentScroll, handleScroll, scrollFrame]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
			<button onClick={() => scrollTo(0)} ref={refBtnTop} className='btnTop'>
				Top
			</button>
		</main>
	);
}
