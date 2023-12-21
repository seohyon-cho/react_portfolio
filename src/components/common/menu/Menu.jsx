import { useCallback, useEffect } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { menuClose } from '../../../redux/menuSlice';

export default function Menu({ setToggle }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menu.open);

	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch(menuClose());
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => {
			window.removeEventListener('resize', closeMenu);
		};
	}, [closeMenu]);

	return (
		<>
			{Open && (
				<aside className='Menu' onClick={() => dispatch(menuClose())}>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}
