import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	const titEl = useRef(null);
	const titEl2 = useRef(null);

	const handleCustomScroll = scroll => {
		titEl.current.style.transform = `translateX(${scroll}px)`;
		titEl.current.style.opacity = 1 - scroll / 800;
		titEl2.current.style.transform = ` scale(${1 + scroll / 400}) translateX(${scroll}px)`;
		titEl2.current.style.opacity = 1 - scroll / 500;
	};

	const { refEl } = useScroll(handleCustomScroll);

	return (
		<section className='Pics myScroll' ref={refEl}>
			<h3 className='tit' ref={titEl}>
				FLICKR
			</h3>
			<h4 className='tit2' ref={titEl2}>
				PREIVIEW
			</h4>
		</section>
	);
}
