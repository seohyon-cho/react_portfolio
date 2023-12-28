import { useCookie } from '../../../hooks/useCookie';
import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
// npm i react-icons (설치 후, 구글에 react-icons 접속해서 활용)

export default function Footer2() {
	const setCookie = useCookie();
	const createCookie = () => {
		setCookie('today', 'done', 20);
	};
	console.log(document.cookie);
	return (
		<footer className='Footer2'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					<FaFacebookF />
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
			</ul>

			<button onClick={createCookie}>쿠키 생성</button>
		</footer>
	);
}
