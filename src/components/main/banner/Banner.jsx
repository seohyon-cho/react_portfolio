import { useEffect, useRef, useCallback } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Banner.scss';

export default function Banner() {
	const boxEl = useRef(null);
	// 순서 (3) 커스텀 훅 호출 시, useScroll이 제공하고 있는 (이전에 생성해둔) 빈 참조객체를 가져옴.
	const { getCurrentScroll, Frame, refEl } = useScroll();
	// 계속 해서 다른 값을 반환하는 getCurrentScroll을 useRef에 담아버리면 스크롤값의 맨 처음 초기값 0만이 정적으로 담기게 되면서 스크롤 작동이 정상적으로 안 됨.
	// useCallback에 담음으로써 메모이제이션 처리를 하되, getCurrentScroll의 값 (스크롤값)이 변화할 때마다 메모이제이션을 잠시 풀고 값 변경.
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(-window.innerHeight / 2);
		if (scroll >= 0) {
			boxEl.current.style.transform = `rotate(${scroll / 2}deg) scale(${1 + scroll / 400})`;
			boxEl.current.style.opacity = 1 - scroll / 400;
		}
	}, [getCurrentScroll]);

	useEffect(() => {
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	useScroll();
	return (
		// 순서 (4) 원하는 요소에 빈 참조객체 연결
		<section className='Banner myScroll' ref={refEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
