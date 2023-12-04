import { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';

export default function Gallery() {
	console.log('re-render');
	const myID = useRef('199633413@N04');
	const [Pics, setPics] = useState([]);
	const refNav = useRef(null);

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
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
					<button
						onClick={(e) => {
							activateBtn(e);
							fetchFlickr({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
					<button
						className='on'
						onClick={(e) => {
							activateBtn(e);
							fetchFlickr({ type: 'user', id: myID.current });
						}}
					>
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
									<span onClick={() => fetchFlickr({ type: 'user', id: pic.owner })}>${pic.owner}</span>
								</div>
							</article>
						);
					})}
				</Masonry>
			</section>
		</Layout2>
	);
}
