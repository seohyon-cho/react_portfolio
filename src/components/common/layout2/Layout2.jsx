import { useEffect, useRef } from 'react';
import './Layout2.scss';

export default function Layout2({ children, title }) {
	const refFrame = useRef(null);

	useEffect(() => {
		refFrame.current.classList.add('on');
	}, []);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1>{title}</h1>
			<div className='bar'></div>
			{children}
		</main>
	);
}
