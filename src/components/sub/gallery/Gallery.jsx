import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-component';
import Layout2 from '../../common/layout2/Layout2';
import './Gallery.scss';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		console.log('flickr');
		const num = 20;
		const myID = '199633413@N04';
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${myID}`;

		const data = await fetch(userURL);
		const json = await data.json();

		setPics(json.photos.photo);
		console.log(json);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		<Layout2 title={'Gallery'}>
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
