import { useEffect, useRef, useState } from 'react';
import './Btns.scss';

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

		// 일단 모든 버튼을 반복 돌면서 비활성화 시키고,
		// 조건에 따라 해당하는 버튼만 활성화
		// 참고 : NodeList가 아닌, children으로 가져오는 건 그냥 반복 못 돌리므로 Array.from을 사용해서 순수배열로 바꿔준 뒤 반복 돌릴 수 있음.
		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});

		/*
		if (scroll >= secs.current[0].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[0].classList.add('on');
		}
		if (scroll >= secs.current[1].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[1].classList.add('on');
		}
		if (scroll >= secs.current[2].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[2].classList.add('on');
		}
		if (scroll >= secs.current[3].offsetTop) {
			Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
			btns.current.children[3].classList.add('on');
		}
*/
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
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}
