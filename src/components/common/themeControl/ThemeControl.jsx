import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useCallback, useEffect, useRef } from 'react';

export default function ThemeControl() {
	const inputEl = useRef(null);
	const { setCookie, isCookie } = useCookie();

	//초기 마운트시 쿠키가 있으면 쿠키에 등록된 값을 --pointColor변수에 할당하고
	//그렇지 않으면 scss에 등록되어 있는 값을 --pointColor변수에 재할당
	//어떤경우던 이후부터는 무조건 document.body.style.getPropertyValue로 현재 theme색상값 호출해서 변경가능
	//변경된 색상값으로 input요소에 value색상도 변경처리
	const getThemeColor = useCallback(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty('--pointColor', getComputedStyle(document.body).getPropertyValue('--pointColor'));
		inputEl.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	//토글 버튼 클릭시마다
	//현재 input요소에 선택된 value값으로 쿠키에 저장하고 css변수값에도 재할당
	//그리고 input요소의 초기값도 다시 변경처리
	const changeThemeColor = () => {
		const color = inputEl.current.value;
		document.body.style.setProperty('--pointColor', color);
		setCookie('theme', color, 60 * 60 * 24);
		inputEl.current.value = color;
	};

	//초기 마운트시에 컬러테마 쿠키값 유무에 따라 변수값 처리
	useEffect(() => {
		getThemeColor();
	}, [getThemeColor]);

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={changeThemeColor} />
		</nav>
	);
}
