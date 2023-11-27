import { useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
	/* 
		useEffect 안쪽에서, 자주 쓰일만한 특정 기능의 함수를 호출해야 하는데, 
		use로 시작하는 커스텀훅은 특정함수 안쪽에서 호출 불가능하므로,
		해당 hook이 함수를 반환하도록 (return) 처리.
	*/

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
		</main>
	);
}
