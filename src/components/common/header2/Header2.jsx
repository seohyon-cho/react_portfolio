import { useGlobalData } from '../../../hooks/useGlobalData';
import DarkMode from '../darkMode/DarkMode';
import ThemeControl from '../themeControl/ThemeControl';
import './Header2.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Header2() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	return (
		<header className='Header2 myScroll'>
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

			<button className='menuToggle' onClick={() => setMenuOpen(!MenuOpen)}>
				menu
			</button>
			<DarkMode />
			<ThemeControl />
		</header>
	);
}
