import { useRef } from 'react';
import { useCookie } from '../../../hooks/useCookie';
import './ThemeControl.scss';

export default function ThemeControl() {
	const inputEl = useRef(null);

	const { setCookie, isCookie } = useCookie();

	// 컴포넌트 마운트 시, theme 라는 이름의 쿠키 값이 있으면,
	if (isCookie('theme')) {
		// 현재 쿠키값에서 'theme=' 뒤에 오는 문자값을 가져와서, ;을 기준으로 배열로 분리한 뒤, 첫 번째 값을 theme 컬러 값으로 지정.
		// 해당 쿠키 컬러값으로 자동 셋팅
		document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0]);
	}
	// 만약 쿠키가 없으면 그냥 scss 변수로 등록되어 있는 기본 --pointColor 값 활용

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		setCookie('theme', color, 20);
		console.log(getComputedStyle(document.body).getPropertyValue('--pointColor'));
		document.body.style.setProperty('--pointColor', color);
	};

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={changeThemeColor} />
		</nav>
	);
}

/*
  [ 컬러 테마 변경 작업 흐름 ]

  1. 버튼에 클릭 이벤트 발생 시, 컬러 팔레트에서 선택한 색상 코드 값을 쿠키로 저장.
  2. 쿠키가 저장되면, App 마운트 시, --pointColor 에 등록된 value 값을 쿠키에 있는 값으로 변경 처리.
*/
