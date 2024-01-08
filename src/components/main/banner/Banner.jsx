import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const boxEl = useRef(null);

	const customHandleScroll = scroll => {
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		} else {
			boxEl.current.style.transform = `rotate(0deg) scale(1)`;
			boxEl.current.style.opacity = 1;
		}
	};

	const { refEl } = useScroll(customHandleScroll);

	return (
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
