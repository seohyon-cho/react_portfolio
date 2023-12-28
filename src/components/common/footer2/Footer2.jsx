import { useCookie } from '../../../hooks/useCookie';
import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer2() {
	const { setCookie, isCookie, viewCookie } = useCookie();

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

			<button onClick={() => setCookie('today', 'done', 3600)}>쿠키 생성</button>
			<button onClick={() => setCookie('today', 'done', 0)}>쿠키 삭제</button>
			<button onClick={() => console.log(isCookie('today=done'))}>쿠키 확인</button>
			<button onClick={() => viewCookie()}>모든 쿠키 보기</button>
		</footer>
	);
}
