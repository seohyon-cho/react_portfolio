import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	// setToggle이 변화할 때마다 closeMenu 라는 함수에 대한 메모이제이션이 임시로 해제됨.
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<>
			{MenuOpen && (
				<aside className='Menu' onClick={() => setMenuOpen(false)}>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}
