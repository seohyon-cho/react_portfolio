import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';

export default function Gallery() {
	const myID = useRef('199633413@N04');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	// 검색 함수가 실행됐는지를 확인하기 위한 참조객체
	const searched = useRef(false);

	const gap = useRef(20);
	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		fetchFlickr({ type: 'search', keyword: keyword });
		// 검색함수가 한 번이라도 실행되면 영구적으로 초기값을 true로 변경.
		searched.current = true;
	};

	const fetchFlickr = async opt => {
		console.log('fetching again...');
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current);
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<>
			<Layout2 title={'Gallery'}>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button onClick={handleMine} className='on'>
							My Gallery
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{/* searched 값이 true고, 검색결과가 없는 2가지 조건이 동시에 만족해야지만 에러메시지 출력 */}
						{searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<h2>{pic.title}</h2>

										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자 프로필 이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout2>

			<Modal Open={Open} setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}

/*
	순서 1. 일반 동적 데이터를 제외한 일반 정적인 콘텐츠가 렌더링됨. (참조 객체에 20이라는 상수 값을 미리 담아 놓음.)

	순서 2. 정적인 JSX 요소가 일단 브랑추저에 렌더링 완료되었기 때문에 useEffect가 실행 가능해지는 상태가 됨. (=정적인 스크립트 DOM은 제어할 수 있는 상태가 되었다는 말) 

	순서 3. useEffect 안쪽에서 미리 참조객체에 연결해놓은 refFrameWrap에 접근 가능해짐. (이때 refFrameWrap에 --gap 변수에 20이라는 값을 강제 적용.) (이때부터는 scss파일에 --gap이라는 변수가 없더라도 리액트 상에서 동적으로 gap이라는 변수값을 꽂아넣었기 때문에 활용 가능.)

	순서 4. 리액트가 동적으로 변수값을 적용해서 DOM을 생성하고 나면, 그 이후 scss가 해당 변수값을 읽어서 화면 스타일링 진행. 

	=

	순서 1. 처음에 gap이라는 참조 객체 값을 해석
	순서 2. 두 번째 렌더링 타임에 useEffect가 실행되면서 참조 객체에 담겨있는 section요소에 강제로 gap 변수값을 꽂아넣음(적용).
	순서 3. 세 번째 렌더링 타임에 fetching 데이터에 의한 동적 요소가 출력되면서, 이때 비로소 변수 값이 적용된 scss 스타일링이 적용됨. (paint 라고 함.)
*/
