import Anime from '../asset/anime';

//useScroll훅을 처음 초기화할때 무조건 인수로 state에 담겨있는 ScrollFrame요소를 전달 (중요)
export function useScroll(scrollFrame) {
	const scrollTo = targetPos => {
		scrollFrame && new Anime(scrollFrame, { scroll: targetPos });
	};

	//getCurrentScroll(호출하는 부모프레임요소, 기준점 보정값)
	const getCurrentScroll = (selfEl, baseLine = 0) => {
		const scroll = scrollFrame?.scrollTop - baseLine;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};
	return { scrollTo, getCurrentScroll };
}
