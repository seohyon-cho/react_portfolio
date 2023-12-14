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
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

export default function App() {
	// 순서 (2) dispatch 함수를 활성화 (추후 fetching된 데이터를 action에 담아서, reducer에게 전달하기 위함임.)
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	// 순서 (3) fetching된 데이터 값을 받아서 action 객체에 담은 뒤, dispatch로 reducer에게 전달하는 함수를 정의.
	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then(data => data.json())
			.then(json => {
				console.log(json.members);
				dispatch({ type: 'SET_MEMBERS', payload: json.members });
			});
	};

	// 순서 (4) 컴포넌트가 처음 mount 되었을 때 함수를 호출해서, 비동기 데이터를 reducer에 전달
	// 첫 번째 렌더링 때 : 전역 store의 값은 빈 배열인 상태 []
	// 두 번째 렌더링 때 : 이때 비로소 각 컴포넌트에서 useSelector로 해당 비동기 데이터에 접근 가능하게 됨.
	useEffect(() => fetchDepartment(), []);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header2 Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer2 />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}
