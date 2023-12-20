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
import { useEffect, useState } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchHistory } from './redux/historySlice';
import { fetchMember } from './redux/memberSlice';

export default function App() {
	const dispatch = useDispatch();
	useSelector(store => console.log(store));

	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);
	/* 

	// Promise.all([p1, p2, p3]).then(result => 프로미스 실행 완료 값 배열로 받음)
	
	const promiseArr = useRef([fetchYoutube(), fetchMember(), fetchHistory(0)]);

	useEffect(() => {
		Promise.all(promiseArr.current).then(arr => {
			arr.forEach(action => dispatch(action));
		});
	}, [dispatch]); 

	*/

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
	}, [dispatch]);

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
