import { useEffect, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	console.log('re-render');
	console.log('-----------');
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	console.log(YoutubeData);
	const fetchSingleData = async () => {
		const api_key = 'AIzaSyDC60bIIkAJFzy7ji4a0Eo3AX6tYudhe1w';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	useEffect(() => {
		console.log('useEffect');
		fetchSingleData();
	}, []);

	return (
		<Layout2 title={'Detail'}>
			{/* 
        Optional Chaning : 객체명?.property
        해당 객체에 값이 없을 땐 해당 구문을 무시하고, 값이 있을 때에만 property에 접근하게끔 만들어줌. 
        (객체만 가능. 배열은 적용 불가능.)
      */}

			<div className='videoBox'>
				<iframe src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`} title={YoutubeData?.title}></iframe>
			</div>
			<h3>{YoutubeData?.title}</h3>
			<p>{YoutubeData?.description}</p>
		</Layout2>
	);
}
