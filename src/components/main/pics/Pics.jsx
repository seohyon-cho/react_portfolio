import { useCallback, useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';

export default function Pics() {
	console.log('Pics');
	const [Frame, setFrame] = useState(null);
	const thisEl = useRef(null);
	const boxEl = useRef(null);
	const { getCurrentScroll } = useScroll(Frame);

	//hook으로부터 현재 보정된 scroll값을 반환받아서
	//해당 값을 참조객체의 style값으로 연동
	//scroll값이 바뀔때마다 불필요하게 재랜더링하지 않으면서 스크롤값 스타일에 연동
	const handleScroll = useCallback(() => {
		const scroll = getCurrentScroll(thisEl.current);
		scroll >= 0 && (boxEl.current.style.transform = `translateX(${scroll}px)`);
	}, [getCurrentScroll]);

	//컴포넌트 마운트시 wrap요소를 Frame State에담음
	//State에 담겨있는 wrap요소는 최신 scrollTop을 가지고 있는 동적인 상태
	useEffect(() => {
		setFrame(thisEl.current?.closest('.wrap'));
	}, []);

	useEffect(() => {
		//Frame에 scroll이벤트 연결
		Frame?.addEventListener('scroll', handleScroll);
		return () => Frame?.removeEventListener('scroll', handleScroll);
	}, [Frame, handleScroll]);

	return (
		<section className='Pics myScroll' ref={thisEl}>
			<div className='box' ref={boxEl}></div>
		</section>
	);
}
