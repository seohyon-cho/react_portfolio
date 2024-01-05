import { useEffect, useRef } from 'react';
import Anime from '../asset/anime';

export function useScroll(frame) {
	// 선택자로 스크롤을 제어해야 하는 root 컴포넌트의 클래스명을 받아 DOM요소를 참조객체에 연결
	const frameRef = useRef(null);

	// targetPos 위치값으로 스크롤을 이동하는 함수 정의
	const scrollTo = targetPos => {
		new Anime(frameRef.current, { scroll: targetPos });
	};

	// 컴포넌트 마운트 시, 빈 frameRef에 선택자 담음.
	useEffect(() => {
		frameRef.current = document.querySelector(frame);
	}, []);

	// scrollTo 함수를 비구조화할당으로 뽑아내기 위해 객체로 묶어서 반환.
	return { scrollTo };
}