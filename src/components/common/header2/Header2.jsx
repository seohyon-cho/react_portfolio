import './Header2.scss';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { menuToggle } from '../../../redux/menuSlice';
import { darkToggle } from '../../../redux/darkSlice';

export default function Header2() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	return (
		<header className='Header2'>
			<h1>
				<Link to='/'>SEOHYON</Link>
			</h1>

			<ul>
				<li>
					<NavLink to='/department' activeClassName={'on'}>
						department
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName={'on'}>
						youtube
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName={'on'}>
						gallery
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName={'on'}>
						community
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName={'on'}>
						members
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName={'on'}>
						contact
					</NavLink>
				</li>
			</ul>

			<div className={`themeBox ${Dark && 'dark'}`} onClick={() => dispatch(darkToggle())}>
				<div className='ball'></div>
			</div>

			<button className='menuToggle' onClick={() => dispatch(menuToggle())}>
				menu
			</button>
		</header>
	);
}
