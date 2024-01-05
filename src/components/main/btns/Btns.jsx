import { useCallback, useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns(opt) {
	const defOpt = useRef({ frame: '.wrap', items: '.myScroll', base: -window.innerHeight / 2, isAuto: false });
	const resultOpt = useRef({ ...defOpt.current, ...opt });
	const [Num, setNum] = useState(0);
	const isAutoScroll = useRef(resultOpt.current.isAuto);
	const btns = useRef(null);
	const secs = useRef(null);
	const wrap = useRef(null);
	const baseLine = useRef(resultOpt.current.base);
	const isMotion = useRef(false);

	// [[ activation에서 null요소의 값을 읽을 수 없다는 오류가 뜨는 이유 (throttle과는 무관) ]]
	// 아래 함수는 scroll이 동작될 때마다 실행되는 함수
	const activation = () => {
		const scroll = wrap.current.scrollTop;
		secs.current.forEach((_, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				//아래 구문에서 children이 아닌 querySelectorAll을 써야 되는 이유
				//children(HTMLCollections반환 LiveDOM) vs querySelectorAll(NodeList반환, Static DOM)
				//버튼 li요소를 Btns컴포넌트 마운트시 동적으로 생성하기 때문에
				//만약 컴포넌트 unmounted시 querySelector로 찾은 NodeList는 optionial chaining 처리가능하나
				//children으로 구한 HTMLCollection은 실시간으로 DOM의 상태값을 추적하기 떄문에 optional chaining처리 불가
				const btnsArr = btns.current?.querySelectorAll('li');
				btnsArr?.forEach(btn => btn.classList.remove('on'));
				btns.current?.querySelectorAll('li')[idx]?.classList.add('on');
			}
		});
	};

	const modifyPos = () => {
		const btnsArr = Array.from(btns.current.children);
		const activeEl = btns.current.querySelector('li.on');
		const activeIndex = btnsArr.indexOf(activeEl);
		wrap.current.scrollTop = secs.current[activeIndex].offsetTop;
	};
	const throttledActivation = useThrottle(activation);
	const throttledModifyPos = useThrottle(modifyPos, 200);

	const moveScroll = idx => {
		if (isMotion.current) return;
		isMotion.current = true;
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 1000, callback: () => (isMotion.current = false) });
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			const activeIndex = btnsArr.indexOf(activeEl);

			if (e.deltaY > 0) {
				console.log('wheel down');
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				console.log('wheel up');
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	useEffect(() => {
		wrap.current = document.querySelector(resultOpt.current.frame);
		secs.current = wrap.current.querySelectorAll(resultOpt.current.items);
		setNum(secs.current.length);

		window.addEventListener('resize', throttledModifyPos);
		isAutoScroll.current && wrap.current.addEventListener('mousewheel', autoScroll);
		wrap.current.addEventListener('scroll', throttledActivation);
		return () => {
			window.removeEventListener('resize', throttledModifyPos);
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation, autoScroll, throttledModifyPos, resultOpt.current.frame, resultOpt.current.items]);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							// new Anime (선택자, {모션속성명1: 속성값1, 모션속셩명2: 속성값2}, {duration: 속도, easeType: 가속도, callback: 컴플리트함수})
							// 마지막 인수는 필수값은 아니고 선택사항. 안 넣으면 그냥 기본값으로 들어감.
							onClick={() => moveScroll(idx)}></li>
					);
				})}
		</ul>
	);
}
