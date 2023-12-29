import './ThemeControl.scss';
import { useCookie } from '../../../hooks/useCookie';
import { useCallback, useEffect, useRef } from 'react';
import { useThrottle } from '../../../hooks/useThrottle';

export default function ThemeControl() {
	const inputEl = useRef(null);
	const { setCookie, isCookie } = useCookie();

	const getThemeColor = useCallback(() => {
		isCookie('theme')
			? document.body.style.setProperty('--pointColor', document.cookie.split('theme=')[1].split(';')[0])
			: document.body.style.setProperty('--pointColor', getComputedStyle(document.body).getPropertyValue('--pointColor'));
		inputEl.current.value = document.body.style.getPropertyValue('--pointColor');
	}, [isCookie]);

	const changeThemeColor = () => {
		const color = inputEl.current.value;
		document.body.style.setProperty('--pointColor', color);
		setCookie('theme', color, 60 * 60 * 24);
		inputEl.current.value = color;
	};

	const throttledChangeTheme = useThrottle(changeThemeColor, 300);

	useEffect(() => {
		getThemeColor();
	}, [getThemeColor]);

	return (
		<nav className='ThemeControl'>
			<input type='color' ref={inputEl} onChange={throttledChangeTheme} />
		</nav>
	);
}
