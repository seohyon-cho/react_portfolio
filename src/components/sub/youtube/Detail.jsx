import { useCallback, useEffect, useState } from 'react';
import Layout2 from '../../common/layout2/Layout2';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	console.log('re-render');
	console.log('-----------');
	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	// 아래처럼 데이터 패칭하는 무거운 함수는 useCallback 쓰는 게 좋음. (특정 인수에 따라서 값이 달라지고, 달라지는 값에 따라서 추적되도록 메모이제이션이 임시로 해제되어야 하므로)
	// id를 의존성 배열에 넣어서, id값이 달라질 때만 메모이제이션을 풀어주게 됨.
	console.log(YoutubeData);
	const fetchSingleData = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	}, [id]);

	useEffect(() => {
		console.log('useEffect');
		fetchSingleData();
	}, [fetchSingleData]);

	return (
		<Layout2 title={'Detail'}>
			{/* 
        Optional Chaning : 객체명?.property
        해당 객체에 값이 없을 땐 해당 구문을 무시하고, 값이 있을 때에만 property에 접근하게끔 만들어줌. 
        (객체만 가능. 배열은 적용 불가능.)
      */}
			{YoutubeData && (
				<article>
					<h3>{YoutubeData.title}</h3>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`} title={YoutubeData.title}></iframe>
					</div>
					<h3>{YoutubeData.title}</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout2>
	);
}
