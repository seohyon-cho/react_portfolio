import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import './DarkMode.scss';

export default function DarkMode() {
	const { Mode, setMode } = useGlobalData();
	const { setCookie, isCookie } = useCookie();

	if (isCookie('dark')) {
		setMode(document.cookie.split('dark=')[1].split(';')[0]);
	}
	const changeMode = () => {
		setMode(Mode === 'dark' ? 'dark' : 'light');
		setCookie('dark', Mode, 20);
	};

	return (
		<div className={`DarkMode ${Mode === 'dark' ? 'dark' : 'light'}`} onClick={changeMode}>
			<div className='ball'></div>
		</div>
	);
}
