import { useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll, getCurrentScroll, scrollFrame } from '../../../hooks/useScroll';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
	const { scrollTo, getCurrentScroll, scrollFrame } = useScroll();

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
		scrollFrame.current.addEventListener('scroll', () => {
			console.log(getCurrentScroll());
		});
	}, [splitText, title, scrollTo, scrollFrame, getCurrentScroll]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
			<button onClick={() => scrollTo(0)} className='btnTop'>
				Top
			</button>
		</main>
	);
}
