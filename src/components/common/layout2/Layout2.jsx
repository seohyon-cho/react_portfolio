import { useCallback, useEffect, useRef, useState } from 'react';
import './Layout2.scss';
import { useSplitText } from '../../../hooks/useText';
import { useScroll } from '../../../hooks/useScroll';

export default function Layout2({ children, title }) {
	const [Frame, setFrame] = useState(null);
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();
	//useScroll처음 초기화시 state에 담겨있는 scrollFrame요소 전달
	const { scrollTo, getCurrentScroll } = useScroll(Frame);

	const handleScroll = useCallback(
		num => {
			//첫번째 인수로 자기자신 프레임, 두번째 인수로 0 (상단부터 scroll값연동하기 위해 0전달)
			getCurrentScroll(refFrame.current, 0) >= num ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
		},
		[getCurrentScroll]
	);

	//useScroll에 전달할 Frame state에 스크롤 프레임요소 담기
	useEffect(() => {
		setFrame(refFrame.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title, scrollTo]);

	useEffect(() => {
		Frame?.addEventListener('scroll', () => handleScroll(300));
	}, [getCurrentScroll, handleScroll, Frame]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div ref={refFrame} className='bar'></div>
			{children}
			<button onClick={() => scrollTo(0)} ref={refBtnTop} className='btnTop'>
				Top
			</button>
		</main>
	);
}
