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
import { useState } from 'react';

export default function App() {
	const [Dark, setDark] = useState(false);

	return (
		<div className={Dark ? 'wrap dark' : 'wrap'}>
			<Header2 />
			<Route exact path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			<Footer2 />
		</div>
	);
}
