import { useCallback, useEffect, useRef } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/action';

export default function Menu() {
	const dispatch = useDispatch();
	const Toggle = useSelector(store => store.menuReducer.menu);

	// setToggle이 변화할 때마다 closeMenu 라는 함수에 대한 메모이제이션이 임시로 해제됨.
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch({ type: types.MENU.start, payload: false });
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<>
			{Toggle && (
				<aside className='Menu' onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}
