import Footer2 from './components/common/footer2/Footer2';
import Header2 from './components/common/header2/Header2';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';

function App() {
	return (
		<>
			<Header2 />
			<MainWrap />
			<Department />
			<Youtube />
			<Gallery />
			<Community />
			<Members />
			<Contact />
			<Footer2 />
		</>
	);
}

export default App;
