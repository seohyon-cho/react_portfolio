import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// npm i react-icons (설치 후, 구글에 react-icons 접속해서 활용)

export default function Footer2() {
	return (
		<footer className='Footer2'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>

			<ul>
				<li>
					{/* 외부 사이트 링크 연결 시, 일반 <a>태그에 꼭 rel=noopener noreferrer 속성을 추가해서 window객체에 이전 리액트 컴포넌트의 정보를 참조 못 하게 처리해야 함. */}
					<a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
						<FaFacebookF />
					</a>
				</li>
				<li>
					<FaTwitter />
				</li>
				<li>
					<FaYoutube />
				</li>
			</ul>
		</footer>
	);
}
