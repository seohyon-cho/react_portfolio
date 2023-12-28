import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer2() {
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
		</footer>
	);
}
