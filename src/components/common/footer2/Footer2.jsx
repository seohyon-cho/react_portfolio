import './Footer2.scss';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Footer2() {
	// 순서 (5) - 전역 store 값을 useSelector로 접근해서, 바로 호출 가능하게 됨.
	const MemberData = useSelector(store => store.memberReducer.members);
	return (
		<footer className='Footer2'>
			<h1>Dcodelab</h1>

			<p>2023 Dcodelab &copy; All Rights Reserved.</p>
			{/* 
				아래의 코드에서 조건문을 쓴 이유 

				첫 번째 렌더링 시에는 Store로부터 빈 배열만 전달되기 때문에, 두 번째 렌더링 때 Store에 데이터가 생긴 상태에서 해당 구문이 실행되도록 조건문 처리한 것임.
				MemberData 가 존재할 때에 실행되도록!
			*/}
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
