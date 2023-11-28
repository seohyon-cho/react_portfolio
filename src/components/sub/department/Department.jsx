import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Department() {
	const changeTitle = useCustomText('title');
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
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
				<h2>{changeTitle(MemberTit)}</h2>
				{MemberData.map((member, idx) => {
					return (
						<article key={member + idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
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

	
	// 문자열 관련 내장 메서드
	전체문자열.charAt(순서값) : 전체 문자열에서, 해당 순서의 문자값만 반환
	전체문자열.slice(순서값1, 순서값2) : 전체 문자열에서, 해당 순서1부터 순서2의 위치까지 문자를 잘라서 반환 
	전체문자열.toUpperCase() : 문자열 전체를 대문자로 반환
	전체문자열.toLowerCase() : 문자열 전체를 소문자로 반환 
	전체문자열.split(구분자) : 전체 문자열을, 구분자를 기준으로 나누어 배열로 반환 
	배열.join('구분자') : 각 배열값을 구분자로 이어붙이면서, 하나의 문자열로 반환 
*/
