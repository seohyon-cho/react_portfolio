import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Banner />
			{/* <Btns frame={스크롤 제어할 프레임요소의 클래스명} items={스크롤이 걸릴 영역의 공통 클래스} base={활성화기준점} isAuto={autoScrolling 기능 활성화 유무 (boolean, 기본값은 false)} */}
			<Btns />
		</div>
	);
}
