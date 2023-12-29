import { useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
		</main>
	);
}
