import { useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useSplitText';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);
	/* 
		useEffect 안쪽에서, 자주 쓰일만한 특정 기능의 함수를 호출해야 하는데, 
		use로 시작하는 커스텀훅은 특정함수 안쪽에서 호출 불가능하므로,
		해당 hook이 함수를 반환하도록 (return) 처리.
	*/
	const splitText = useSplitText();

	console.log(splitText);

	useEffect(() => {
		// 아래처럼, 커스텀 훅이 return한 함수는, 또 다른 훅이나 핸들러함수 내부에서 호출해 사용할 수 있음.
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
		</main>
	);
}
