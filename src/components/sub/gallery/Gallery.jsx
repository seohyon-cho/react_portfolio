import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';

export default function Gallery() {
	console.log('re-render');
	const myID = useRef('199633413@N04');
	// 1. isUser의 초기값을, 내 아이디의 문자값으로 등록.
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
		// 2. interest 함수 호출 시, isUser 값을 빈 문자열(false로 인식됨)로 초기화.
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = (e) => {
		// 3. 콕 찍어서, 현재 isUser 값과 myID 의 값이 동일할 때만 return으로 함수 중지
		// 마이갤러리 함수 호출 시에는, isUser에 문자값이 담겨있다고 하더라도, 내 아이디의 문자값과 똑같지 않으면 return하지 않고 핸들러 함수를 실행하도록 처리.
		// 다른 사용자의 갤러리를 갔다가 다시 myGallery 호출 시, 이미 그 다른 사용자의 userID값이 문자값으로 담겨있기 때문에 내 갤러리가 호출되지 않는 문제를 해결하기 위함임.
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = (e) => {
		// 4. isUser값이 비어있기만 하면 중지
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		// activateBtn에 e를 넣지 않음으로써, 전체 class 초기화만 이루어지게 하고, 현재 인수로 전달되는 e에 클래스 붙이는 작업은 안 하게끔 처리.
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const fetchFlickr = async (opt) => {
		console.log('flickr');
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);

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
			</article>
			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
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
