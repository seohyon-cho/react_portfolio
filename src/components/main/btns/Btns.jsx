import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import Anime from '../../../asset/anime';

/*
  window.scrollY
    : 브라우저를 스크롤 할 때마다 스크롤되고 있는 거리 값 (동적)
  DOM.scrollTop
    : DOM 요소 안쪽에서 스크롤 할 때마다 스크롤 되고 있는 거리 값 (동적)
  DOM.offsetTop
    : 문서에서 해당 DOM에서의 세로 위치 값 (정적)
*/

export default function Btns() {
	const [Index, setIndex] = useState(0);
	const [Num, setNum] = useState(0);
	const btns = useRef(null);
	const secs = useRef(null);
	const wrap = useRef(null);

	const activation = () => {
		const scroll = wrap.current.scrollTop;
		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');
		setNum(secs.current.length);
		wrap.current.addEventListener('scroll', activation);

		return () => wrap.current.removeEventListener('scroll', activation);
	}, []);

	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === Index ? 'on' : ''}
							onClick={() => {
								// new Anime (선택자, {모션속성명1: 속성값1, 모션속셩명2: 속성값2}, {duration: 속도, easeType: 가속도, callback: 컴플리트함수})
								// 마지막 인수는 필수값은 아니고 선택사항. 안 넣으면 그냥 기본값으로 들어감.
								new Anime(
									wrap.current,
									{ scroll: secs.current[idx].offsetTop },
									{
										duration: 1000,
										ease: [1, -0.01, 0, 1.49],
										callback: () => {
											console.log('complete');
										}
									}
								);
							}}></li>
					);
				})}
		</ul>
	);
}
