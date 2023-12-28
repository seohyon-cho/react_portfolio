import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie } = useCookie();

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		setCookie('theme', color, 20);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} />
			<button onClick={changeThemeColor}>theme color</button>
		</nav>
	);
}

/*
  [ 컬러 테마 변경 작업 흐름 ]

  1. 버튼에 클릭 이벤트 발생 시, 컬러 팔레트에서 선택한 색상 코드 값을 쿠키로 저장.
  2. 쿠키가 저장되면, App 마운트 시, --pointColor 에 등록된 value 값을 쿠키에 있는 값으로 변경 처리.
*/
