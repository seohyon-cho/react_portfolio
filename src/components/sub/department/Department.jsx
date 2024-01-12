import { useEffect, useRef, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Department.scss';
import { useCustomText } from '../../../hooks/useText';
import { useSelector } from 'react-redux';

export default function Department() {
	const HistoryData = useSelector(store => store.historyReducer.history);
	const MemberData = useSelector(store => store.memberReducer.members);
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	return (
		<Layout2 title={'Department'}>
			<section className='historyBox'>
				<h2>{combinedTitle('History')}</h2>
				<div className='con'>
					{HistoryData?.map((history, idx) => {
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
					{MemberData?.map((member, idx) => {
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

/*
	[ 해당 페이지 (Department.jsx) 에서의 개발 흐름 ]

	- public/DB 폴더 안 쪽에 json 파일을 미리 준비해서, data fetching 처리 
	- fetching한 데이터를 기반으로, 회사 연혁 및 멤버 소개 페이지 구현 


	[ 해당 페이지에서 발생한 이슈 사항 ]

	- 상대적으로 react 지식이 없을 때 (react를 배우기 시작한 초반) 처음으로 제작한 컴포넌트 페이지라, static한 데이터들을 일일히 JSX에 컨텐츠를 담아서 렌더링 처리 했었음. 
	- 그러나 추후 생각을 해보니 유지보수를 하거나 데이터 관리를 할 때 일일히 수정을 해야하므로 비효율적이라 판단되어 JSON파일 형태로 데이터만 분리한 뒤, 동적으로 렌더링 처리하는 구조로 변경했음. 
	- 원래 의도는 DB에 연동을 하고 싶었지만, 아직 DB에 대해 공부하기 전이라 DB의 구조 및 DB 연동에 대해 무지해서, 아쉬운대로 JSON 형태로 처리해 놓았음. (그러나, 이후 Next.js를 배우면서 Mongo DB 연동하는 프로젝트를 진행해보게 됨. = 공부를 더 하게 되면서 DB도 건드릴 줄 알게 되었다는 의미. 성장 가능성을 보여주는 부분이라 꼭 넣는 게 좋음. 참조 링크 식으로 이후에 만든 Mongo DB 프로젝트를 연결해 바로 전후 성장 여부를 비교할 수 있게끔.. )

	*/
