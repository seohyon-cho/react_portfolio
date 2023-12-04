import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';

/*
	Query String : URL로 데이터를 호출하는 방법 = URL에 문자열로 요청옵션을 전달하는 형태 
	기본 요청URL ? & 옵션명1=옵션값1
	옵션의 순서는 상관없음. 
	https://www.abc.com/?name=홍길동&age=20&hobby=game
*/

export default function Gallery() {
	console.log('re-render');
	// 1. 참조객체(useRef)에 내 아이디 값을 등록한다.
	const myID = useRef('199633413@N04');
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async (opt) => {
		console.log('flickr');
		const num = 20;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		// 3. userURL에는 user_id를 상수값이 아닌 호출 시점에 전달된 opt객체의 id로 등록해서 URL 생성
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';
		// 4. 만들어진 URL로 데이터 요청
		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
		console.log(json);
	};

	useEffect(() => {
		// 2. 처음 컴포넌트 마운트 시, 타입을 user로 지정하고, id값으로 내 아이디 값을 등록
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<Layout2 title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet'>
					<button onClick={() => fetchFlickr({ type: 'interest' })}>Interest Gallery</button>
					<button onClick={() => fetchFlickr({ type: 'user', id: myID.current })}>My Gallery</button>
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
									<span>${pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout2>
	);
}
