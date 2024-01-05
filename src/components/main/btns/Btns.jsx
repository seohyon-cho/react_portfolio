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
	const [Mounted, setMounted] = useState(true);

	// [[ activation에서 null요소의 값을 읽을 수 없다는 오류가 뜨는 이유 (throttle과는 무관) ]]
	// 아래 함수는 scroll이 동작될 때마다 실행되는 함수
	const activation = () => {
		if (!Mounted) return;
		const scroll = wrap.current.scrollTop;

		// 내부적으로 스크롤 시, 모든 section 요소와, btns 요소를 탐색해서 가져와야 함.
		// 스크롤 하자마자 바로 라우터 이동을 하면, 모든 section 요소가 참조 객체에 담기기 전에 컴포넌트가 언마운트 되어버림.
		// 컴포넌트 언마운트 시, 비어있는 참조객체를 호출하려고 하기 때문에 에러가 발생함.
		// 이를 해결하고자, 컴포넌트가 언마운트되면 return문으로 참조객체를 활용하는 구문 자체를 무시하게끔 만듦.
		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current?.children).forEach(btn => btn.classList.remove('on'));
				btns.current?.children[idx].classList.add('on');
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

	// 컴포넌트가 언마운트 시 한 번만 동작되어야 하기 때문에
	// 의존성 배열이 비어있는 useEffect 훅 안 쪽에 클린업 함수에서 Mounted값을 변경해야 함.
	useEffect(() => {
		return () => setMounted(false);
	}, []);

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
