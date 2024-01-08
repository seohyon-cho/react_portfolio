import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const boxEl = useRef(null);

	// 순서 (1) useScroll 커스텀 훅 쪽으로 전달할, 해당 컴포넌트에서의 커스텀 스크롤 함수 정의.
	const customHandleScroll = scroll => {
		boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
		boxEl.current.style.opacity = 1 - scroll / 400;
	};

	// 순서 (2) 커스텀 스크롤 함수를 useScroll 호출 시 인수로 전달.
	const { refEl } = useScroll(customHandleScroll);

	useScroll();
	return (
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
