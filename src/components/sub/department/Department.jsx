import { useEffect, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Department.scss';

export default function Department() {
	const [MemberTit, setMemberTit] = useState('');

	const [MemberData, setMemberData] = useState([]);
	// public 폴더까지의 경로를 구하는 구문 (작업하다보면 public이나 src 폴더의 경로가 바뀌는 경우가 있으므로, 이 구문을 사용하면 경로가 바뀌어도 절대적으로 찾아낼 수 있음. )
	const path = process.env.PUBLIC_URL;

	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				// console.log(json);
				// console.log('key', Object.keys(json)[0]); // 객체를 반복 돌며 key값만 배열로 반환
				// console.log('value', Object.values(json)[0]); // 객체를 반복 돌며 value값만 배열로 반환
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);

	return (
		<Layout2 title={'Department'}>
			<section className='memberBox'>
				<h2>{MemberTit}</h2>
				{MemberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
			</section>
		</Layout2>
	);
}

/*
	React에서 외부 데이터를 가져와서, 화면에 동적으로 출력하는 순서 

	1. 외부 데이터를 가져와서 담을 빈 state 추가 (보통은 빈 배열로 초기화 먼저 함.)
	2. fetch문을 이용해서, 특정 URL의 데이터를 가져온 뒤, 동기적으로 배열로 뽑아서 state에 담아주는 함수를 정의.
	3. 위에서 만든 함수를 의존성 배열이 비어있는 useEffect문 안쪽에서 호출
	4. state에 담겨있는 data 배열 값을 map으로 반복돌면서 JSX 구문 생성.

	객체의 property에서, key와 value값을 반복도는 방법

	(예)
	const student = {name: 'David', age: 20}
	
	// key 반복 돌면서 배열 반환
	Object.keys(student); --> ['name', 'age'];
	Object.values(student); --> ['David', 20];
*/
