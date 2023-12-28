import { useCookie } from '../../../hooks/useCookie';
import { useGlobalData } from '../../../hooks/useGlobalData';
import './DarkMode.scss';

export default function DarkMode() {
	const { Dark, setDark } = useGlobalData();
	const { setCookie } = useCookie();
	const changeMode = () => {
		setDark(!Dark);
		setCookie('dark', !Dark, 20);
	};

	return (
		<div className={`DarkMode ${Dark ? 'dark' : ''}`} onClick={changeMode}>
			<div className='ball'></div>
		</div>
	);
}
