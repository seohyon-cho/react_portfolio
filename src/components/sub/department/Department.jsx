import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

/*
	비동기 데이터를 내부적으로 활용하는 컴포넌트에서 너무 빠르게 다른 컴포넌트로 이동을 하게 되면, 
	특정 값이 없다고 뜨면서 memory leak 이라는 에러 문구가 뜨는 현상 

	이유 : 특정 컴포넌트 마운트 시, 만약 해당 컴포넌트가 비동기 데이터를 패칭해야하는 내용을 담고 있다면, 
	fetching 완료 후 해당 값을 state에 담기까지 약간의 물리적인 시간이 소요됨. 

	아직 데이터가 fetching 요청이 들어가고, 데이터 반환이 되기 전에 해당 컴포넌트가 unmount 되면 
	이미 담을 state값은 사라졌는데 fetching 요청은 계속해서 수행되고 있음. ("메모리 누수현상"이 발생했다고 함.)

	해결 방법 : 해당 컴포넌트에 특정 state를 하나 생성해서, 초기 값을 false로 지정하고, 해당 컴포넌트가 unmount 시
	해당 state값을 강제로 true 로 변경처리 하면 됨. 

	해당 state값이 true일 때에는 state에 값이 담기는 것 자체가 실행되지 않도록 조건문 처리하면 됨. 


	const [Mounted, setMounted] = useState(true);
	useEffect(() => {
		return () => setMounted(false);
	}, [Mounted]);

	{Mounted && 데이터패칭문}
*/

export default function Department() {
	const [Mounted, setMounted] = useState(true);
	useEffect(() => {
		return () => setMounted(false);
	}, [Mounted]);

	const HistoryData = useSelector(store => store.historyReducer.history);
	const MemberData = useSelector(store => store.memberReducer.members);
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	return (
		<Layout2 title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{Mounted &&
						HistoryData?.map((history, idx) => {
							return (
								<article key={history + idx}>
									<h3>{Object.keys(history)[0]}</h3>
									<ul>
										{Object.values(history)[0].map((list, idx) => {
											return <li key={list + idx}>{list}</li>;
										})}
									</ul>
								</article>
							);
						})}
				</div>
			</section>
			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>
				<div className='con'>
					{Mounted &&
						MemberData?.map((member, idx) => {
							return (
								<article key={member + idx}>
									<div className='pic'>
										<img src={`${path.current}/img/${member.pic}`} alt={member.name} />
									</div>
									<h3>{member.name}</h3>
									<p>{member.position}</p>
								</article>
							);
						})}
				</div>
			</section>
		</Layout2>
	);
}
