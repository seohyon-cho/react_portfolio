import { useCallback, useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';

/*
  window.scrollY
    : 브라우저를 스크롤 할 때마다 스크롤되고 있는 거리 값 (동적)
  DOM.scrollTop
    : DOM 요소 안쪽에서 스크롤 할 때마다 스크롤 되고 있는 거리 값 (동적)
  DOM.offsetTop
    : 문서에서 해당 DOM에서의 세로 위치 값 (정적)
*/

export default function Btns() {
	const [Num, setNum] = useState(0);
	const isAutoScroll = useRef(false);
	const btns = useRef(null);
	const secs = useRef(null);
	const wrap = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2); // 현재 섹션의 컨텐츠가 절반 이상 보이게 되면 해당 섹션의 스크롤 버튼 활성화
	// isMotion.current 값이 true면 모션 중이므로 재실행 방지, false면 모션 중이 아니므로 재실행 가능.
	const isMotion = useRef(false);

	const activation = () => {
		const scroll = wrap.current.scrollTop;
		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const throttledActivation = useThrottle(activation);

	const moveScroll = idx => {
		// 초기값이 false이므로 처음 한 번은 해당 조건문이 무시되면서 하단의 코드 실행.
		if (isMotion.current) return;
		// 조건문을 통과하자마자 바로 값을 true로 변경해서 다음부터는 재호출이 안 되도록 막음.
		isMotion.current = true;
		// 모션 함수가 실행되고, 모션이 끝나는 순간 실행되는 callback 함수로 다시 isMotion.current 값을 false로 변경해서 재실행 가능케 설정.
		// 결론 : isMotion.current 값을 이용해서 모션 중에는 중복 함수 호출 불가능하도록 모션 도중 재이벤트 방지 처리.
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 1000, callback: () => (isMotion.current = false) });
	};

	const autoScroll = useCallback(
		e => {
			const btnsArr = Array.from(btns.current.children);
			const activeEl = btns.current.querySelector('li.on');
			// 현재 활성화된 버튼의 순번을 구하기.
			const activeIndex = btnsArr.indexOf(activeEl);

			// 마우스 휠을 다운할 경우
			if (e.deltaY > 0) {
				console.log('wheel down');
				// 현재 순번이 마지막 순번이 아니기만 하면 다음 순번의 섹션 위치로 모션 이동
				activeIndex !== Num - 1 && moveScroll(activeIndex + 1);
			} else {
				// 마우스 휠을 업할 경우
				console.log('wheel up');
				// 현재 순번이 첫 번째 순번만 아니면 이전 순번의 섹션 위치로 모션 이동
				activeIndex !== 0 && moveScroll(activeIndex - 1);
			}
		},
		[Num]
	);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		isAutoScroll && wrap.current.addEventListener('mousewheel', autoScroll);
		wrap.current.addEventListener('scroll', throttledActivation);
		return () => {
			wrap.current.removeEventListener('scroll', throttledActivation);
			wrap.current.removeEventListener('mousewheel', autoScroll);
		};
	}, [throttledActivation, autoScroll]);

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
