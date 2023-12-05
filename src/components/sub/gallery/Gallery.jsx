import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';
import { LuSearch } from 'react-icons/lu';

export default function Gallery() {
	const myID = useRef('199633413@N04');
	const isUser = useRef(myID.current);
	const [Pics, setPics] = useState([]);
	const refNav = useRef(null);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = (e) => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		// 기본적으로 onSubmit 이벤트는 전송 기능이기 때문에, 무조건 화면이 새로고침됨
		// 직접 전송을 할 것이 아니라 리액트로 추가 로직을 구현할 것이므로 기본 전송기능을 막는 것임.
		e.preventDefault();
		// e.target (form) 의 children (입력창 & 버튼) 의 [0]번째 자식 (입력창) 의 value (입력된 내용물)
		const keyword = e.target.children[0].value;
		console.log(keyword);
	};

	const fetchFlickr = async (opt) => {
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search'; // search method 추가
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; // search url 추가
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
		console.log(json);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
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

			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic) => {
						return (
							<article key={pic.id}>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									/>
								</div>
								<h2>{pic.title}</h2>

								<div className='profile'>
									<img
										src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										alt='사용자 프로필 이미지'
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span onClick={handleUser}>{pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout2>
	);
}
