import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import Footer2 from './components/common/footer2/Footer2';
import Header2 from './components/common/header2/Header2';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';

import { Route } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

import * as types from './redux/action';

export default function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.darkReducer.dark);
	useSelector(store => console.log(store));
	const path = useRef(process.env.PUBLIC_URL);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header2 />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer2 />
			<Menu />
		</div>
	);
}

/*
	[ 해당 페이지 (App.jsx) 에서의 개발 흐름 ]

	- 루트 컴포넌트이기 때문에, 모든 비동기 데이터를 호출한 뒤, 액션 객체를 생성해서 dispatch로 Reducer에 전달한 후, store(전역) 에 저장. 

	- 메인 페이지 및 서브 페이지용 컴포넌트를 Router 설정 
			: 실제 실무에서, 아직 레거시코드 (옛날코드) 를 많이 쓰고 있기 때문에, 일부러 react-router-dom 을 5버전(구버전)을 사용해봤고, 
			같은 원리로 프로젝트에서 redux도 활용해보고자 일부러 React17버전으로 다운그레이드해서 작업했음. 

	- 미디어쿼리로 반응형 처리를 하지 않는 이유 : module.scss는 아니지만, 컴포넌트의 효율적인 유지보수를 위해서 폴더별로 jsx, scss 파일을 그룹화하다보니 
	일반 미디어쿼리로 반응형 처리를 하기에는 반복 작업과 css 변수 활용에 어려움이 있어, useMedia 라는 커스텀 훅을 직접 만들어서, 스크립트로 반응형 스타일링이 되도록 처리했음. 




	[ 해당 프로젝트 진행하면서 발생한 이슈 사항 ]

	(1) 처음에 비동기 데이터를 여러 컴포넌트에서 재활용하기 위해서 redux를 사용했는데, flickr 처럼 검색이나 사용자 이벤트에 따라 빈번하게 비동기 데이터를 다시 담아야 하는 경우에는 redux로 처리하기가 힘들어 적합하지 않았다고 느꼈음. 
	
	(1)의 해결 절차 : flickr만 redux에서 제외하고 고민하던 중, redux의 비동기데이터의 전역 State 처리를 위한 redux-saga가 있다는 걸 알게 됨. 그래서 branch를 따로 분리해서 redux-saga 버전으로 작업을 진행하기 시작함. 
*/
