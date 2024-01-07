import Anime from '../asset/anime';

export function useScroll(scrollFrame) {
	//기존에 scrollTop값을 제어하는 wrap요소를 참조객체에 담아서 반환하는것이 문제
	//이유: wrap.scrollTop의 변경되는 값을 계속 활용해되는데
	//참조객체에 담으면 담는 순간의 참조객체값이 고정되는 문제 발생
	//해결방법: wrap요소를 호출 부모컴포넌트에서 State에 담도록 처리
	const scrollTo = targetPos => {
		new Anime(scrollFrame.current, { scroll: targetPos });
	};

	const getCurrentScroll = selfEl => {
		const scroll = scrollFrame.scrollTop;
		const modifiedScroll = scroll - selfEl?.offsetTop;
		return modifiedScroll;
	};

	return { scrollTo, getCurrentScroll };
}
