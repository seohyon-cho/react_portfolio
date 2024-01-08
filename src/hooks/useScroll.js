import { useState, useEffect } from 'react';
import Anime from '../asset/anime';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll() {
	const [Frame, setFrame] = useState(null);
	const scrollTo = targetPos => {
		Frame && new Anime(Frame, { scroll: targetPos });
	};

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = Frame.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	useEffect(() => {
		// .wrap은 리액트 기반의 최상위 루트 요소이므로, 사라지거나 나타나거나 등 변경될 요소가 아니므로 querySelector로 가져와도 됨.
		setFrame(document.querySelector('.wrap'));
	}, []);

	return { scrollTo, getCurrentScroll, Frame };
}
