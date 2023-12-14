import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
// npm i react-icons (설치 후, 구글에 react-icons 접속해서 활용)

export default function Footer2() {
	const MemberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer2'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			<p>{MemberData && `${MemberData[0].position}:${MemberData[0].name}`}</p>

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
		</footer>
	);
}
