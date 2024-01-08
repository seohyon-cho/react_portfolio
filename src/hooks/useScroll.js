import { useState, useEffect, useRef } from 'react';
import Anime from '../asset/anime';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll() {
	// 순서 (1) 커스텀 훅 안쪽에 자체적으로 빈 참조객체 생성.
	const refEl = useRef(null);
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		// 순서 (5) 부모 컴포넌트에서 참조 객체에 연결된 값을 커스텀 훅에서 내부적으로 활용함.
		const modifiedScroll = scroll - refEl.current?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		// .wrap은 리액트 기반의 최상위 루트 요소이므로, 사라지거나 나타나거나 등 변경될 요소가 아니므로 querySelector로 가져와도 됨.
		setFrame(document.querySelector('.wrap'));
	}, []);

	// 순서 (2) 부모 컴포넌트에서 해당 참조객체를 활용할 수 있도록 return으로 반환처리하여 전달.
	return { scrollTo, getCurrentScroll, Frame, refEl };
}
