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
	const num = useRef(4);
	const btns = useRef(null);
	const secs = useRef(null);
	const wrap = useRef(null);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = document.querySelectorAll('.myScroll');

		wrap.current.addEventListener('scroll', e => {
			console.log('scroll', e.target.scrollTop);
			console.log('offset', secs.current[1].offsetTop);
		});
	}, []);

	return (
		<ul className='Btns'>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					return <li key={idx} className={idx === Index ? 'on' : ''}></li>;
				})}
		</ul>
	);
}
