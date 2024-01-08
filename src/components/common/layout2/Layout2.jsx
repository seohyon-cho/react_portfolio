import { useEffect, useRef } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout2({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();

	// 순서 (1) 레이아웃 컴포넌트에서 공통적으로 적용될, 스크롤 위치가 100px을 넘어가면 btnTop 버튼을 보이게끔 하는 함수 정의
	const handleCustomScroll = scroll => {
		scroll >= 100 ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
	};
	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0);

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, scrollTo, refEl]);

	return (
		<main ref={refEl} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
			<button onClick={() => scrollTo(0)} ref={refBtnTop} className='btnTop'>
				Top
			</button>
		</main>
	);
}
