import { useCallback, useEffect, useRef } from 'react';
import './Menu.scss';

export default function Menu({ setToggle }) {
	// setToggle이 변화할 때마다 closeMenu 라는 함수에 대한 메모이제이션이 임시로 해제됨.
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setToggle(false);
	}, [setToggle]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<aside className='Menu'>
			<h1>Mobile Menu</h1>
		</aside>
	);
}
