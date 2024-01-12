import { useCallback, useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';

export default function Gallery() {
	const dispatch = useDispatch();

	const myID = useRef('199633413@N04');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const refFrameWrap = useRef(null);
	const searched = useRef(false);

	const gap = useRef(20);
	const [Pics, setPics] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Mounted, setMounted] = useState(true);

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
		searched.current = true;
	};

	const fetchFlickr = useCallback(
		async opt => {
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

			Mounted && setPics(json.photos.photo);
		},
		[Mounted]
	);

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current);
		fetchFlickr({ type: 'user', id: myID.current });
		return () => setMounted(false);
	}, [fetchFlickr]);

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
						{searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												dispatch({ type: types.MODAL.start, payload: true });
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

			<Modal>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}

/*
	[ 해당 페이지 (Gallery.jsx) 에서의 개발 흐름 ]

	- Flickr API 연동해서 갤러리 데이터 동적 생성 
	- 초기에는 My Gallery 기본값으로 출력 
	- Interest 카테고리 클릭 시, 검색량이 많은 Flickr 자체의 추천 갤러리 출력 (카테고리를 클릭하는 사용자의 이벤트에 의해 refetching후 데이터 변경하여 출력)
	- Interest 갤러리 출력된 상태에서, 특정 사용자의 플로필 클릭 시, 해당 사용자의 갤러리 정보를 refetching하여 재출력
	- masonry API 활용하여 Pinterest 형식의 UI 구현
	- 갤러리 내 특정 이미지의 썸네일 클릭 시, 해당 이미지를 모달로 따로 띄워서 볼 수 있게 함. (모달창 생성 state값은 redux로 전역관리)



	[ 해당 프로젝트 진행하면서 발생한 이슈 사항 ]

	(1) 비동기 데이터가 사용자 이벤트에 의해서 빈번하게 refetching이 발생하게 되면서 코드가 지저분해짐. 

	(2) masonry 활용 시, UI상의 위치값을 제대로 인지하지 못 하여, SCSS에서 제대로 적용하는 것이 불가능 했었음. 
	- 반응형 처리를 하는 과정에서 column의 갯수를 변경 시, SCSS 상에서 너무 많은 구문을 수정해야 하는 번거로움이 있었음. 

	(3) 갤러리 컴포넌트에서 다른 컴포넌트로 빠르게 라우터 이동 시, memory leak (메모리 누수) 오류가 발생하는 현상을 console을 통해 확인할 수 있었음. 
	
	(4) 갤러리에서 모달 창 생성 시, 지역 state로 모달창을 제어해야 하는 형태였어서, 모달 컴포넌트 재활용이 어려웠음. 


	[ 해결 방안 ]

	(1) fetching 함수 자체를 async await 형태의 wrapping 함수로 묶어주고, 호출해야 하는 데이터의 카테고리별로 쿼리에 적용할 값을 인수로 전달하게끔 처리. 
	(1) 각 이벤트마다 fetching 함수에 인수를 다르게 전달하는 식으로 구성하여 코드를 재사용할 수 있게끔 개선함. 

	(2) masonry에서 사이 간격을 제대로 인식하지 못 하는 문제가 발생해서, scss에서 변수를 활용해서 위치값을 보정해주고, 반응형 시 변수값 변경만으로도 column 갯수를 효율적으로 제어할 수 있도록 scss 연산 로직을 활용했음. 

	(3) 구글링을 통해, 아직 비동기 데이터가 state에 담기지 않았는데 컴포넌트가 언마운트되면서 발생하게 된 문제라는 걸 알게 되면서, State를 새로 생성해서 CleanUp함수를 활용하여, 해당 컴포넌트 언마운트시 비동기데이터를 state에 담는 것을 막아줌. 

	(4) 모달 컴포넌트를 범용적으로 활용하기 위해서, 모달창을 열고 닫는 State 자체를 redux로 전역관리. 

*/
