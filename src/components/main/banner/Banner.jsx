import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const boxEl = useRef(null);

	const customHandleScroll = scroll => {
		boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
		boxEl.current.style.opacity = 1 - scroll / 400;
	};

	const { refEl } = useScroll(customHandleScroll);

	useScroll();
	return (
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
