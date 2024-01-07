import { useEffect } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const { scrollFrame, getCurrentScroll } = useScroll();

	useEffect(() => {
		scrollFrame?.addEventListener('scroll', () => {
			console.log(getCurrentScroll());
		});
	}, [scrollFrame, getCurrentScroll]);
	return (
		<section className='Pics myScroll'>
			<div className='box'></div>
		</section>
	);
}
